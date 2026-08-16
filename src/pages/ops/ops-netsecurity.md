---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops NetSecurity
subtitle: La defensa del perímetro y del host
---

La red es la superficie de ataque por excelencia: por ella entran los ataques y por ella salen los datos. Acá se ve cómo se defiende el edge, cómo se protege el host y cómo se controla quién accede a qué.

## Firewalls Dedicados

El firewall es el control de flujo de la red: qué comunicaciones se permiten y cuáles se bloquean.

| Plataforma           | Perfil                      | Destaca en                             |
| -------------------- | --------------------------- | -------------------------------------- |
| **Palo Alto**        | Enterprise, NGFW            | NGFW, visibilidad por app, integración |
| **Fortinet**         | Enterprise/convergente      | Hardware + software unificado, costo   |
| **Check Point**      | Enterprise clásico          | Madurez, control centralizado          |
| **pfSense/opnsense** | Código abierto, self-hosted | Homelab, pymes, control total          |

### Definiciones

- **Firewall perimetral** — el punto entre la red interna y el mundo: política central de entrada/salida.
- **Stateful inspection** — el firewall recuerda el estado de cada conexión y solo deja pasar respuestas a conexiones establecidas.
- **Deep packet inspection (DPI)** — inspecciona la aplicación y no solo los puertos: permite/bloquea por contexto, no por puerto.

## Protección Perimetral

Antes de que el tráfico toque un servicio, hay capas que deciden qué entra y qué no. Tres conceptos cubren el perímetro: el que filtra el tráfico hacia las apps, el que absorbe los ataques de volumen y el que redefine cómo se accede a la red.

### WAF (Web Application Firewall)

**Qué es:** un firewall que opera sobre el tráfico web hacia tus aplicaciones: en vez de decidir por IP y puerto, entiende la petición y bloquea la que parece un ataque — inyecciones, XSS, bots de explotación.

- **Dónde se ubica:** frente a las apps web, en el edge de entrada — una pieza más del edge de entrega. Ver [ops-traffic](../ops-traffic/).
- **Qué complementa (y qué no):** filtra lo que llega por la red, pero no reemplaza la seguridad de la propia aplicación: si la app tiene una vulnerabilidad, el WAF es un escudo, no una cura. El lado ofensivo — los ataques que el WAF intenta frenar — se estudia en [sec](../../sec/).

### Mitigación DDoS

**Qué es:** un ataque de denegación de servicio distribuido busca tumbar la disponibilidad del servicio inundándolo de tráfico — no roba datos, rompe el "está online".

- **Por qué se mitiga en el edge:** el arma es el volumen; para absorberlo hace falta capacidad a escala (CDN/edge, nube), no un firewall propio que se saturaría igual. Ver [ops-traffic](../ops-traffic/).
- **Absorber vs. filtrar:** aguantar el golpe sin caerse, y distinguir el tráfico legítimo del malicioso para dejar pasar solo el bueno.

### ZTNA (Zero Trust Network Access)

**Qué es:** el modelo de acceso que no confía en la ubicación: estar "dentro de la red" ya no da acceso por defecto — cada acceso se verifica por identidad, sesión y política, sin importar desde dónde se viene.

- **Por qué existe:** la red interna ya no es un límite de confianza; el acceso se autoriza por sesión, no por geografía.
- **Cómo se materializa:** se apoya en túneles y capas overlay que conectan a la persona autorizada con el recurso, sin exponer la red. Ver [ops-sdn](../ops-sdn/).

## Host & OS Security

La última capa de red es la del propio sistema operativo.

| Mecanismo               | Qué es                                                |
| ----------------------- | ----------------------------------------------------- |
| **iptables / nftables** | Reglas de firewall del kernel Linux en cada host      |
| **eBPF**                | Programas de observación y filtrado dentro del kernel |
| **Security Groups**     | Firewall elástico por recurso en la nube              |

- **Reglas locales** — cada host permite/bloquea tráfico aunque el firewall perimetral ya haya filtrado.
- **eBPF** es el salto evolutivo: en vez de reescribir el kernel, se inyectan programas verificables que observan y filtran syscalls y paquetes en el momento.

## Control de Accesos (IAM)

La política de "quién puede hacer qué" sobre la infraestructura.

- **Identidades** — usuarios, grupos y cuentas de servicio.
- **Políticas** — permisos mínimos y explícitos; nada por defecto.
- **Rotación y auditoría** — credenciales que vencen y actividad registrada.
- **Multi-factor** — más de un factor para entrar a lo crítico.

> IAM atraviesa firewall, nube y clústeres: sin gestión de accesos, la mejor defensa perimetral termina siendo inútil — el acceso se gestiona una vez y se aplica a todo. Ver [ops-cloud](../ops-cloud/) y [ops-kubernetes](../ops-kubernetes/) (RBAC).
