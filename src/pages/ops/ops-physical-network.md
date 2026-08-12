---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Physical Network
subtitle: Cómo viajan los datos en la capa física
---

La base de todo: antes de la nube, los contenedores o el código, los datos viajan por cables, switches y routers. Acá está cómo se mueve el tráfico a nivel físico, cómo se segmenta la red y qué infraestructura pasiva lo sostiene.

## Routing & Switching

La diferencia fundamental: los **switches** conectan dispositivos dentro de la misma red (capa 2, trabajan con direcciones MAC) y los **routers** conectan redes entre sí (capa 3, trabajan con direcciones IP).

| Pieza           | Capa | Qué hace                                                        | Cuándo se usa                                  |
| --------------- | ---- | --------------------------------------------------------------- | ---------------------------------------------- |
| **Switch**      | L2   | Reenvía tramas entre dispositivos de la misma subred            | Red interna, segmentación por VLANs            |
| **Router**      | L3   | Enruta paquetes entre redes distintas                           | Salida a internet, interconexión de subredes   |
| **L3 Switch**   | L2+L3| Switching de alta velocidad con capacidades de enrutamiento     | Core de red en datacenters y campus            |
| **Access Point**| L1/L2| Conecta dispositivos inalámbricos a la red cableada             | Wi-Fi en oficinas, homelab                     |

### Conceptos clave

- **Gateway** — el dispositivo por el que sale el tráfico hacia otras redes.
- **Subnet / máscara** — cómo se divide una red grande en segmentos más chicos.
- **VLAN** — segmentación lógica: divide la red en grupos (producción, IoT, invitados) sin necesidad de más hardware.
- **Trunk** — enlace que transporta varias VLANs entre switches.

## Protocolos de la capa física

| Protocolo        | Capa | Uso                                                        |
| ---------------- | ---- | ---------------------------------------------------------- |
| **Ethernet**     | L1/L2| Estándar de facto del cableado: tramas, direcciones MAC    |
| **Wi-Fi / WLAN** | L1/L2| Conexiones inalámbricas dentro de un área local            |
| **Fibra óptica** | L1   | Enlaces de larga distancia y alta velocidad (datacenter)    |
| **PoE**          | L1   | Alimentación eléctrica a través del mismo cable de datos    |

- **Ethernet** define cómo se formatean y envían los datos por el cable; cubre la parte física y la de enlace de datos.
- **Fibra** se usa cuando la distancia o la velocidad importan más que el costo del transceiver.
- **PoE** permite alimentar cámaras, access points y switcheros pequeños sin tomacorriente extra.

## Infraestructura pasiva

Todo lo que no procesa datos pero hace posible que viajen.

- **Cableado estructurado** — el tendido físico de parcheado, categoría y acometida que conecta racks, cuartos y plantas.
- **Patch panels** — el punto donde termina el cableado y se conecta cada puerto al switch.
- **Racks y organizadores** — el soporte físico donde se montan switches, routers y servidores, con gestión de cables.
- **VLANs y subredes por uso** — la primera capa de organización lógica: cada grupo de dispositivos (producción, gestión, invitados) en su propio segmento aislado. Ver [ops-hardware](ops-hardware/).

> La topología física importa para el mapeo de la red: qué puerto del switch llega a qué dispositivo y por qué VLAN pasa cada uno.