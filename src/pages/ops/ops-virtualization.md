---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Virtualization
subtitle: Máquinas virtuales y hypervisors
---

La virtualización permite correr muchos sistemas operativos sobre una misma máquina física, aislando cada uno del resto. Es la tecnología que hizo rentable el hardware moderno y el punto medio entre metal desnudo y contenedores.

## Hypervisors

El **hypervisor** (o VMM) es el software que crea, aísla y administra las máquinas virtuales sobre el hardware.

| Tipo      | Dónde corre               | Uso típico                                      |
| --------- | ------------------------- | ----------------------------------------------- |
| **Tipo 1**| Directo sobre el hardware (`bare-metal`) | Datacenters, producción, performance máxima |
| **Tipo 2**| Sobre un sistema operativo anfitrión       | Laboratorios, dev en laptop                     |

Los hypervisors tipo 1 son el estándar del datacenter: al no depender de un SO intermedio, desperdician menos recursos y son más seguros.

| Plataforma        | Perfil                                      | Destaca en                                     |
| ----------------- | ------------------------------------------- | ---------------------------------------------- |
| **KVM**           | Virtualización de código abierto en Linux   | Estándar de facto, base de muchas nubes        |
| **vSphere / ESXi**| Hypervisor enterprise de VMware             | Empresas, features maduras de clustering       |
| **Proxmox VE**    | Plataforma todo-en-uno sobre KVM            | Homelab y pymes, panel web simple              |
| **Hyper-V**       | De Microsoft                                | Entornos Windows nativos                       |
| **Nutanix AHV**   | Incluido en plataformas hiperconvergentes   | Consolidación HCI                              |
| **OpenStack**     | Plataforma de nube privada                  | Proveedores que quieren su propia nube interna |

## VM vs. Bare Metal vs. Contenedores

| Criterio        | Bare metal              | VM                    | Contenedor             |
| --------------- | ----------------------- | --------------------- | ---------------------- |
| **Aislamiento** | Físico total            | Por hypervisor        | Por kernel compartido  |
| **Overhead**    | Ninguno                 | Un SO por VM          | Mínimo                 |
| **Arranque**    | Minutos                 | Segundos a minutos    | Milisegundos           |
| **Densidad**    | Una carga por servidor  | Decenas por servidor  | Cientos por servidor   |
| **Modelo**      | Dedicación total        | Consolidación         | Escalado y portabilidad|

**Cómo elegir:**
- **Bare metal** — cuando la carga necesita toda la máquina (alta performance, latencia mínima).
- **VM** — cuando se quiere consolidar o correr SO distintos sobre el mismo hardware; el hipervisor es el límite.
- **Contenedores** — cuando lo que importa es portabilidad y escalado horizontal; van encima de VMs o bare metal. Ver [ops-containers](ops-containers/).

> La virtualización y los contenedores no compiten: la práctica habitual es tener el hypervisor como capa base y correr contenedores dentro de las VMs.