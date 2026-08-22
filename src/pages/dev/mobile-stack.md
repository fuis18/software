---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Mobile Stack
subtitle: Frameworks para apps móviles nativas y multiplataforma
---

## Frameworks

| Framework                    | Tipo                              | Destaca en                                              |
| ---------------------------- | --------------------------------- | ------------------------------------------------------- |
| **Flutter**                  | Multiplataforma, render propio    | Una sola codebase para móvil, web y desktop con UI propia |
| **React Native**             | Multiplataforma, JS/TS            | Apps con React reutilizando conocimiento de frontend web |
| **Kotlin Multiplatform**     | Lógica compartida, UI nativa      | Compartir negocio/red/datos sin resignar UI nativa       |
| **SwiftUI**                  | Nativo iOS/iPadOS                 | Apps Apple con el stack oficial declarativo              |
| **Jetpack Compose**          | Nativo Android                    | Apps Android con el stack oficial declarativo            |
| **Tauri**                    | Web empaquetado (v2 también móvil)| Bundle liviano reutilizando un frontend web              |
| **Capacitor**                | Web empaquetado                   | Migrar una web app existente a las stores con plugins    |

### Flutter

**Multiplataforma con render propio**

- Compila Dart a código nativo y dibuja toda la UI con su propio motor (Impeller): los píxeles son idénticos en iOS y Android porque no usa los widgets del sistema.
- Todo el ecosistema es de Google: lenguaje Dart, widgets Material y Cupertino integrados, hot reload y tooling único (`flutter` CLI).
- Elegilo cuando el objetivo es máxima consistencia visual entre plataformas y un solo equipo manteniendo una sola codebase desde el día uno.

### React Native

**Multiplataforma con JavaScript/TypeScript**

- La lógica corre en JS/TS y la UI se traduce a componentes nativos reales de cada plataforma — se ve y se comporta como app nativa, no como webview.
- Con **Expo** como capa sobre RN: tooling completo (build en la nube con EAS, actualizaciones OTA, módulos listos) que elimina casi todo el trabajo con Xcode/Gradle manual.
- Elegilo cuando el equipo ya viene de React web: mismo modelo mental (componentes, hooks, estado), y el puente nueva arquitectura (JSI) resolvió los cuellos de botella históricos de performance.

### Kotlin Multiplatform

**Lógica compartida, UI nativa**

- Comparte business logic, networking y persistencia como librería Kotlin compilada a binario nativo por plataforma; la UI sigue siendo SwiftUI en iOS y Compose en Android.
- **Compose Multiplatform** extiende la opción: si se quiere, hasta la UI puede ser compartida — pero sin obligarlo, que es su gran diferencia con Flutter.
- Elegilo cuando hay equipos separados de iOS/Android que no quieren perder el SDK nativo, pero sí dejar de duplicar reglas de negocio y capas de datos.

### SwiftUI

**Nativo Apple**

- El framework declarativo oficial de Apple: la UI se describe como función del estado, con previews en vivo en Xcode y integración total con el ciclo de vida del sistema.
- Acceso directo a todo lo del ecosistema: widgets, App Intents (Siri/Shortcuts), HealthKit, ARKit, notificaciones push — sin capas intermedias.
- Elegilo si el target es exclusivamente Apple o si la app depende profundamente de APIs del sistema; es el camino de menor fricción en iOS.

### Jetpack Compose

**Nativo Android**

- El framework declarativo oficial de Android: composables como funciones del estado, interoperable con las Views existentes para migrar en forma incremental.
- Se integra con todo el toolkit moderno: Room, Retrofit, WorkManager, CameraX, y con **Kotlin Multiplatform** como vía natural de compartir código después.
- Elegilo para cualquier app Android seria hoy: es el estándar recomendado por Google y donde llega primero cada novedad de la plataforma.

### Tauri

**Web empaquetado, liviano**

- Desde la versión 2 empaqueta un frontend web también en iOS y Android: el core Rust corre nativo y la UI vive en el webview del sistema — bundles mínimos comparados con alternativas.
- El modelo de permisos explícitos controla qué APIs nativas (cámara, biometría, notificaciones) puede tocar la app, plugin por plugin.
- Elegilo cuando ya existe un frontend web que quiere llegar al móvil, o cuando el equipo prefiere Rust para la capa nativa y livianez sobre todo lo demás.

### Capacitor

**La web app como app nativa**

- Toma una web app (React, Vue, lo que sea) y la ejecuta dentro de un webview nativo con acceso a plugins: cámara, GPS, push, storage — la vía directa de Ionic hacia las stores.
- A diferencia de React Native no traduce componentes: corre el DOM real, así que el 100% del código web se reutiliza tal cual.
- Elegilo cuando migrar a las stores importa más que la performance nativa pura — apps de contenido, formularios y dashboards donde el gap con una app nativa no se nota.

> La decisión se ordena en dos preguntas: ¿cuánto importa verse nativo? (KMP > React Native > Flutter > Capacitor/Tauri) y ¿qué sabe ya el equipo? (web → RN/Capacitor, Dart → Flutter, nativo → SwiftUI/Compose).
