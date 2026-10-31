---
eyebrow: Dev
title: Front Utilities
subtitle: Utilidades puntuales — PDF, imágenes, video, diapositivas y documentación
group: Frontend - Web
order: 8
summary: Librerias para elaborar diferentes utilidades.
---

## Herramientas - JavaScript

| Herramienta     | Uso                                                      |
| --------------- | -------------------------------------------------------- |
| **Hyperframes** | Edición de video                                         |
| **Remotion**    | Crear videos programáticamente, componiendo con React    |
| **Reveal.js**   | Crear presentaciones/diapositivas en HTML                |
| **Eleventy**    | Transforma markdown en HTML manteniendo el estilo visual |
| **date-fns**    | Utilidades de fecha inmutables y modulares (parse, format, diff) |
| **mintlify**    | Plataforma de documentación AI-native: docs desde Git, playground de APIs, asistente AI |
| **react-doctor**| Scanner de antipatrones React: `npx react-doctor@latest` — performance, seguridad, accesibilidad |

## Imagen

Conversión, compresión y entrega de imágenes para la web.

| Herramienta  | Qué hace                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------- |
| **Squoosh**  | Comprime, redimensiona y convierte imágenes en el navegador (Google Chrome Labs)            |
| **imgto.xyz**| Conversión rápida entre formatos (PNG, WebP, HEIC, JPG) sin instalar nada                   |
| **Cloudinary**| Gestión y entrega de imágenes y video: transformaciones on-the-fly y CDN                   |

- **Squoosh** procesa la imagen localmente con WebAssembly, sin subirla a ningún servidor: compara codecs y calidades lado a lado antes de descargar el resultado.
- **imgto.xyz** es el atajo minimalista: arrastrar, soltar y descargar el archivo convertido — para cuando no hace falta comparar calidad.
- **Cloudinary** cubre el pipeline completo en producción: almacenamiento, transformación por URL y entrega optimizada por CDN para imágenes y video.

### Programático (Node)

| Librería   | Qué hace                                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| **sharp**  | Procesamiento de imágenes en Node (resize, convertir a WebP/AVIF): el motor de los pipelines de imágenes de Next.js y Astro |
| **tinify** | Cliente npm de la API de TinyPNG/Tinify: compresión en la nube, con API key                                     |

- **sharp** es la librería de referencia para procesar imágenes en build o en el servidor: sobre libvips, con la misma velocidad que usan los frameworks para optimizar imágenes en cada request.
- **tinify** delega la compresión en la nube de TinyPNG: se sube la imagen por API key y vuelve optimizada — útil cuando se prefiere la calidad de TinyPNG por sobre el procesamiento local.
