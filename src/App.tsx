import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { content, projects } from './content'
import type { Lang, Project } from './content'
import './App.css'

type IconName = 'arrow' | 'down' | 'external' | 'sun' | 'moon' | 'close' | 'menu' | 'copy' | 'check' | 'plus'
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M4 12h15M13 5l7 7-7 7" />,
    down: <path d="M12 3v14m-6-6 6 6 6-6M4 20h16" />,
    external: <path d="M6 18 18 6M6 6h12v12" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    moon: <path d="M20 14A8.5 8.5 0 0 1 10 4a8.5 8.5 0 1 0 10 10Z" />,
    close: <path d="m6 6 12 12M6 18 18 6" />, menu: <path d="M4 8h16M4 16h16" />,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V3H3v13h5" /></>,
    check: <path d="m4 12 5 5L20 6" />, plus: <path d="M12 4v16M4 12h16" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
function Lines({ text }: { text: string[] }) { return <>{text.map((s, i) => <span key={s}>{s}{i < text.length - 1 && <br />}</span>)}</> }

function Network({ lang }: { lang: Lang }) {
  const [layer, setLayer] = useState(2)
  const t = content[lang]
  const nodes = Array.from({ length: 54 }, (_, i) => {
    const a = i * 2.3999632297, r = 28 + Math.sqrt(i / 53) * 153
    return { x: 240 + Math.cos(a) * r, y: 221 + Math.sin(a) * r * .83, group: i % 3 }
  })
  return <div className="network-panel">
    <div className="network-heading"><span className="tiny-dot" />{t.diagram}<span className="network-counter">0{layer + 1}/03</span></div>
    <svg className="network-svg" viewBox="0 0 480 450" role="img" aria-label={t.layerText[layer]}>
      <defs><radialGradient id="halo"><stop stopColor="var(--lime)" stopOpacity=".12" /><stop offset="1" stopColor="var(--lime)" stopOpacity="0" /></radialGradient></defs>
      <circle cx="240" cy="221" r="197" fill="url(#halo)" />
      <g className="orbital-rings" fill="none" stroke="currentColor" strokeWidth=".6">
        {[0, 60, 120].map(a => <ellipse key={a} cx="240" cy="221" rx="192" ry="155" transform={`rotate(${a} 240 221)`} />)}
        <ellipse cx="240" cy="221" rx="105" ry="190" transform="rotate(-25 240 221)" /><path d="M35 221h410M240 20v402" strokeDasharray="2 7" />
      </g>
      <g className="network-links">{nodes.map((n, i) => <g key={i} className={n.group === layer ? 'active' : ''}><path d={`M${n.x},${n.y} L${nodes[(i + 8) % nodes.length].x},${nodes[(i + 8) % nodes.length].y}`} />{i % 4 === 0 && <path d={`M${n.x},${n.y} L240,221`} />}</g>)}</g>
      {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={n.group === layer ? 3 : 1.8} className={n.group === layer ? 'network-node active' : 'network-node'} style={{ '--delay': `${i * .12}s` } as CSSProperties} />)}
      <circle cx="240" cy="221" r="34" fill="var(--surface)" stroke="var(--lime)" strokeWidth=".8" /><path d="m227 228 13-24 13 24m-21-8h16" fill="none" stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" />
      <text x="240" y="280" textAnchor="middle" className="network-caption">{t.layers[layer].toUpperCase()}</text><text x="39" y="411" className="svg-micro">GP / CONNECTED THINKING</text><text x="442" y="411" textAnchor="end" className="svg-micro">34° S · 58° W</text>
    </svg>
    <div className="network-controls" role="group" aria-label={lang === 'es' ? 'Explorar mi enfoque' : 'Explore my approach'}>{t.layers.map((s, i) => <button key={s} className={layer === i ? 'active' : ''} onClick={() => setLayer(i)} aria-pressed={layer === i}><span>0{i + 1}</span>{s}</button>)}</div><p className="network-note" aria-live="polite">{t.layerText[layer]}</p>
  </div>
}

