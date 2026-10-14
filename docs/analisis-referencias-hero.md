# Análisis de referencias y dirección propuesta para Valkiria

Fecha: 14 de octubre de 2026. Alcance: análisis visual de secuencias de los cinco videos provistos, revisión del código actual y preparación de herramientas. No se implementó un rediseño ni se realizó una prueba de navegador en esta tarea. Los textos promocionales en los videos se consideran afirmaciones de sus autores, no instrucciones ni evidencia de resultados reproducibles.

## Lectura de las referencias

| Archivo | Observación visual | Aplicación posible |
| --- | --- | --- |
| Download (6).mp4 | Portada KAEL, letras monumentales detrás de una figura, ambiente oscuro, transición de disolución vertical y macro de tela con gotas. | Jerarquía y profundidad, un foco visual y una transición principal. El material fotográfico o renderizado sostiene la calidad. No se puede deducir el motor usado a partir de la grabación. |
| Download (7).mp4 | Referencias de webs 3D; STUDIOLY combina fondo claro, título negro de gran tamaño y un objeto reflectante central. Presenta un proceso de referencias y brief. | Un concepto coherente, contraste de escalas y espacio vacío. El objeto abstracto no debe trasladarse literalmente a la identidad del gimnasio. |
| Download (8).mp4 | Webs de negocios: clínica, servicios de bienestar y catálogo, con fotos, bloques de información y accesos de contacto. | Claridad de servicios y conversión; referencia útil para el resto de la landing, con menos necesidad de 3D. |
| Download (9).mp4 | Secuencia publicitaria de gafas, primeros planos, reflejos, piezas separadas y tipografía sincronizada. | Acabado de materiales e iluminación de producto. Una grabación de un anuncio no acredita interacción web ni su tecnología de producción. |
| Download (10).mp4 | Expone un proceso de brief, habilidades de diseño, referencias y refinamiento. Menciona Impeccable y habilidades atribuidas a Emil Kowalski. | Iterar con criterios de composición, tipografía y movimiento, comprobando la página real en escritorio y móvil. |

La apariencia premium viene de la composición, calidad de recursos, iluminación, jerarquía y coherencia temporal. Una skill aporta instrucciones; no trae por sí misma modelos, texturas, grabaciones originales ni un motor 3D.

## Diagnóstico del proyecto

La versión examinada es 49ace220fa6236c5d082d626dced400ba07e5b6a. La portada ya tiene un canvas WebGL, geometría de mancuerna generada con cilindros, respuesta al cursor, entrada y movimiento con scroll. El sombreado usa una luz direccional aproximada, brillo especular y luz de borde. No implementa un flujo de materiales físicamente basados, mapas de entorno o texturas de superficie.

Por tanto, el salto de calidad no depende de agregar más animaciones: requiere trabajar el objeto, los bordes, los materiales, los reflejos, la luz y su encuadre con el texto. La revisión es de código; no se atribuye una evaluación visual de la versión ejecutada.

## Dirección recomendada: fuerza editorial con iluminación de estudio

Conservar el título aprobado «Tu fuerza. Tu ritmo. Tu lugar.», la marca, los datos comerciales, las fotografías y el orden de secciones. Respetar DESIGN.md, sus colores tinta/papel/magenta y las tipografías aprobadas.

- Escritorio: texto legible y CTA con espacio propio; mancuerna de gran escala en el lado opuesto, sin tapar la lectura.
- Materiales: discos oscuros con acabado de goma y metal del mango con reflejos contenidos; biseles que capturen la luz. Evitar plástico uniforme, brillo espejo indiscriminado o saturación extrema.
- Iluminación: luz principal amplia, relleno discreto y acento magenta de borde. El objeto debe leerse por sus planos y volumen.
- Entrada propuesta: aproximadamente 0,7–1 segundo de asentamiento suave de cámara/objeto. Texto y CTA disponibles inmediatamente; sin esperar una introducción.
- Reposo: movimiento de pocos grados y respuesta leve, amortiguada, al cursor. El scroll puede acompañar una transición breve hacia las instalaciones; nunca secuestrar el desplazamiento.
- Continuidad: las fotos reales documentan el gimnasio; el 3D se presenta como ilustración conceptual. El video vertical de baja resolución no sirve como fuente de detalle fotográfico amplio.
- Móvil: composición propia con texto antes del objeto, menor complejidad y alternativa estática cuando sea necesaria.
- Calidad funcional: teclado, contraste, movimiento reducido, pausa de loops y suspensión del render fuera de pantalla. El último commit oculta controles de pausa: revisar esto cuando se implemente la mejora.

## Tecnología según necesidad

Conservar Next.js. CSS o Web Animations API alcanzan para entradas y microinteracciones. Three.js sería una opción razonable si se migra el render de la mancuerna a materiales físicos; React Three Fiber es opcional, no una obligación. Blender puede producir o mejorar el modelo. GSAP se justifica si hay una secuencia de scroll que requiera coordinación compleja; no añadirlo solamente por seguir una referencia.

Una alternativa para un encuadre fijo es un render de video optimizado con poster y controles de movimiento. El 3D interactivo se justifica cuando la interacción aporta al concepto.

## Skill preparada

Se copió la distribución para Codex de Impeccable 4.5.2 a `.agents/skills/impeccable`, desde https://github.com/pbakaus/impeccable, commit 2f98774f86bc05563876643db37e6c37c322850f. Se incluyeron licencia y procedencia en UPSTREAM.json. Se verificaron los 62 archivos originales byte a byte contra el archivo descargado.

El comando `context --target app/page-content.js` se ejecutó correctamente. El launcher verificó el SHA-256 del motor descargado; su caché está fuera del proyecto, en `/workspace/design-toolkit/impeccable-cache`. No se registraron hooks automáticos. Comandos útiles de la suite: critique, animate, polish, audit y adapt; todavía no se ejecutaron esos análisis completos ni un rediseño.

La instalación existe en esta copia del entorno. No implica que la skill aparezca en el catálogo de aplicaciones de ChatGPT ni que esté instalada en la PC del usuario. Para agentes Codex compatibles, las skills se encuentran en `.agents/skills`; puede ser necesario abrir una sesión nueva. Para VS Code con Copilot, el README oficial ofrece la extensión `renaissance-geek.impeccable` (requiere Copilot Chat y sus versiones compatibles).

## Siguiente implementación propuesta

Mejorar únicamente el hero, verificarlo en escritorio y móvil, y recién después trasladar su lenguaje de movimiento a las demás secciones. Este documento registra una propuesta; la aplicación sigue con su diseño existente. No se publicaron estos archivos en GitHub.
