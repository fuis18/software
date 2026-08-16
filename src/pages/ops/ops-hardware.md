---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Hardware
subtitle: El cómputo real detrás de todo
---

La máquina física que ejecuta el software: qué es un servidor bare-metal, qué sistema operativo corre, cómo administrarlo sin depender del SO instalado y cómo se da de alta cuando llega nuevo.

## Servidores Bare Metal

Un servidor **bare metal** es una máquina física dedicada, sin capa de virtualización entre el hardware y el sistema operativo. Frente a las VMs, todo el hardware es tuyo: sin "vecinos ruidosos" que compitan por CPU o I/O.

### Diferencias

| Aspecto         | Bare metal             | VM                  | Contenedor            |
| --------------- | ---------------------- | ------------------- | --------------------- |
| **Aislamiento** | Por hardware           | Por hypervisor      | Por kernel compartido |
| **Performance** | Máxima, sin overhead   | Pequeño overhead    | Casi nativo           |
| **Configurar**  | Lento (físico)         | Rápido              | Instantáneo           |
| **Uso típico**  | Bases de datos grandes | Sistemas Operativos | Microservicios        |

**Cómo elegir:** bare metal cuando se necesita toda la performance o latencia mínima sin competencia; VMs cuando se quiere consolidar varios sistemas en una sola máquina; contenedores cuando lo que importa es portabilidad y velocidad de escalado.

## Sistemas Operativos de Servidor

- Red Hat Enterprise Linux (RHEL): El estándar comercial de pago. Ofrece soporte técnico directo, certificaciones estrictas y la máxima estabilidad corporativa.

- Rocky Linux: Busca ser un clon "1:1" idéntico a RHEL. Sigue al pie de la letra el código original para garantizar que lo que corre en RHEL funcione exactamente igual en Rocky, sin desviarse un solo milímetro.

- AlmaLinux: Es más permisiva y pragmática. Aunque mantiene compatibilidad binaria con RHEL, se permite incluir parches más rápidos, soporte extendido para hardware antiguo o funciones comunitarias sin esperar la aprobación estricta de Red Hat.

## Out-of-Band (OOB) & IPMI

Administrar una máquina que no puede arrancar el sistema operativo — por eso cada servidor tiene un **BMC** (Baseboard Management Controller): un mini-sistema independiente con su propia IP de gestión.

- **IPMI** — el protocolo estándar para hablar con el BMC: encender, apagar, reiniciar, ver estado de hardware.
- **Consola remota** — ver la salida de la BIOS y arrancar la máquina como si estuvieras con un monitor enchufado.
- **Red de gestión (OOB)** — red separada solo para administración, aislada del tráfico de datos.

> El acceso out-of-band es la última línea de control: si la máquina no responde ni por red, por IPMI se la puede apagar y volver a encender.

## Aprovisionamiento Físico

El proceso de dar de alta una máquina nueva sin instalarlo a mano una por una.

- **Instalación por red** — arrancar desde la red en vez de un disco físico, con respuestas predefinidas, para instalar el SO de forma reproducible.
- **Pós-implantación** — una vez instalado el SO, la automatización de configuración (ver [ops-iac](../ops-iac/)) toma el control: usuarios, paquetes, hardening y servicios.
- **Inventario y etiquetado** — cada máquina con nombre, IP de gestión y rol documentados antes de entrar en producción. Ver [ops-datacenter](../ops-datacenter/).
