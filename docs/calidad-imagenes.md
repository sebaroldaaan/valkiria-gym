# Presentación con las imágenes disponibles

Actualización basada en `3dad9956a3150b3f3d7d0394ce92dc1df985bc76` (`codex/valkiria-gallery-hover`). Rama de entrega: `codex/valkiria-image-quality`.

Se usaron las fotografías y piezas existentes. No se incorporaron fotos de stock ni se inventaron instalaciones. La portada sigue siendo una fotografía animada, no una filmación nueva.

## Cambios

- Portada: exportaciones WebP a 640, 960 y 1128px desde la imagen limpia PNG preparada anteriormente. Selección responsive, prioridad de carga y panel limitado a 1000px en escritorio. Acercamiento de 1,015 a 1,045; se conserva el movimiento al desplazarse.
- Instalaciones: proporción original 3:4 o 4:3, con altura común. El encuadre horizontal ya no se recorta a vertical. Dimensiones explícitas tanto en el HTML inicial como en el contenido que genera JavaScript. Espacio interior para el efecto de elevación y rotación existente.
- Clases: WebP de 480/768px con dimensiones y selección responsive. Los tres archivos de 768px suman 250.832 bytes, frente a aproximadamente 3,5 MiB de los PNG. Los originales permanecen en el repositorio.
- Logo: versión WebP de 300px para la navegación y el pie, sin modificar el diseño original.
- Pie: reemplazado el enlace roto a `briefing.html` por el formulario de consulta, y la nota de prototipo por la dirección del gimnasio.
- Iconos de pestaña y acceso móvil derivados del logo original. Tarjeta para compartir de 1200×630 con la fotografía disponible y el texto aprobado.

## Validación

Build de producción correcto con Next 16.4.0. Revisión en Chromium a 1920×1080, 820×1180 y 390×844; comprobación adicional de desbordamiento a 320px. Verificados los encuadres, espacio para el hover, imágenes responsive, icono y endpoint de la tarjeta para compartir. Sin errores JavaScript en estas comprobaciones.

Pasaron los escenarios de pausa/reanudación, fotografía detenida fuera de pantalla, secuencia de fotos al hacer scroll, entradas escalonadas, teclado del carrusel, movimiento reducido, contenido sin JavaScript y fallo de carga de la portada. El formulario se comprobó interceptando la apertura de WhatsApp; no se envió un mensaje real. El mapa externo se sustituyó por una respuesta vacía durante las capturas automatizadas.

`npm run lint` conserva la limitación anterior: invoca `next lint`, retirado en esta versión de Next. No se presenta como una comprobación aprobada.

## Al publicar

Configurar `SITE_URL` con el origen público definitivo antes del build. En Vercel se puede utilizar automáticamente `VERCEL_URL` para una vista previa. Sin esas variables, Next usa su origen local para las etiquetas sociales y muestra una advertencia esperada; la imagen existe, pero las vistas previas externas requieren una URL pública accesible. No se inventó un dominio ni una URL canónica.

Esta entrega queda en una rama de revisión. Las capturas `docs/previews/quality-*` muestran esta versión; el video de demostración anterior corresponde a la iteración de movimiento previa.

## Material para una futura etapa

Las fuentes actuales tienen un límite real de detalle, especialmente en pantallas de alta densidad. Si el cliente compra la página, solicitar fotografías actuales del interior y frente, y una filmación horizontal sin textos. La foto histórica del frente conserva el cartel Nissi visible; no se modificó ni se presentó como una toma reciente.