function ProjectVisual({ id, lang }: { id: string; lang: Lang }) {
  const es = lang === 'es'
  return <div className={`project-visual visual-${id}`} aria-hidden="true"><div className="mock-shell">
    <div className="mock-sidebar"><span className="mock-logo">{id[0].toUpperCase()}<span /></span>{[0, 1, 2, 3].map(n => <i key={n} className={n === 0 ? 'selected' : ''} />)}<i className="sidebar-bottom" /></div>
    <div className="mock-main"><div className="mock-top"><span>{id.toUpperCase()} / {id === 'prisma' ? 'ANALYTICS' : id === 'gipso' ? 'WORKFORCE' : id === 'mel' ? 'WORKSPACE' : 'KNOWLEDGE'}</span><div className="mock-avatar">GP</div></div>
    {id === 'prisma' ? <><div className="mock-title">{es ? 'Pulso de la operación' : 'Operational pulse'}<span>{es ? 'Vista por territorio' : 'Territory view'}</span></div><div className="mock-metrics">{(es ? ['Órdenes', 'Gestiones', 'Seguimiento'] : ['Orders', 'Actions', 'Follow-up']).map((v, i) => <div key={v}><span>{v}</span><b>{['↗', '◷', '◎'][i]}</b><i /></div>)}</div><div className="chart-label">FULFILLMENT <span>↗</span></div><div className="mock-chart"><svg viewBox="0 0 400 100"><defs><linearGradient id="chartFill" x2="0" y2="1"><stop stopColor="#b6ccff" stopOpacity=".4" /><stop offset="1" stopColor="#b6ccff" stopOpacity="0" /></linearGradient></defs><path d="M0 85 35 73 65 77 100 47 130 56 167 30 200 43 237 18 265 32 300 8 335 18 365 2 400 8V100H0Z" fill="url(#chartFill)" /><path d="M0 85 35 73 65 77 100 47 130 56 167 30 200 43 237 18 265 32 300 8 335 18 365 2 400 8" fill="none" stroke="#a2c0ff" strokeWidth="2" /></svg></div></> :
    id === 'gipso' ? <><div className="mock-title">{es ? 'Cada equipo, en su lugar.' : 'Every team, in place.'}<span>{es ? 'Planificación de dotación' : 'Workforce planning'}</span></div><div className="calendar-head"><span>{es ? 'Rotación y cobertura' : 'Rotation & coverage'}</span><span>← &nbsp; →</span></div><div className="mock-calendar"><span />{(es ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S']).map((d, i) => <span key={i}>{d}</span>)}{Array.from({ length: 5 }, (_, row) => <div className="calendar-row" key={row}><span className="person-bar" />{Array.from({ length: 7 }, (_, col) => <span key={col} className={`calendar-day day-${(row + col) % 5}`} />)}</div>)}</div><div className="calendar-legend">{(es ? ['Presencial', 'Remoto', 'Franco'] : ['On-site', 'Remote', 'Day off']).map(v => <span key={v}><i />{v}</span>)}</div></> :
    id === 'mel' ? <><div className="mock-title">{es ? 'Un espacio para avanzar.' : 'A space to move forward.'}<span>{es ? 'Solicitudes del equipo' : 'Team requests'}</span></div><div className="kanban">{(es ? ['Recibido', 'En curso', 'Resuelto'] : ['Received', 'In progress', 'Resolved']).map((v, i) => <div className="kanban-column" key={v}><span><i />{v}</span>{Array.from({ length: i === 1 ? 3 : 2 }, (_, n) => <div className="kanban-item" key={n}><i /><b /><b /><div><span /><small>↗</small></div></div>)}</div>)}</div></> :
    <><div className="agent-orbit"><span /><span /><span /><div>G<span>u</span>IA<sup>✳</sup></div></div><div className="agent-flow"><span>{es ? 'Consulta' : 'Question'}</span><i>→</i><span>{es ? 'Contexto' : 'Context'}</span><i>→</i><span>{es ? 'Orientación' : 'Guidance'}</span></div><div className="agent-reply"><span className="tiny-dot" /><i /><i /><i /></div></>}
    </div></div><div className="concept-label">{content[lang].demo}</div></div>
}
function ProjectDialog({ project, lang, close }: { project: Project | null; lang: Lang; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null), t = content[lang]
  useEffect(() => {
    if (!project || !ref.current) return
    const dialog = ref.current, previous = document.body.style.overflow
    dialog.showModal(); document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previous }
  }, [project])
  if (!project) return null
  const p = project[lang]
  return <dialog className="project-dialog" ref={ref} onCancel={close} onClick={e => { if (e.target === e.currentTarget) close() }} aria-labelledby="case-title"><div className="dialog-inner">
    <div className="dialog-top"><span className="eyebrow">{project.name} / CASE STUDY</span><button className="icon-button" onClick={close} aria-label={t.close} autoFocus><Icon name="close" /></button></div><div className={`status status-${project.statusType}`}><span />{p.status}</div><h2 id="case-title">{p.title}</h2><ProjectVisual id={project.id} lang={lang} />
    <div className="case-copy"><h3>{t.context}</h3><p>{p.problem}</p><h3>{t.contribution}</h3><p>{p.contribution}</p><h3>{t.scope}</h3><ul>{p.scope.map(s => <li key={s}>{s}</li>)}</ul><h3>{t.tech}</h3><div className="tags">{project.tech.map(s => <span key={s}>{s}</span>)}</div><p className="stack-note">{t.techNote}</p></div><a className="button primary" href={`mailto:gabrielleandro.p@gmail.com?subject=${encodeURIComponent(`${project.name} — Portfolio`)}`}>{t.caseContact}<Icon name="arrow" /></a>
  </div></dialog>
}
const anchors = ['proyectos', 'enfoque', 'trayectoria', 'contacto']
function App() {
  const [lang, setLang] = useState<Lang>('es')
  const [light, setLight] = useState(false)
  const [preferencesReady, setPreferencesReady] = useState(false)
  const [menu, setMenu] = useState(false), [filter, setFilter] = useState(0), [project, setProject] = useState<Project | null>(null), [active, setActive] = useState(''), [copyState, setCopyState] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null), t = content[lang]
  useEffect(() => {
    try { setLang(localStorage.getItem('gp-language') === 'en' ? 'en' : 'es'); setLight(localStorage.getItem('gp-theme') === 'light') } catch { /* Preferences are optional. */ }
    setPreferencesReady(true)
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang; document.documentElement.dataset.theme = light ? 'light' : 'dark'
    document.title = lang === 'es' ? 'Gabriel Palazzini — Operaciones, procesos e IA aplicada' : 'Gabriel Palazzini — Operations, processes & applied AI'
    try { if (preferencesReady) { localStorage.setItem('gp-language', lang); localStorage.setItem('gp-theme', light ? 'light' : 'dark') } } catch { /* Preferences are optional. */ }
  }, [lang, light, preferencesReady])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }), { rootMargin: '-15% 0px -55% 0px' })
    document.querySelectorAll('main section[id]').forEach(el => observer.observe(el)); return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', escape)
    return () => { window.removeEventListener('keydown', escape); if (timer.current) clearTimeout(timer.current) }
  }, [])
  async function copyEmail() {
    try { await navigator.clipboard.writeText('gabrielleandro.p@gmail.com'); setCopyState('copied') } catch { setCopyState('error') }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState(''), 3500)
  }
  return <><a className="skip-link" href="#contenido">{t.skip}</a>
    <header className="site-header"><div className="nav-wrap"><a href="#inicio" className="brand" aria-label="Gabriel Palazzini — Inicio">gp<span>.</span></a><nav className={menu ? 'main-nav open' : 'main-nav'} aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'} id="main-nav">{t.nav.map((s, i) => <a key={anchors[i]} href={`#${anchors[i]}`} className={active === anchors[i] ? 'active' : ''} onClick={() => setMenu(false)}>{s}</a>)}</nav><div className="nav-actions"><button className="language-button" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}>{lang.toUpperCase()}<span>⌄</span></button><button className="icon-button theme-button" onClick={() => setLight(!light)} aria-label={t.theme}><Icon name={light ? 'moon' : 'sun'} size={17} /></button><a className="nav-cta" href="#contacto">{t.talk}<Icon name="external" size={16} /></a><button className="icon-button menu-button" onClick={() => setMenu(!menu)} aria-label={t.menu} aria-expanded={menu} aria-controls="main-nav"><Icon name={menu ? 'close' : 'menu'} /></button></div></div></header>
    <main id="contenido"><section className="hero section-wrap" id="inicio"><div className="hero-kicker"><span><span className="tiny-dot" />{t.role}</span><span className="hero-location">{t.location} ↗</span></div><div className="hero-grid"><div className="hero-copy"><h1>{t.headline[0]}<br />{t.headline[1]}<br /><em>{t.headline[2]}</em></h1><p>{t.intro}</p><div className="hero-actions"><a className="button primary" href="#proyectos">{t.explore}<Icon name="arrow" /></a><a className="button text-button" href="/cv-gabriel-palazzini.html" target="_blank" rel="noreferrer" aria-label={`${t.cv} · Español`}>{t.cv}<Icon name="down" size={17} /></a></div></div><Network lang={lang} /></div><div className="hero-bottom"><p>{t.foot}</p><a href="#proyectos" className="scroll-cue" aria-label={t.explore}><span>SCROLL TO EXPLORE</span><Icon name="arrow" size={15} /></a></div></section>
    <div className="facts section-wrap">{['12', '2014', '2026'].map((s, i) => <div key={s}><strong>{s}<span>{['+', '—', '↗'][i]}</span></strong><p>{t.facts[i]}</p></div>)}<div className="facts-signature"><span>NETWORK THINKING.</span><span>HUMAN DIRECTION.</span><span>AI EXECUTION.</span></div></div>
    <section className="work section-wrap" id="proyectos"><div className="section-heading"><p className="eyebrow">{t.workEye}</p><div className="heading-row"><h2><Lines text={t.workTitle} /></h2><p>{t.workText}</p></div></div><div className="work-toolbar"><div className="filter-tabs" role="group" aria-label={lang === 'es' ? 'Filtrar proyectos' : 'Filter projects'}>{t.filters.map((s, i) => <button key={s} onClick={() => setFilter(i)} className={filter === i ? 'active' : ''} aria-pressed={filter === i}>{s}<span>{['04', '02', '01', '01'][i]}</span></button>)}</div><span className="work-year">2026 / SELECTED CASES</span></div><div className="project-grid" aria-live="polite">{projects.filter(p => filter === 0 || p.category === filter).map(p => <article className="project-card" key={p.id}><button className="project-open" onClick={() => setProject(p)} aria-label={`${t.viewCase}: ${p.name}`}><ProjectVisual id={p.id} lang={lang} /><div className="project-meta"><div><span className="project-index">/0{projects.indexOf(p) + 1}</span><h3>{p.name}</h3></div><span className="round-arrow"><Icon name="external" /></span></div></button><div className="project-description"><div className={`status status-${p.statusType}`}><span />{p[lang].status}</div><h4>{p[lang].title}</h4><p>{p[lang].description}</p></div></article>)}</div></section>
    <section className="approach" id="enfoque"><div className="section-wrap"><p className="eyebrow">{t.methodEye}</p><div className="approach-intro"><h2><Lines text={t.methodTitle} /></h2><p>{t.methodText}</p></div><div className="steps">{t.steps.map(([s, p], i) => <div className="step" key={s}><div className="step-top"><span>0{i + 1}</span><Icon name={i === 3 ? 'check' : 'arrow'} size={23} /></div><h3>{s}</h3><p>{p}</p></div>)}</div><div className="honesty-note"><span className="honesty-symbol">✳</span><div><h3>{t.honestTitle}</h3><p>{t.honest}</p></div></div><div className="tool-row"><span>{t.tools}</span><div>Claude Code <i>×</i> Codex <i>×</i> VS Code <i>×</i> ChatGPT <i>×</i> Gemini</div></div></div></section>
    <section className="journey section-wrap" id="trayectoria"><div className="journey-heading"><p className="eyebrow">{t.journeyEye}</p><h2><Lines text={t.journeyTitle} /></h2><p>{t.journeyText}</p></div><div className="timeline">{t.experience.map(([date, title, company, description], i) => <article className={`timeline-item ${i === 0 ? 'is-current' : ''}`} key={title}><div className="timeline-date">{date}{i === 0 && <span>{t.current}</span>}</div><div className="timeline-copy"><div className="timeline-dot" /><span className="company">{company}</span><h3>{title}</h3><p>{description}</p></div><span className="timeline-number">0{i + 1}</span></article>)}</div><div className="education"><div><span className="eyebrow">LEARNING / ALWAYS ON</span><h3>{t.educationTitle}</h3><p>{t.educationText}</p></div><div className="education-list">{t.education.map(([year, name, issuer]) => <div key={name}><time>{year}</time><span>{name}<small>{issuer}</small></span></div>)}<p>{t.studies}</p></div></div></section>
    <section className="other-work section-wrap"><p className="eyebrow">{t.otherEye}</p><h2>{t.otherTitle}</h2><div className="other-list">{t.other.map(([name, status, description, tech], i) => <article key={name}><span className="other-index">0{i + 1}</span><div><h3>{name}</h3><span className="other-status">{status}</span></div><p>{description}<small>{tech}</small></p><Icon name="plus" /></article>)}</div></section>
    <section className="contact section-wrap" id="contacto"><p className="eyebrow">{t.contactEye}</p><div className="contact-main"><h2><Lines text={t.contactTitle} /></h2><div><p>{t.contactText}</p><a className="button primary" href="mailto:gabrielleandro.p@gmail.com">{t.email}<Icon name="external" /></a></div></div><div className="contact-links"><div className="email-line"><a href="mailto:gabrielleandro.p@gmail.com">gabrielleandro.p@gmail.com</a><button className="icon-button" onClick={copyEmail} aria-label={copyState === 'copied' ? t.copied : t.copy}><Icon name={copyState === 'copied' ? 'check' : 'copy'} size={18} /></button><span className="copy-feedback" role="status">{copyState === 'copied' ? t.copied : copyState === 'error' ? t.copyError : ''}</span></div><div><a href="https://www.linkedin.com/in/gabrielpalazzini/" target="_blank" rel="noreferrer">LinkedIn<Icon name="external" size={16} /></a><a href="https://github.com/dekapala" target="_blank" rel="noreferrer">GitHub<Icon name="external" size={16} /></a><a href="/cv-gabriel-palazzini.html" target="_blank" rel="noreferrer">CV · ES<Icon name="down" size={16} /></a></div></div></section>
    </main><footer className="site-footer section-wrap"><a href="#inicio" className="brand" aria-label="Gabriel Palazzini">gp<span>.</span></a><p>© {new Date().getFullYear()} Gabriel Palazzini <span>{t.footer}</span></p><a href="#inicio">{t.top}<Icon name="arrow" size={17} /></a></footer><ProjectDialog project={project} lang={lang} close={() => setProject(null)} /></>
}
export default App
