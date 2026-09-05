---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Self-Hosted
subtitle: Services you run yourself at home or on your own infrastructure
---

Running your own services instead of depending on a SaaS: media servers, the automation around them, the downloaders that feed them, and the utilities that sustain the home network. Everything these services need — networking, storage, remote access, and backups — is covered in the rest of this section.

## Media Servers & Streaming

| Platform   | Profile                           | Stands out in                                                |
| ------------ | -------------------------------- | --------------------------------------------------------- |
| **Plex**     | All-in-one media server         | Clients on every device, centralized metadata |
| **Jellyfin** | Open-source media server         | Free, no account or third-party servers               |
| **Emby**     | Classic media server             | Robust transcoding, plugins                              |

- **Plex** is the most polished: its own catalog, native clients on TV, phone, and browser, and an app that works even outside the home via its authentication cloud.
- **Jellyfin** is the open alternative: same model (serving the media library via streaming), but without depending on accounts or external services — everything runs and is controlled on your own infrastructure.
- **Emby** is the commercial predecessor of Jellyfin: rich in transcoding features and plugins, with centralized management like Plex.

What these servers store and serve is media: object storage or file storage depending on volume, with the backup strategy from [ops-backup](../ops-backup/).

## rr Stack (Media Automation & Indexing)

| App          | What it does                                                        |
| ------------ | --------------------------------------------------------------- |
| **Sonarr**   | Automates TV series: searches, downloads, and organizes new episodes  |
| **Radarr**   | Same as Sonarr but for movies                            |
| **Prowlarr** | Unified index management for the rest of the stack        |
| **Bazarr**   | Downloads and syncs subtitles for the library               |
| **Readarr**  | Same as Sonarr/Radarr but for books and ebooks               |

- **Prowlarr** centralizes indexers: all apps in the family query the same place, without configuring each search per app.
- **Sonarr / Radarr / Readarr** cover each media type (series, movies, books): watch for what's missing, request it from the downloader, and move it to the organized library the media server consumes.

## Downloaders & Content Retrieval

| Platform       | Profile                     | Use                                  |
| ---------------- | -------------------------- | ------------------------------------ |
| **qBittorrent**  | BitTorrent client         | Torrent download, with API        |
| **SABnzbd**      | Usenet client             | Binary download via NZB, queues  |
| **Transmission** | Lightweight BitTorrent client | Minimalist, headless daemon         |

- **qBittorrent** is the reference torrent client for self-hosted: web interface, API for the rr stack apps to trigger downloads, and fine-grained limit control.
- **SABnzbd** covers the Usenet side: processes NZB files, downloads in queue, and handles post-processing.
- **Transmission** is the simple one: a lightweight daemon with a web interface for those who want the minimum.

These downloaders receive requests from the rr stack and notify when the download is ready to organize.

## Home Automation & Utilities

| Platform               | What it does                                                            |
| ------------------------ | -------------------------------------------------------------------- |
| **Home Assistant**       | Home automation hub: integrates devices and scenes  |
| **Pi-hole**              | DNS-level ad blocking across the entire network                    |
| **Vaultwarden**          | Self-hosted password manager (Bitwarden-compatible)        |
| **Nginx Proxy Manager**  | Reverse proxy with web interface for exposing services with HTTPS     |

- **Home Assistant** orchestrates home devices (lights, sensors, climate) in a single panel and with automations.
- **Pi-hole** positions itself as the network's DNS resolver and blocks ads and trackers for all devices, without installing anything on each one — a network service, see [ops-traffic](../ops-traffic/).
- **Vaultwarden** is a lightweight reimplementation of the Bitwarden server: passwords synced on your own infrastructure.
- **Nginx Proxy Manager** is the friendly reverse proxy: exposes home services to the outside with automatic SSL/TLS certificates, backed by [ops-traffic](../ops-traffic/) and secured per [ops-netsecurity](../ops-netsecurity/).

To access all of this from outside the local network, the pattern is the same as the rest of the home: personal tunnels and meshes like WireGuard or Tailscale, see [ops-sdn](../ops-sdn/).

> Self-hosting is the practical case that ties everything together: the networking from [ops-physical-network](../ops-physical-network/), the storage from [ops-storage](../ops-storage/), the remote access from [ops-sdn](../ops-sdn/), and the backup from [ops-backup](../ops-backup/).
