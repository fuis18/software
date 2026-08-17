---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Self-Hosted
subtitle: Servicios propios que se corren en casa o en infraestructura propia
---

Correr servicios propios en vez de depender de un SaaS: media servers, la automatización que los rodea, los descargadores que los alimentan y las utilidades que sostienen la red de la casa. Todo lo que estos servicios necesitan — red, almacenamiento, acceso remoto y backups — está en el resto de esta sección.

## Media Servers & Streaming

| Plataforma   | Perfil                           | Destaca en                                                |
| ------------ | -------------------------------- | --------------------------------------------------------- |
| **Plex**     | Media server todo-en-uno         | Clientes en todos los dispositivos, metadatos centralizados |
| **Jellyfin** | Media server open source         | Libre, sin cuenta ni servidores de terceros               |
| **Emby**     | Media server clásico             | Transcoding robusto, plugins                              |

- **Plex** es el más pulido: catálogo propio, clientes nativos en TV, teléfono y navegador, y una app que funciona incluso fuera de casa vía su nube de autenticación.
- **Jellyfin** es la alternativa abierta: mismo modelo (servir la biblioteca de media por streaming), pero sin depender de cuentas ni servicios externos — todo corre y se controla en tu propia infraestructura.
- **Emby** es el predecesor comercial de Jellyfin: rico en features de transcoding y plugins, con la gestión centralizada de Plex.

Lo que estos servidores guardan y sirven es media: almacenamiento de objetos o file según el volumen, con la estrategia de respaldo de [ops-backup](../ops-backup/).

## rr Stack (Media Automation & Indexing)

| App          | Qué hacer                                                        |
| ------------ | --------------------------------------------------------------- |
| **Sonarr**   | Automatiza series: busca, descarga y organiza episodios nuevos  |
| **Radarr**   | Igual que Sonarr pero para películas                            |
| **Prowlarr** | Gestión unificada de indexadores para el resto del stack        |
| **Bazarr**   | Descarga y sincroniza subtítulos de la biblioteca               |
| **Readarr**  | Igual que Sonarr/Radarr pero para libros y ebooks               |

- **Prowlarr** centraliza los indexadores: todas las apps de la familia preguntan al mismo lugar, sin configurar cada búsqueda por app.
- **Sonarr / Radarr / Readarr** cubren cada tipo de media (series, películas, libros): vigilan lo que falta, lo piden al descargador y lo mueven a la biblioteca ya organizada que consume el media server.

## Downloaders & Content Retrieval

| Plataforma       | Perfil                     | Uso                                  |
| ---------------- | -------------------------- | ------------------------------------ |
| **qBittorrent**  | Cliente BitTorrent         | Descarga por torrent, con API        |
| **SABnzbd**      | Cliente Usenet             | Descarga de binaries por NZB, colas  |
| **Transmission** | Cliente BitTorrent liviano | Minimalista, daemon headless         |

- **qBittorrent** es el cliente torrent de referencia para self-hosted: interfaz web, API para que las apps del rr stack disparen descargas, y control fino de límites.
- **SABnzbd** cubre el lado Usenet: procesa archivos NZB, descarga en cola y maneja la post-procesamiento.
- **Transmission** es el simple: un daemon liviano con interfaz web para quien quiere lo mínimo.

Estos descargadores reciben las peticiones del rr stack y les avisan cuándo la descarga está lista para organizar.

## Home Automation & Utilities

| Plataforma               | Qué hacer                                                            |
| ------------------------ | -------------------------------------------------------------------- |
| **Home Assistant**       | Centro de automatización del hogar: integra dispositivos y escenas  |
| **Pi-hole**              | Bloqueo de anuncios a nivel de DNS en toda la red                    |
| **Vaultwarden**          | Gestor de contraseñas self-hosted (compatible con Bitwarden)        |
| **Nginx Proxy Manager**  | Proxy reverso con interfaz web para exponer servicios con HTTPS     |

- **Home Assistant** orquesta los dispositivos del hogar (luces, sensores, clima) en un solo panel y con automatizaciones.
- **Pi-hole** se posiciona como resolver DNS de la red y bloquea anuncios y trackers para todos los dispositivos, sin instalar nada en cada uno — un servicio de red, ver [ops-traffic](../ops-traffic/).
- **Vaultwarden** es una reimplementación liviana del servidor de Bitwarden: contraseñas sincronizadas en infraestructura propia.
- **Nginx Proxy Manager** es el proxy reverso amigable: se exponen servicios de la casa hacia afuera con certificados SSL/TLS automáticos, apoyado en [ops-traffic](../ops-traffic/) y protegido según [ops-netsecurity](../ops-netsecurity/).

Para acceder a todo esto desde fuera de la red local, el patrón es el mismo que el resto de la casa: túneles y mallas personales como WireGuard o Tailscale, ver [ops-sdn](../ops-sdn/).

> Self-hosting es el caso práctico que une todo lo demás: la red de [ops-physical-network](../ops-physical-network/), el almacenamiento de [ops-storage](../ops-storage/), el acceso remoto de [ops-sdn](../ops-sdn/) y el respaldo de [ops-backup](../ops-backup/).
