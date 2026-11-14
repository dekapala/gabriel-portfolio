# Gabriel Palazzini — CV web

CV profesional orientado a selección laboral. Presenta el perfil, la experiencia, las competencias, la formación y los datos de contacto de Gabriel. Las herramientas internas aparecen dentro de la experiencia con PEM, descritas solo por su función (sin nombres ni datos internos de Telecom).

## Desarrollo

Node.js 22 o superior.

```sh
npm ci
npm run dev
```

Vista local: `http://localhost:4173`. Para validar y generar la versión publicable:

```sh
npm run build
npm test
npm run preview
```

El resultado está en `dist/`. React 19, TypeScript estricto, esbuild y HTML prerenderizado con hidratación. El contenido del CV es legible sin JavaScript. La tipografía Space Grotesk está autoalojada, con su licencia en `public/fonts/OFL.txt`.

## Publicación

El repositorio `dekapala/gabriel-portfolio` está conectado a Cloudflare Pages. La rama de revisión genera automáticamente una vista previa. Comando de compilación: `npm run build`. Directorio de publicación: `dist`. No requiere backend ni claves de API. Se mantiene compatibilidad de publicación estática en otros proveedores.

## Estructura del CV

- Nombre, perfil profesional, ubicación y contacto.
- Experiencia en Telecom Argentina y sus antecesoras desde mayo de 2014.
- Colaboración con PEM desde aproximadamente abril de 2026, en paralelo al cargo formal de Analista Técnico de Operaciones Regionales.
- Herramientas internas (seguimiento operativo, planificación de personal, gestión de solicitudes y asistentes de soporte) descritas por su función, sin nombres internos.
- Competencias y herramientas con indicación del uso de IA y nivel básico de SQL.
- Formación, formación complementaria e idiomas.
- Contacto dirigido a oportunidades laborales y acceso al CV en español para imprimir o guardar como PDF.

La página tiene español e inglés, tema claro y oscuro, navegación responsive y preferencias guardadas de manera opcional. Se eliminó la presentación de servicios, la galería de productos, los mockups, los filtros y las invitaciones a encargar proyectos.

`src/content.ts` contiene los textos y datos bilingües. `src/App.tsx` contiene los componentes. `src/App.css` incluye los estilos responsive e impresión. El CV imprimible de una columna está en `public/cv-gabriel-palazzini.html`.

## Precisión del contenido

Desde 2026-11-14, por confidencialidad con el empleador actual, el sitio no nombra herramientas internas (los tests lo verifican) ni detalla equipamiento de red o procedimientos. El bloque "Herramientas internas" describe solo la función, sin fechas, estados ni stacks. La experiencia dice que las herramientas se construyeron con asistencia de Claude Code y Codex. En los asistentes de soporte, Gabriel colaboró con su responsable de desarrollo en instrucciones y criterios de respuesta. El CV imprimible es el mismo que `~/Documentos/Busqueda-laboral/bin/generar_cv.py` genera en español.

Las competencias describen herramientas y conocimientos reales; se evita atribuir dominio autónomo de programación por la presencia de una tecnología en un desarrollo. No se agregan métricas de ahorro, usuarios o resultados que no estén confirmados. Las fechas individuales de participación en PRISMA requieren precisión y no se inventan. Los estudios universitarios se presentan como estudios cursados y CCNA como formación. No se afirma que las certificaciones vencidas estén vigentes.

## Vista autónoma

```sh
npm run standalone
```

Genera `.build/Palazzini-Portfolio.html`, un CV web con los recursos integrados para abrir con doble clic, y copia el CV imprimible al mismo directorio. El nombre histórico del archivo no afecta el contenido. Para hosting usar `dist/`.

## Verificación

`npm run build` valida TypeScript, compila y prerenderiza. `npm test` verifica estructura de CV, cargos y fechas, proyectos de PEM sin fechas ni estados de lanzamiento, contacto laboral, enlace al CV imprimible, idiomas, tema, menú/Escape, clipboard, preferencias, hidratación y reglas de axe-core salvo contraste.

El entorno local bloquea Chromium y el inicio del servidor HTTP, por lo que queda pendiente la revisión visual real, el contraste y la paginación de impresión en navegador. Las pruebas de DOM no se presentan como una validación visual.
