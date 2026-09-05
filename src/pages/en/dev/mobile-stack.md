---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Mobile Stack
subtitle: Frameworks for native and cross-platform mobile apps
---

## Frameworks

| Framework                    | Type                              | Excels in                                              |
| ---------------------------- | --------------------------------- | ------------------------------------------------------ |
| **Flutter**                  | Cross-platform, custom rendering  | One codebase for mobile, web, and desktop with custom UI |
| **React Native**             | Cross-platform, JS/TS             | Apps with React reusing frontend web knowledge          |
| **Kotlin Multiplatform**     | Shared logic, native UI           | Share business/network/data without sacrificing native UI |
| **SwiftUI**                  | Native iOS/iPadOS                 | Apple apps with the official declarative stack          |
| **Jetpack Compose**          | Native Android                    | Android apps with the official declarative stack        |
| **Tauri**                    | Packaged web (v2 also mobile)    | Lightweight bundles reusing a web frontend              |
| **Capacitor**                | Packaged web                      | Migrate an existing web app to the stores with plugins  |

### Flutter

**Cross-platform with custom rendering**

- Compiles Dart to native code and draws all UI with its own engine (Impeller): pixels are identical on iOS and Android because it doesn't use system widgets.
- The entire ecosystem is Google: Dart language, built-in Material and Cupertino widgets, hot reload and unique tooling (`flutter` CLI).
- Choose it when the goal is maximum visual consistency across platforms and a single team maintaining one codebase from day one.

### React Native

**Cross-platform with JavaScript/TypeScript**

- Logic runs in JS/TS and the UI translates to real native components on each platform — it looks and behaves like a native app, not a webview.
- With **Expo** as a layer on top of RN: complete tooling (cloud builds with EAS, OTA updates, ready-made modules) that eliminates almost all manual Xcode/Gradle work.
- Choose it when the team already comes from React web: same mental model (components, hooks, state), and the new architecture bridge (JSI) resolved the historical performance bottlenecks.

### Kotlin Multiplatform

**Shared logic, native UI**

- Shares business logic, networking, and persistence as a Kotlin library compiled to a native binary per platform; the UI remains SwiftUI on iOS and Compose on Android.
- **Compose Multiplatform** extends the option: if desired, even the UI can be shared — but without forcing it, which is its big difference from Flutter.
- Choose it when there are separate iOS/Android teams that don't want to lose the native SDK but do want to stop duplicating business rules and data layers.

### SwiftUI

**Native Apple**

- Apple's official declarative framework: UI is described as a function of state, with live previews in Xcode and full integration with the system lifecycle.
- Direct access to everything in the ecosystem: widgets, App Intents (Siri/Shortcuts), HealthKit, ARKit, push notifications — no intermediate layers.
- Choose it if the target is exclusively Apple or if the app deeply depends on system APIs; it's the lowest-friction path on iOS.

### Jetpack Compose

**Native Android**

- Android's official declarative framework: composables as state functions, interoperable with existing Views for incremental migration.
- Integrates with the entire modern toolkit: Room, Retrofit, WorkManager, CameraX, and with **Kotlin Multiplatform** as the natural path for sharing code later.
- Choose it for any serious Android app today: it's the standard recommended by Google and where every platform novelty arrives first.

### Tauri

**Packaged web, lightweight**

- From version 2 it also packages a web frontend on iOS and Android: the Rust core runs natively and the UI lives in the system webview — minimal bundles compared to alternatives.
- The explicit permissions model controls which native APIs (camera, biometrics, notifications) the app can access, plugin by plugin.
- Choose it when a web frontend already exists and wants to reach mobile, or when the team prefers Rust for the native layer and values lightness above all else.

### Capacitor

**The web app as a native app**

- Takes a web app (React, Vue, anything) and runs it inside a native webview with access to plugins: camera, GPS, push, storage — the direct path from Ionic to the stores.
- Unlike React Native it doesn't translate components: it runs the real DOM, so 100% of the web code is reused as-is.
- Choose it when getting to the stores matters more than pure native performance — content apps, forms, and dashboards where the gap with a native app isn't noticeable.

> The decision comes down to two questions: how much does looking native matter? (KMP > React Native > Flutter > Capacitor/Tauri) and what does the team already know? (web → RN/Capacitor, Dart → Flutter, native → SwiftUI/Compose).
