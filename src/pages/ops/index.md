---
layout: ../../layouts/Layout.astro
title: Ops
subtitle: Infraestructura, automatización y sistemas
---

Todo el ciclo de vida de la infraestructura: aprovisionamiento y automatización (Terraform, Ansible), contenedores y orquestación (Docker, Kubernetes), pipelines de CI/CD, observabilidad y las arquitecturas de sistemas que sostienen todo lo anterior — sin dejar fuera la infraestructura física real: el homelab, el cableado y las VLANs que conectan cada máquina.

## Arquitectura

### [ops-architecture](ops-architecture/)

El roadmap de ops (Docker+deploy → CI/CD → Kubernetes → Microservicios → Arquitecturas → Observabilidad) y los patrones de arquitectura de sistemas — Monolito, SOA, Microservicios, Event-Driven, Serverless, Layered/MVC — con cuándo conviene usar cada uno.

## Contenedores y Orquestación

### [ops-containers](ops-containers/)

Docker y Docker Compose: imágenes de contenedor, registries, redes de contenedores, y cómo se agrupan varios servicios en un solo archivo compose.

### [ops-kubernetes](ops-kubernetes/)

Conceptos base de Kubernetes: pods, services, ingress, secrets, RBAC.

## CI/CD

### [ops-cicd](ops-cicd/)

Pipelines de integración y despliegue continuo: Git, GitHub Actions, GitLab CI/CD, Jenkins, y automatización de build/tests/scans/deploy.

## Infraestructura como Código

### [ops-iac](ops-iac/)

Infraestructura como código y configuración declarativa: Terraform para aprovisionar (HCL, `terraform apply`), Ansible para configurar servidores de forma idempotente por SSH sin agentes, y el flujo GitOps completo — Terraform → Ansible → Docker Compose → Git.

## Servicios y Red

### [ops-networking](ops-networking/)

Servicios de red que sostienen la infraestructura: Nginx como proxy, firewall, load balancer, caching server, servidores web.

### [ops-observability](ops-observability/)

Monitoreo de sistemas: Prometheus.

### [ops-cloud](ops-cloud/)

Almacenamiento y servicios tipo cloud: MinIO como object storage, Supabase como BaaS, LocalStack como emulador de AWS, más IAM y la certificación AWS Security Specialty.

## Homelab

### [ops-homelab](ops-homelab/)

Tu infraestructura real: mapeo del switch (puertos, VLANs, dispositivos), subredes por VLAN, y el NAS con su Arr stack (Sonarr, Radarr, Prowlarr, Bazarr, qBittorrent, Plex), Proxmox, ArchLinux y UPS.
