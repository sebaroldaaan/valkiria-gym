# Portada y animaciones de Valkiria

Implementación del 14 de octubre de 2026, a partir de `49ace22`.

La portada mantiene el título, la identidad y los datos del gimnasio. La mancuerna conceptual tiene biseles, superficies de goma y metal, reflejos de estudio y movimiento suave. Los títulos aparecen por líneas; las columnas entran desde los lados; las tarjetas aparecen en secuencia al entrar en pantalla; el manifiesto aparece por palabras.

## Ver el resultado

En la terminal de VS Code, dentro de la carpeta del proyecto:

```bash
git fetch origin
git switch --track origin/codex/valkiria-motion
npm ci
npm run dev
```

Si la rama ya existe localmente, usar `git switch codex/valkiria-motion`. No descartar cambios locales para cambiar de rama. Abrir en el navegador la dirección que muestra la terminal en tu propia computadora. No hace falta contratar hosting para desarrollar.

Para revisar la versión compilada, detener el servidor de desarrollo y ejecutar:

```bash
npm run build
npm run start
```

Capturas de la versión compilada:

- [Portada de escritorio](previews/hero-desktop.png)
- [Portada de móvil](previews/hero-mobile.png)

Las capturas son estáticas; las entradas y el movimiento se ven al ejecutar la página.

## Comportamiento

- «Pausar movimiento» detiene la escena, las entradas, la cinta y los carruseles automáticos.
- La preferencia de movimiento reducido del sistema muestra una composición estática y conserva la navegación manual.
- La escena deja de renderizar continuamente cuando sale de pantalla o la pestaña queda oculta. Los carruseles también se detienen fuera de pantalla y al recibir foco o el puntero.
- Los textos siguen visibles sin JavaScript. Sin WebGL, la portada conserva el título y el CTA.
- El formulario continúa preparando una consulta para WhatsApp; no confirma reservas.

## Archivos principales

| Archivo | Responsabilidad |
| --- | --- |
| `public/motion.js` | Entradas al desplazarse, secuencias y estado global de pausa. |
| `public/scene.js` | Geometría, materiales, iluminación y renderizado del objeto 3D. |
| `public/site.js` | Carruseles, cinta y formulario. |
| `app/motion.css` | Composición adaptable y estilos de los controles. |
| `app/site-scripts.jsx` | Inicialización y limpieza de efectos. |

No se añadieron dependencias a la aplicación. La skill Impeccable se conserva en `.agents/skills/impeccable`, con licencia y procedencia, como herramienta de diseño; no se incluye en el código enviado al navegador.

## Validación realizada

- Compilación de producción: `npm run build`, aprobada con Next 16.4.0.
- Chromium: 1440×1000, 820×1180 y 390×844, sin errores de JavaScript ni desbordes horizontales. Revisión visual de portada, clases y planes.
- Pausa y reanudación del renderizado verificadas contando llamadas reales de WebGL; el renderizado se detiene fuera de pantalla.
- Entradas de tarjetas con retrasos escalonados, navegación de galería por teclado y consulta del formulario verificadas. Se interceptó la apertura de WhatsApp; no se envió ningún mensaje.
- Movimiento reducido, tanto al cargar como al cambiar la preferencia, aprobado; sin animaciones activas.
- Contenido accesible sin JavaScript y alternativa sin WebGL comprobados.

Las pruebas de navegador usaron Playwright y Chromium instalados fuera de la aplicación. No se probaron Safari, Firefox ni dispositivos físicos. En este entorno, el servidor de desarrollo respondió HTML pero la conexión HMR del navegador falló; la validación interactiva se realizó con `npm run start`. El script heredado `npm run lint` usa `next lint`, eliminado en Next 16, y requiere una tarea de configuración independiente.
