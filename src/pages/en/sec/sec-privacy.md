---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec Privacy
subtitle: Own privacy stack and self-hosting
---

The most direct way to protect your own data is not to hand it over: services that run on your own infrastructure, without relying on third parties that accumulate it. Self-hosting as a privacy stance.

## The Pattern

Each piece replaces a cloud service with your own, running on your infrastructure — the same foundation as [ops-selfhosted](../../ops/ops-selfhosted/), but with privacy as the objective.

| Service being replaced      | Self-hosted alternative                |
| --------------------------- | -------------------------------------- |
| Google Search               | **SearXNG** (private search engine)    |
| WhatsApp / Discord          | **Matrix** (messaging)                 |
| Google Contacts / Calendar  | **CardDAV / CalDAV**                   |
| Gmail / Outlook             | **Own mail** on OpenBSD                |
| Browser with tracking       | **Mullvad Browser**                    |
| Access to services          | **nginx** as reverse proxy             |

## Stack Pieces

### nginx as Reverse Proxy

The entry point for the entire stack: nginx as a reverse proxy receives traffic, terminates TLS, and routes it to each internal service — without exposing individual ports to the outside. The full mechanics are in [ops-traffic](../../ops/ops-traffic/).

### SearXNG

A **private search engine** self-hosted: aggregates results from multiple search engines without sending your history or IP to a single provider, and without accounts or profiling.

### Matrix

**Decentralized messaging**: communication goes through your own servers (or federated ones), with end-to-end encryption, without a central intermediary accumulating messages. The open-source reference protocol against corporate messaging apps.

### CardDAV / CalDAV

Open standards for **contacts and calendar**: your phone and apps sync against your own server instead of against Google. Any app that supports these protocols connects directly.

### Mail on OpenBSD

**Own mail** on a minimal and secure operating system: **Postfix** (or **OpenSMTPD**) as MTA and the delivery infrastructure on OpenBSD. It's the most delicate piece of the stack — mail requires continuous DNS maintenance (SPF, DKIM, DMARC) so messages don't end up in spam.

### Mullvad Browser

The **browser** with privacy by design: the hardened version of Firefox that uses the Tor network as a base, with reduced fingerprinting and no account — for browsing without the browser itself being the source of tracking.

## The Common Thread

- **nginx** ties all pieces together behind a single entry point with TLS.
- **External access** — if you want to reach the stack from outside the house, the pattern is the same as everywhere else: tunnels and personal meshes, see [ops-sdn](../../ops/ops-sdn/).
- **Backup** — mail, contacts, and calendar data are backed up like any other service: see [ops-backup](../../ops/ops-backup/).

> Self-hosted privacy is an architecture decision, not a tool: every service pulled out of a third party's cloud is a data flow that stops accumulating outside — and every piece that runs becomes infrastructure that needs maintaining, the same work described throughout the [ops](../../ops/) section.
