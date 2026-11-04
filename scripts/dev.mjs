import { watch } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { buildSite } from './build.mjs'
import { serve } from './serve.mjs'
async function rebuild() { await buildSite(); await writeFile('dist/build-version.txt', String(Date.now())) }
await rebuild()
const server = serve({ dev: true })
let timer, building = false, pending = false
async function update() {
  if (building) { pending = true; return }
  building = true
  try { await rebuild() } catch (e) { console.error(e.message) }
  building = false
  if (pending) { pending = false; await update() }
}
const watchers = ['src', 'public'].map(p => watch(p, { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(update, 180) }))
watchers.push(watch('index.html', () => { clearTimeout(timer); timer = setTimeout(update, 180) }))
process.on('SIGINT', () => { watchers.forEach(w => w.close()); server.close(); process.exit() })
