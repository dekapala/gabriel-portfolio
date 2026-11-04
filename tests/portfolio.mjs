import { JSDOM, VirtualConsole } from 'jsdom'
import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import axe from 'axe-core'
const errors=[]
const virtualConsole=new VirtualConsole()
virtualConsole.on('jsdomError',e=>errors.push(e.message))
virtualConsole.on('error',(...e)=>errors.push(e.join(' ')))
const html=await readFile(new URL('../.build/Palazzini-Portfolio.html', import.meta.url),'utf8')
const dom=new JSDOM(html,{url:'https://palazzini.dev/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole,beforeParse(w){
  w.IntersectionObserver=class{observe(){}disconnect(){}}
  w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')}
  w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open')}
  Object.defineProperty(w.navigator,'clipboard',{value:{writeText:async text=>{w.__clipboard=text}}})
}})
const w=dom.window,d=w.document
const pause=()=>new Promise(r=>setTimeout(r,100))
const click=async sel=>{const e=typeof sel==='string'?d.querySelector(sel):sel;assert.ok(e,`Found ${sel}`);e.click();await pause()}
await pause()
assert.equal(d.querySelectorAll('h1').length,1)
assert.equal(d.querySelectorAll('.project-card').length,4)
assert.match(d.body.textContent,/En uso por la gerencia/)
assert.match(d.body.textContent,/Nov\. 2026/)
await click(d.querySelectorAll('.filter-tabs button')[2]);assert.equal(d.querySelectorAll('.project-card').length,1);assert.equal(d.querySelector('.project-meta h3').textContent,'GIPSO')
await click('.project-open');assert.ok(d.querySelector('dialog[open]'));assert.match(d.querySelector('.case-copy').textContent,/frontend y el backend con asistencia de IA/)
await click('.dialog-top button');assert.equal(d.querySelector('dialog'),null)
await click(d.querySelectorAll('.filter-tabs button')[0]);assert.equal(d.querySelectorAll('.project-card').length,4)
await click(d.querySelectorAll('.network-controls button')[0]);assert.match(d.querySelector('.network-note').textContent,/Entender/)
await click('.theme-button');assert.equal(d.documentElement.dataset.theme,'light');assert.equal(w.localStorage.getItem('gp-theme'),'light')
await click('.language-button');assert.equal(d.documentElement.lang,'en');assert.match(d.querySelector('h1').textContent,/Operations/);assert.match(d.querySelector('.project-description').textContent,/In use by management/)
await click('.language-button');assert.equal(d.documentElement.lang,'es')
await click('.menu-button');assert.equal(d.querySelector('.menu-button').getAttribute('aria-expanded'),'true')
w.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));await pause();assert.equal(d.querySelector('.menu-button').getAttribute('aria-expanded'),'false')
await click('.email-line button');assert.equal(w.__clipboard,'gabrielleandro.p@gmail.com');assert.match(d.querySelector('.copy-feedback').textContent,/Email copiado/)
for(const p of ['prisma','gipso','mel','guia']){const card=[...d.querySelectorAll('.project-open')].find(e=>e.getAttribute('aria-label').toLowerCase().includes(p));await click(card);assert.ok(d.querySelector('dialog[open]'));await click('.dialog-top button')}
assert.equal(errors.length,0,JSON.stringify(errors))
w.eval(axe.source)
const result=await w.axe.run(d,{rules:{'color-contrast':{enabled:false}}})
assert.equal(result.violations.length,0,JSON.stringify(result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))))
console.log('PASS: ES/EN, filters, 4 case dialogs, theme, network controls, menu/Escape, clipboard, hydration and static accessibility. Color contrast and visual browser QA not covered.')
dom.window.close()
const restored=new JSDOM(html,{url:'https://palazzini.dev/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole,beforeParse(w){
  w.IntersectionObserver=class{observe(){}disconnect(){}}
  w.localStorage.setItem('gp-language','en');w.localStorage.setItem('gp-theme','light')
}})
await pause()
assert.equal(restored.window.document.documentElement.lang,'en')
assert.equal(restored.window.document.documentElement.dataset.theme,'light')
assert.equal(restored.window.localStorage.getItem('gp-language'),'en')
assert.equal(errors.length,0,JSON.stringify(errors))
restored.window.close()
console.log('PASS: saved preferences restored without hydration errors.')
