---
layout: ../../layouts/Layout.astro
eyebrow: Sec
title: Sec Network
subtitle: Fundamentos de networking y su automatización
---

La red es el sustrato de todo ataque y de toda defensa: sin entender cómo viajan los datos no se entiende ni qué se protege ni cómo se rompe. Acá está el fundamento y su automatización.

## Fundamentos

| Concepto    | Qué es                                                        |
| ----------- | ------------------------------------------------------------- |
| **TCP/IP**  | El modelo de protocolos que hace posible internet             |
| **Switching** | Conectar dispositivos dentro de la misma red (capa 2)       |
| **Routing** | Conectar redes entre sí (capa 3)                              |
| **Firewall**| Control de qué comunicaciones se permiten y cuáles se bloquean |
| **VPN**     | Túnel cifrado entre redes o máquinas separadas                |
| **DNS**     | Traduce nombres legibles a direcciones IP                     |
| **HTTP**    | El protocolo de la web: peticiones y respuestas               |
| **SSL/TLS** | Cifrado en tránsito: lo que hace seguro el HTTP               |
| **SSH**     | Acceso remoto cifrado a un servidor                           |
| **FTP/SFTP**| Transferencia de archivos, con SFTP como la variante cifrada  |

- La anatomía física (switches, routers, cableado, VLANs) y los protocolos de la capa física se ven en [ops-physical-network](../../ops/ops-physical-network/); la defensa del perímetro y del host en [ops-netsecurity](../../ops/ops-netsecurity/); DNS, certificados y el edge en [ops-traffic](../../ops/ops-traffic/). Esta página es el punto de vista de seguridad y automatización.

## Análisis con Wireshark

El analizador de paquetes de referencia: captura el tráfico real de una interfaz y permite inspeccionar cada paquete a nivel de protocolo.

- **Captura y filtros** — se captura lo que pasa por una interfaz y se filtra por protocolo, IP, puerto o contenido: `tcp.port == 443`, `http.request`, `dns.qry.name`.
- **Seguimiento de streams** — reconstruir una conversación completa (un login HTTP, una sesión DNS) para ver exactamente qué se envió.
- **Uso en seguridad** — verificar que el tráfico está cifrado, detectar tráfico inesperado, o entender qué hace una herramienta ofensiva en [sec-tools](../sec-tools/) antes de usarla.

## Automatización de red

Configurar equipos de red a mano no escala: la configuración se trata como código.

| Herramienta | Qué hace                                                   |
| ----------- | ---------------------------------------------------------- |
| **Netmiko** | Automatización SSH de equipos de red (Cisco, Juniper, etc.) |
| **NAPALM**  | Capa de abstracción que unifica vendors y plataformas      |

- **Netmiko** — conecta por SSH a los equipos y ejecuta comandos o configuración: el equivalente a Ansible para switches y routers, con soporte amplio de vendors.
- **NAPALM** — abstrae el vendor: el mismo código sirve para leer estado y aplicar config en equipos de fabricantes distintos, sin reescribir la lógica por cada uno.

## Camino CCNA y DevNet

Los caminos de certificación de Cisco, el fabricante de referencia en networking.

- **CCNA** — el estándar para entender networking de punta a punta: switching, routing, VLANs, ACLs, y las bases de seguridad de red. Cubre lo mismo que [ops-physical-network](../../ops/ops-physical-network/) pero con profundidad de certificación.
- **DevNet** — el camino de automatización: APIs de los equipos, programabilidad, model-driven configuration, y el **sandbox de DevNet**, un entorno de práctica donde se puede probar la automatización con equipos reales sin tener hardware.

## Plataformas Cisco

| Plataforma     | Qué es                                              |
| -------------- | --------------------------------------------------- |
| **Meraki**     | Networking gestionado en la nube (switches, APs, firewalls) |
| **DNA Center** | Centro de gestión y automatización de redes empresariales |

- **Meraki** — el networking como SaaS: los equipos se configuran desde un dashboard web central, ideal para organizaciones sin un equipo de red grande.
- **DNA Center** — la gestión de la red empresarial: inventario, automatización y análisis de la infraestructura Cisco de una organización.

> El networking es la intersección donde la seguridad y la infraestructura se encuentran: por eso esta página es la puerta entre [ops-physical-network](../../ops/ops-physical-network/) y el resto de la sección sec.