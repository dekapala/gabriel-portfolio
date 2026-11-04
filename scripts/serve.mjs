import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
export function serve({ dev = false } = {}) {
  const root = resolve('dist'), port = Number(process.env.PORT || 4173)
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json', '.woff2': 'font/woff2' }
  const server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      const file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`)
      if (!file.startsWith(root + sep)) { res.writeHead(403); res.end(); return }
      if (!(await stat(file)).isFile()) throw new Error('not found')
      let data = await readFile(file)
      if (dev && file.endsWith('index.html')) data = Buffer.from(data.toString().replace('</body>', '<script>let v;setInterval(async()=>{try{let n=await(await fetch("/build-version.txt",{cache:"no-store"})).text();if(v&&v!==n)location.reload();v=n}catch{}},1200)</script></body>'))
      res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' }); res.end(req.method === 'HEAD' ? undefined : data)
    } catch { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('404 — Página no encontrada') }
  })
  server.on('error', error => { console.error(`Preview unavailable: ${error.message}`); process.exitCode = 1 })
  server.listen(port, '127.0.0.1', () => console.log(`Local: http://localhost:${port}`))
  return server
}
if (process.argv[1]?.endsWith('/serve.mjs')) serve()
