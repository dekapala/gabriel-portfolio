# Gabriel Palazzini — Portfolio 2026

Portfolio actualizado sobre la trayectoria en telecomunicaciones de Gabriel, su colaboración con PEM y su trabajo con IA aplicada. Fuente original: `gabriel-portfolio-main.zip`. Rediseño preparado el 3 de noviembre de 2026.

## Desarrollo y publicación

Requiere Node.js 22 o superior.

```sh
npm ci
npm run dev
```

La vista de desarrollo se sirve en `http://localhost:4173`, recompila cambios y recarga el navegador. Para generar y validar la versión de producción:

```sh
npm run build
npm test
npm run preview
```

Publicar **el contenido de `dist/`**. Configuración de hosting: comando `npm run build`, directorio de salida `dist`. No requiere backend, claves de API ni servicios pagos. Funciona como sitio estático en Cloudflare Pages, Vercel, Netlify y servidores web convencionales. La configuración del dominio existente se conserva en el proveedor; no se cambió desde este proyecto.

## Vista sin servidor

```sh
npm run standalone
```

Genera `.build/Palazzini-Portfolio.html`, una versión con CSS, JavaScript y tipografía integrados. Abrir con doble clic. El generador copia al mismo directorio el CV enlazado. Este archivo sirve para revisión local; publicar `dist/`, no la vista autónoma.

## Implementación

- React 19 y TypeScript estricto; bundle con esbuild.
- HTML prerenderizado al compilar e hidratado en el cliente. El contenido inicial es legible sin JavaScript y por indexadores.
- CSS responsive, variables de tema, SVG interactivo y animaciones que respetan `prefers-reduced-motion`.
- Español e inglés, persistencia opcional de preferencias, filtros, fichas de caso con diálogo nativo, navegación móvil y contacto por email.
- Tipografía Space Grotesk autoalojada, sin solicitudes de fuentes a terceros. Su licencia OFL está en `public/fonts/OFL.txt`.
- Metadatos, datos estructurados Person/ProfilePage, favicon, robots y sitemap.
- CV actual en HTML imprimible, disponible en español; no se ofrece una traducción antigua como actual.

El bundle de JavaScript, incluido React, pesa aproximadamente 72 KB gzip. El flujo esbuild reemplaza el antiguo conjunto Vite/Tailwind de la versión descargada, sin añadir un servidor de producción. La instalación original no se pudo completar por falta de acceso a npm desde el entorno de trabajo; el nuevo flujo se compiló con paquetes disponibles y versiones fijadas en el lockfile.

## Contenido y precisión

`src/content.ts` contiene los textos bilingües, proyectos, fechas y estados. `src/App.tsx` contiene los componentes. `src/App.css` y `src/index.css` definen el diseño. `public/cv-gabriel-palazzini.html` contiene el CV.

- Cargo formal: Analista Técnico de Operaciones Regionales, desde noviembre de 2016.
- Colaboración con PEM: desde aproximadamente abril de 2026; no se presenta como un pase o ascenso formal.
- PRISMA: frontend y backend realizados por Gabriel con asistencia de IA; en uso por la gerencia.
- GIPSO: frontend y backend realizados por Gabriel con asistencia de IA; inicio de uso previsto para noviembre de 2026. Actualizar este estado cuando se confirme su adopción.
- GuIA: colaboración con el responsable de desarrollo, con aporte en system prompts e instrucciones; no creación individual del agente.
- Los stacks describen tecnologías de los proyectos, no dominio autónomo de cada lenguaje.
- Las interfaces dibujadas en las tarjetas son vistas conceptuales identificadas, sin datos de la empresa. No son capturas de las aplicaciones reales.
- No se publican métricas de ahorro, cantidades de usuarios, certificaciones vigentes o resultados que no estén confirmados.
- Los antiguos PDF se preservaron localmente en `legacy/` y en el ZIP original, fuera del directorio publicado.

Las fechas específicas de participación en PRISMA todavía requieren precisión. No se asignan fechas individuales al caso. La documentación de otros proyectos no prueba por sí sola que hayan sido adoptados.

## Verificación realizada

`npm run build`: chequeo TypeScript, compilación y prerenderizado.

`npm test`: pruebas de integración con JSDOM para idiomas, filtros, cuatro fichas, cambio de tema, preferencias guardadas, capas de la visualización, menú/Escape, clipboard, hidratación y reglas de accesibilidad con axe-core (excepto contraste).

El entorno de ejecución bloqueó el inicio de Chromium y la apertura de un puerto local. Por eso no se afirma una revisión visual real, ni mediciones Lighthouse ni validación de contraste a través de navegador. Antes de publicar, revisar en Chrome las versiones móvil y escritorio, el cierre/foco de los diálogos nativos y la impresión del CV.

Fuente de la tipografía: https://github.com/floriankarsten/space-grotesk (SIL OFL 1.1).
