import { build } from 'esbuild'
import { readFile, writeFile, copyFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
await build({entryPoints:['src/main.tsx'],bundle:true,external:['/fonts/*'],minify:true,format:'iife',target:'es2022',outfile:'.build/standalone.js',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'}})
let html = await readFile('dist/index.html','utf8')
html = html.replace(/<link rel="stylesheet"[^>]+>/, `<style>${await readFile('.build/standalone.css','utf8')}</style>`)
const font = (await readFile('public/fonts/space-grotesk-latin.woff2')).toString('base64')
html = html.replaceAll('/fonts/space-grotesk-latin.woff2', `data:font/woff2;base64,${font}`)
html = html.replace('</head>', `<!-- Space Grotesk: Copyright 2020 The Space Grotesk Project Authors.\n${await readFile('public/fonts/OFL.txt','utf8')} -->\n</head>`)
const script = String(await readFile('.build/standalone.js','utf8')).replaceAll('</script','<\\/script')
html = html.replace(/<script type="module"[^>]+><\/script>/, () => `<script>${script}</script>`)
html = html.replaceAll('/cv-gabriel-palazzini.html','./CV-Gabriel-Palazzini.html').replace('href="/favicon.svg"','href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 80 80%27%3E%3Crect width=%2780%27 height=%2780%27 rx=%2718%27 fill=%27%23151715%27/%3E%3Ctext x=%2710%27 y=%2752%27 fill=%27%23c3ee84%27 font-family=%27Arial%27 font-size=%2740%27%3Egp%3C/text%3E%3C/svg%3E"')
const output = process.argv[2] || '.build/Palazzini-Portfolio.html'
await writeFile(output,html)
const cvOutput = resolve(dirname(output), 'CV-Gabriel-Palazzini.html')
await copyFile('public/cv-gabriel-palazzini.html', cvOutput)
console.log(`Standalone preview: ${output}`)
