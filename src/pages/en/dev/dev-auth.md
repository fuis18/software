---
layout: ../../../layouts/Layout.astro
eyebrow: Dev
title: Dev Auth
subtitle: Identity and authentication, cross-cutting backend and frontend
---

## Identity & Auth

| Piece        | What it is                 | Role                                                                                             |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------------------ |
| **Keycloak** | Identity Provider          | Centralizes users and login, and issues tokens; runs as its own service (self-hosted)            |
| **OIDC**     | Authentication protocol    | Identity layer on top of OAuth2.0 — adds the concept of "who is the user"                       |
| **OAuth2.0** | Authorization framework    | Defines how an app obtains permission to act on behalf of a user without knowing their password  |
| **JWT**      | Token                      | Signed, self-contained token format in which identity and permissions travel                     |

### How They Relate

- **OAuth2.0** is the authorization framework: it defines flows (authorization code, client credentials, etc.) for an app to obtain access without handling the user's password.
- **OIDC** builds on top of OAuth2.0, adding the identity layer: in addition to the access token, it delivers an `id_token` that says who the user is.
- **JWT** is the format in which those tokens almost always travel — a signed string with claims (user, permissions, expiration) that any service can verify without asking the identity provider again.
- **Keycloak** is the piece that implements all of this: it runs OIDC/OAuth2.0 and issues JWTs.

## Frontend: Auth.js

- Library for handling frontend authentication (formerly NextAuth): ready-to-use OAuth providers, session management, and direct integration with frameworks like Next.js.
- Connects to the same OIDC/OAuth2.0 flow that Keycloak (or another identity provider) exposes, without having to implement the flow manually on the client.
