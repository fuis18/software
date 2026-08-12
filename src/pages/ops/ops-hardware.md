---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Hardware
subtitle: El cómputo real detrás de todo
---

La máquina física que ejecuta el software: qué es un servidor bare-metal, qué sistema operativo corre, cómo administrarlo sin depender del SO instalado y cómo se da de alta cuando llega nuevo.

## Servidores Bare Metal

Un servidor **bare metal** es una máquina física dedicada, sin capa de virtualización entre el hardware y el sistema operativo. Frente a las VMs, todo el hardware es tuyo: sin "vecinos ruidosos" que compitan por CPU o I/O.

| Aspecto      | Bare metal                                       | VM                | Contenedor           |
| ------------ | ------------------------------------------------ | ----------------- | -------------------- |
| **Aislamiento** | Por hardware                                 | Por hypervisor    | Por kernel compartido |
| **Performance** | Máxima, sin overhead                          | Pequeño overhead  | Casi nativo           |
| **Aprovisionamiento** | Lento (físico)                              | Rápido            | Instantáneo           |
| **Uso típico** | Bases de datos grandes, cargas de alta persistencia | Consolidación de cargas | Escalado horizontal |

**Cómo elegir:** bare metal cuando se necesita toda la performance o latencia mínima sin competencia; VMs cuando se quiere consolidar varios sistemas en una sola máquina; contenedores cuando lo que importa es portabilidad y velocidad de escalado.

## Sistemas Operativos de Servidor

La familia predominante en servidores es **GNU/Linux** en sus variantes enterprise.

- **Distribuciones enterprise** — estables, con soporte a largo plazo y paquetes conservadores: ideales para producción donde no se quiere sorpresas.
- **Diferencias entre distros** — el gestor de paquetes, el sistema de init y las políticas de seguridad (SELinux/AppArmor) cambian, pero el modelo de administración es el mismo: systemd, users, grupos, `ssh`.

> La elección del sistema operativo es una decisión de soporte y predilección, no de arquitectura: lo que se aprende sobre administración es portable entre ellas.

## Out-of-Band (OOB) & IPMI

Administrar una máquina que no puede arrancar el sistema operativo — por eso cada servidor tiene un **BMC** (Baseboard Management Controller): un mini-sistema independiente con su propia IP de gestión.

- **IPMI** — el protocolo estándar para hablar con el BMC: encender, apagar, reiniciar, ver estado de hardware.
- **Consola remota** — ver la salida de la BIOS y arrancar la máquina como si estuvieras con un monitor enchufado.
- **Red de gestión (OOB)** — red separada solo para administración, aislada del tráfico de datos.

> El acceso out-of-band es la última línea de control: si la máquina no responde ni por red, por IPMI se la puede apagar y volver a encender.

## Aprovisionamiento Físico

El proceso de dar de alta una máquina nueva sin instalarlo a mano una por una.

- **Instalación por red** — arrancar desde la red en vez de un disco físico, con respuestas predefinidas, para instalar el SO de forma reproducible.
- **Pós-implantación** — una vez instalado el SO, la automatización de configuración (ver [ops-iac](ops-iac/)) toma el control: usuarios, paquetes, hardening y servicios.
- **Inventario y etiquetado** — cada máquina con nombre, IP de gestión y rol documentados antes de entrar en producción. Ver [ops-datacenter](ops-datacenter/).