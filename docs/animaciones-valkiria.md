# Portada fotográfica y movimiento de Valkiria

Actualización del 14 de octubre de 2026 (Buenos Aires), en la rama `codex/valkiria-motion`.

## Resultado

La portada ahora muestra la imagen limpia del gimnasio con un acercamiento lento y desplazamiento suave al hacer scroll. Reemplaza la ilustración de la mancuerna en esta variante. La imagen procede de la limpieza realizada anteriormente sobre la referencia suministrada; se convirtió a WebP (137 KiB) sin una nueva reconstrucción del espacio. Es una fotografía animada, no una nueva filmación del gimnasio.

Las tarjetas de clases y planes entran desde lados alternados con un recorrido más amplio, una inclinación de 4 grados y escala inicial de 0,91. La entrada dura 1050 ms, con separación de 160 ms entre tarjetas de una misma fila y un máximo de 480 ms de espera. En móvil se reduce el recorrido horizontal. La fila se calcula cuando entra en pantalla, para adaptarse a cambios de tamaño.

La frase «No hace falta ser la mejor. Hace falta empezar.» tiene una secuencia propia: tres fotografías se abren en abanico mientras el texto avanza por etapas. La sección permanece en pantalla durante una parte del desplazamiento, usando `position: sticky` y scroll nativo. No se intercepta la rueda ni se bloquea la navegación. La composición toma el lenguaje de bloques fotográficos grandes y tarjetas en movimiento de las referencias, incluido `Download (11).mp4`.

## Ver la versión

- [Grabación de la página en funcionamiento](previews/motion-demo.mp4)
- [Portada de escritorio](previews/hero-desktop.png)
- [Portada de móvil](previews/hero-mobile.png)
- [Secuencia de fotografías y tipografía](previews/motion-story.png)

En la terminal de VS Code, dentro del proyecto:

```bash
git fetch origin
git switch codex/valkiria-motion
git pull --ff-only origin codex/valkiria-motion
npm ci
npm run dev
```

Si la rama no existe localmente, usar `git switch --track origin/codex/valkiria-motion`. Conservar los cambios propios antes de cambiar de rama; no descartarlos. Abrir en el navegador la dirección que muestra la terminal en tu computadora. No se necesita contratar hosting para desarrollar.

Para la versión compilada, detener el servidor de desarrollo y ejecutar `npm run build` y luego `npm run start`.

## Movimiento y accesibilidad

- El botón circular de pausa, encima de los accesos a redes, detiene la portada, las entradas, los carruseles, la cinta y las fotografías ligadas al scroll. Tiene nombre accesible, estado y tooltip.
- Las entradas se ejecutan una sola vez. Al llegar con el teclado se cancela la entrada del elemento para poder usarlo inmediatamente.
- La preferencia de movimiento reducido muestra la frase completa, elimina la sección fijada y deja las fotografías quietas. Funciona al cargar y al cambiar la preferencia durante la visita.
- La portada detiene su animación cuando sale de pantalla o la pestaña queda oculta. El scroll pide un único frame por evento; no hay un bucle de JavaScript continuo.
- Sin JavaScript, todo el contenido permanece visible y la secuencia es una composición estática. Si falla la imagen principal, quedan el fondo oscuro, el título y el CTA.
- El formulario sigue preparando una consulta para WhatsApp; no confirma reservas ni envía mensajes automáticamente.

## Archivos principales

| Archivo | Responsabilidad |
| --- | --- |
| `public/motion.js` | Entradas y control global de pausa. |
| `public/cinematic.js` | Acercamiento fotográfico y secuencia de scroll. |
| `app/cinematic.css` | Portada, composición de fotos, pausa y adaptación a pantallas. |
| `app/page-content.js` | Marcado de las secciones y flechas SVG. |
| `app/site-scripts.jsx` | Inicialización y limpieza. |

No se añadieron dependencias a la aplicación. `public/scene.js` conserva el renderizador anterior, pero ya no se carga en esta variante. La skill Impeccable sigue disponible como herramienta de diseño del proyecto.

## Validación

- `npm run build`: aprobado con Next 16.4.0.
- Chromium, tamaños 1440×1000, 820×1180 y 390×844: portada, etapas de scroll, clases y planes revisados; sin errores de JavaScript ni desbordes horizontales.
- Comprobación adicional de ancho de 320 px en portada, secuencia, clases, planes y formulario: aprobada.
- Tiempo de reproducción de la portada comprobado: avanza, se pausa, reanuda y se detiene fuera de pantalla.
- Transformaciones de las fotografías comprobadas: cambian al desplazar y se congelan al pausar.
- Entradas de tarjetas comprobadas: recorrido ampliado, retrasos escalonados y ejecución única.
- Navegación de galería con teclado y formulario aprobados. La apertura de WhatsApp se interceptó; no se envió ningún mensaje.
- Preferencia de movimiento reducido inicial y durante la visita, ausencia de JavaScript y fallo de la imagen principal: aprobados.
- Detector de diseño de Impeccable: sin hallazgos en los archivos nuevos de interfaz analizados.

Las pruebas utilizaron Playwright y Chromium instalados fuera de la aplicación. No se probaron Safari, Firefox ni dispositivos físicos. La validación interactiva corresponde a la versión compilada. El problema previo de HMR en el navegador de este entorno y el script heredado `next lint` quedan fuera de este cambio.

Para producir un hero basado en filmación con más detalle que el material disponible, conviene una toma horizontal de 1080p o 4K, sin textos incrustados y con cámara estable. El video original recibido es una captura vertical con textos; recortarlo y ampliarlo pierde demasiado detalle para esta portada.
