---
layout: ../../layouts/Layout.astro
eyebrow: Dev
title: Dev Auth
subtitle: Identidad y autenticación, transversal a backend y frontend
---

## Identity & Auth

| Pieza        | Qué es                     | Rol                                                                                                |
| ------------ | -------------------------- | -------------------------------------------------------------------------------------------------- |
| **Keycloak** | Identity Provider          | Centraliza usuarios y login, y emite los tokens; se levanta como servicio propio (self-hosted)     |
| **OIDC**     | Protocolo de autenticación | Capa de identidad sobre OAuth2.0 — agrega el concepto de "quién es el usuario"                     |
| **OAuth2.0** | Framework de autorización  | Define cómo una app obtiene permiso para actuar en nombre de un usuario, sin conocer su contraseña |
| **JWT**      | Token                      | Formato de token firmado y auto-contenido en el que viaja la identidad y los permisos              |

### Cómo se relacionan

- **OAuth2.0** es el framework de autorización: define flujos (authorization code, client credentials, etc.) para que una app obtenga acceso sin manejar la contraseña del usuario.
- **OIDC** se construye encima de OAuth2.0, sumando la capa de identidad: además del access token, entrega un `id_token` que dice quién es el usuario.
- **JWT** es el formato en el que casi siempre viajan esos tokens — un string firmado con claims (usuario, permisos, expiración) que cualquier servicio puede verificar sin volver a preguntarle al identity provider.
- **Keycloak** es la pieza que implementa todo esto: corre OIDC/OAuth2.0 y emite los JWT.

## Frontend: Auth.js

- Librería para manejar autenticación del lado frontend (ex NextAuth): providers OAuth listos para usar, manejo de sesión, e integración directa con frameworks como Next.js.
- Se conecta al mismo flujo OIDC/OAuth2.0 que expone Keycloak (u otro identity provider), sin tener que implementar el flujo a mano en el cliente.
