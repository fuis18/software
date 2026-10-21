---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Front Utilities
subtitle: Specific utilities — PDF, images, video, slides, and documentation
---

## JavaScript Tools

| Tool            | Use                                                     |
| --------------- | ------------------------------------------------------- |
| **Hyperframes** | Video editing                                           |
| **Remotion**    | Create videos programmatically, composing with React    |
| **Reveal.js**   | Create presentations/slides in HTML                     |
| **Eleventy**    | Transforms markdown into HTML while preserving styling  |
| **date-fns**    | Immutable, modular date utilities (parse, format, diff) |
| **mintlify**    | AI-native documentation platform: docs from Git, API playground, AI assistant |
| **react-doctor**| React antipattern scanner: `npx react-doctor@latest` — performance, security, accessibility |

## Images

Image conversion, compression, and delivery for the web.

| Tool         | What it does                                                                                 |
| ------------ | -------------------------------------------------------------------------------------------- |
| **Squoosh**  | Compresses, resizes, and converts images in the browser (Google Chrome Labs)                 |
| **imgto.xyz**| Fast format conversion (PNG, WebP, HEIC, JPG) with nothing to install                        |
| **Cloudinary**| Image and video management and delivery: on-the-fly transformations and CDN                 |

- **Squoosh** processes the image locally with WebAssembly, never uploading it to a server: compare codecs and qualities side by side before downloading the result.
- **imgto.xyz** is the minimalist shortcut: drag, drop, and download the converted file — for when there's no need to compare quality.
- **Cloudinary** covers the full production pipeline: storage, URL-based transformations, and CDN-optimized delivery for images and video.
