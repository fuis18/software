---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Front Utilities
subtitle: Utilidades puntuales — PDF, imágenes, video, diapositivas y documentación
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
