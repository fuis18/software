---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops NetSecurity
subtitle: La defensa del perímetro y del host
---

La red es la superficie de ataque por excelencia: por ella entran los ataques y por ella salen los datos. Acá se ve cómo se defiende el borde, cómo se protege el host y cómo se controla quién accede a qué.

## Firewalls Dedicados

El firewall es el control de flujo de la red: qué comunicaciones se permiten y cuáles se bloquean.

| Plataforma      | Perfil                                  | Destaca en                                   |
| --------------- | --------------------------------------- | -------------------------------------------- |
| **Palo Alto**   | Enterprise, NGFW                        | NGFW, visibilidad por app, integración       |
| **Fortinet**    | Enterprise/convergente                  | Hardware + software unificado, costo          |
| **Check Point** | Enterprise clásico                      | Madurez, control centralizado                |
| **pfSense/opnsense** | Código abierto, self-hosted       | Homelab, pymes, control total                |

### Definiciones

- **Firewall perimetral** — el punto entre la red interna y el mundo: política central de entrada/salida.
- **Stateful inspection** — el firewall recuerda el estado de cada conexión y solo deja pasar respuestas a conexiones establecidas.
- **Deep packet inspection (DPI)** — inspecciona la aplicación y no solo los puertos: permite/bloquea por contexto, no por puerto.

## Protección Perimetral

| Capa         | Qué es                                                      |
| ------------ | ----------------------------------------------------------- |
| **WAF**      | Filtra el tráfico web hacia tus apps: inyecciones, XSS, bots de explotación |
| **DDoS**     | Absorbe y mitiga volúmenes de tráfico malicioso que buscan tumbar tus servicios |
| **ZTNA**     | Acceso a la red por sesión e identidad, no por confianza de ubicación |

- **WAF** se ubica frente a las aplicaciones web; complementa (no reemplaza) la seguridad de la app. Ver [sec](sec/) para el lado ofensivo.
- **DDoS** suele mitigarse en la nube/borde por su escala, no con un firewall propio. Ver [ops-traffic](ops-traffic/).
- **ZTNA** es el modelo "no confiar en nadie": cada acceso se verifica por identidad y política, sin importar desde dónde se viene. Ver [ops-sdn](ops-sdn/).

## Host & OS Security

La última capa de red es la del propio sistema operativo.

| Mecanismo        | Qué es                                                  |
| ---------------- | ------------------------------------------------------- |
| **iptables / nftables** | Reglas de firewall del kernel Linux en cada host |
| **eBPF**         | Programas de observación y filtrado dentro del kernel   |
| **Security Groups** | Firewall elástico por recurso en la nube          |

- **Reglas locales** — cada host permite/bloquea tráfico aunque el firewall perimetral ya haya filtrado.
- **eBPF** es el salto evolutivo: en vez de reescribir el kernel, se inyectan programas verificables que observan y filtran syscalls y paquetes en el momento.

## Control de Accesos (IAM)

La política de "quién puede hacer qué" sobre la infraestructura.

- **Identidades** — usuarios, grupos y cuentas de servicio.
- **Políticas** — permisos mínimos y explícitos; nada por defecto.
- **Rotación y auditoría** — credenciales que vencen y actividad registrada.
- **Multi-factor** — más de un factor para entrar a lo crítico.

> IAM atraviesa firewall, nube y clústeres: sin gestión de accesos, la mejor defensa perimetral termina siendo inútil — el acceso se gestiona una vez y se aplica a todo. Ver [ops-cloud](ops-cloud/) y [ops-kubernetes](ops-kubernetes/) (RBAC).