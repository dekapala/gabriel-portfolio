import { build } from 'esbuild'
import { mkdir, rm, cp, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { gzipSync } from 'node:zlib'

export async function buildSite() {
  await rm('dist', { recursive: true, force: true })
  await mkdir('dist/assets', { recursive: true })
  await cp('public', 'dist', { recursive: true })
  const result = await build({ entryPoints: ['src/main.tsx'], bundle: true, external: ['/fonts/*'], minify: true, sourcemap: false, format: 'esm', target: ['es2022'], outdir: 'dist/assets', entryNames: '[name]-[hash]', assetNames: '[name]-[hash]', metafile: true, jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' } })
  await mkdir('.build', { recursive: true })
  await build({ entryPoints: ['src/App.tsx'], bundle: true, platform: 'node', format: 'esm', outfile: '.build/prerender.mjs', packages: 'external', jsx: 'automatic', loader: { '.css': 'empty' } })
  const { default: App } = await import(pathToFileURL(resolve('.build/prerender.mjs')).href + `?v=${Date.now()}`)
  const { createElement } = await import('react')
  const { renderToString } = await import('react-dom/server')
  const body = renderToString(createElement(App))
  const js = Object.keys(result.metafile.outputs).find(p => p.endsWith('.js'))
  const css = Object.keys(result.metafile.outputs).find(p => p.endsWith('.css'))
  const html = (await readFile('index.html', 'utf8')).replace('<!--APP-->', body).replace('<!--CSS-->', `<link rel="stylesheet" href="/${css.replace(/^dist\//, '')}">`).replace('<!--JS-->', `<script type="module" src="/${js.replace(/^dist\//, '')}"></script>`)
  await writeFile('dist/index.html', html)
  console.log(`Built + prerendered. JS: ${(gzipSync(await readFile(js)).length / 1024).toFixed(1)} KB gzip.`)
}
if (process.argv[1] && resolve(process.argv[1]) === resolve('scripts/build.mjs')) await buildSite()
