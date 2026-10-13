# VALKIRIA GYM — DESIGN SYSTEM

## Objetivo
Reflejar la propuesta visual de Valkiria: un gimnasio femenino en Buenos Aires, con una experiencia editorial cálida, accesible y en movimiento.

## Personalidad de marca
- Fuerza
- Disciplina
- Energía
- Comunidad
- Profesionalismo
- Movimiento

## Estética
- Alternar secciones oscuras y claras para dar ritmo.
- Usar títulos grandes, composición editorial y mucho espacio.
- Usar el logo VAK provisto como marca principal en navegación y pie.
- Usar el logo PNG original provisto por el gimnasio.
- Alinear los acentos visuales con el negro, blanco y magenta del logo y las piezas del gimnasio.
- Combinar fotografías reales del gimnasio con una ilustración 3D claramente identificada como conceptual.
- Mantener las animaciones pausables, sutiles y respetuosas de `prefers-reduced-motion`.

## Paleta
- Tinta: #17151A
- Papel: #F0EEE8
- Acento magenta VAK: #D90B55
- Texto secundario sobre oscuro: #B4ADB9
- Mantener contraste legible entre las superficies claras y oscuras.

## Tipografía
Usar Arial/Helvetica para la interfaz y el texto general. Reservar Georgia en cursiva para énfasis editoriales.
- Titulares: grandes, de peso medio y espaciado compacto.
- Texto general: legible y con interlineado amplio.

## Hero
- Mantener el título “Tu fuerza. Tu ritmo. Tu lugar.” y el CTA hacia el formulario.
- La mancuerna 3D es una ilustración conceptual, no equipamiento confirmado.
- Conservar la etiqueta que aclara que el objeto es ilustrativo.
- Mantener el fondo oscuro con luz magenta, órbita y grilla sutiles.

## Secciones aprobadas
1. Hero y cinta de palabras
2. Instalaciones
3. Sobre nosotros
4. Frase motivacional
5. Clases y actividades
6. Planes mensuales
7. Días y horarios
8. Reseñas
9. Manifiesto
10. Formulario de consulta
11. Ubicación y preguntas frecuentes
12. Footer y accesos a redes

## Instalaciones
- Usar las cuatro fotografías locales en `public/assets/`, con sus textos alternativos y enlaces a Google Maps.
- Mantener el carrusel separado de las reseñas por las secciones sobre nosotros, frase y planes.
- Las imágenes provienen de la ficha de Google Maps y son una captura manual de 2023–2024.

## Reseñas
- Mostrar únicamente la captura manual de las cinco valoraciones enlazadas a Google Maps.
- Indicar que la valoración (4,8/5) se consultó el 13/10/2026 y que no es una sincronización en vivo.
- No inventar ni editar testimonios.

## Planes
- Presentar el pase libre en una sección propia, como texto y tarjetas; no publicar la imagen del volante.
- Valores informados: 3 meses $75.000, 6 meses $138.000 y 12 meses $252.000.
- Indicar que los valores no son acumulables con otros descuentos.
- Derivar las consultas de planes y condiciones vigentes a WhatsApp.

## Clases y horarios
- Clases informadas: Cross, GAP, Salsa, Step, Zumba y Yoga; también hay entrenamiento libre.
- Usar las imágenes originales provistas para las clases; no sustituirlas por ilustraciones nuevas.
- Horarios publicados en las piezas: Cross, martes y jueves a las 10:00; GAP, martes y jueves a las 19:00; Salsa, sábados a las 10:30.
- Consultar por WhatsApp los horarios de Step, Zumba, Yoga y entrenamiento libre; no inventar horarios.
- Horario general del gimnasio: lunes a viernes, 07:00 a 20:00; sábados, 09:00 a 13:00; domingos, cerrado.

## Contacto y reservas
- WhatsApp: 011 7235-7022 (`+54 9 11 7235-7022`).
- Instagram: `@gimnasio_valkiria`.
- Dirección: Guillermo Marconi 3254, Isidro Casanova.
- El formulario solo prepara un mensaje para WhatsApp: no reserva cupos, no cobra y no guarda los datos ingresados.

## Animaciones
- La ilustración 3D, la cinta y los carruseles deben poder pausarse.
- Respetar `prefers-reduced-motion`; permitir navegación manual con botones y teclado.
- Evitar animaciones que dificulten la lectura o el uso del formulario.

## Responsive
Diseñar mobile-first.
Breakpoints de referencia:
- Mobile: < 768px
- Tablet: 768–1023px
- Desktop: >= 1024px

## Accesibilidad
- Contraste AA como mínimo.
- Texto legible.
- Focus visible en controles.
- Imágenes con alt descriptivo.
- No depender solo del color.

## Rendimiento
- Priorizar WebP/AVIF.
- Lazy-loading fuera del hero.
- No cargar librerías pesadas si CSS resuelve el efecto.
- El hero 3D usa WebGL y debe fallar de forma segura si el dispositivo no lo soporta.

## Archivos de contenido
- `app/page-content.js` contiene el marcado de las secciones.
- `public/content.js` conserva la captura manual de fotos y reseñas.
- `public/site.js` implementa carruseles, controles y el formulario de WhatsApp.
- `public/scene.js` dibuja la ilustración WebGL del hero.
- Las fotos de la galería viven en `public/assets/`.

## Elementos bloqueados
NO modificar sin aprobación:
- Logo
- Colores corporativos finales
- Fotografías originales
- Orden aprobado de secciones
- Información comercial
- Links de WhatsApp, Instagram y ubicación
- Textos finales aprobados

## Regla para asistentes de IA
Antes de hacer cambios visuales:
1. Leer este archivo.
2. Preservar los elementos bloqueados.
3. Cambiar solo lo solicitado.
4. No rediseñar áreas no relacionadas.
5. Mantener consistencia con el sistema visual.
