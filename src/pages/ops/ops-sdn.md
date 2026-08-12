---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops SDN
subtitle: Redes definidas por software y capas overlay
---

Encima de la red física se construye otra red lógica: túneles cifrados entre máquinas, redes virtuales entre nubes y mallas de servicios. Son las capas overlay que crean conectividad donde físicamente no existe.

## Underlay vs. Overlay

- **Underlay** — la red física de cables, switches y routers (ver [ops-physical-network](ops-physical-network/)).
- **Overlay** — la red virtual construida encima, que usa la física como transporte: túneles que unen puntos que no están conectados.

El **túnel** es la unidad base del overlay: un paquete de red va encapsulado dentro de otro paquete que sí puede viajar por la física, llegando cifrado de extremo a extremo.

## VPNs y Mallas Personales

| Plataforma  | Perfil                                     | Uso típico                             |
| ----------- | ------------------------------------------ | -------------------------------------- |
| **WireGuard** | Túnel moderno, simple y eficiente        | VPNs tradicionales, site-to-site       |
| **Tailscale** | Malla personal sobre WireGuard          | Acceso a tu red desde cualquier lado sin configurar routers |

- **WireGuard** es el protocolo de túnel rápido y minimalista, base de muchas soluciones actuales.
- **Tailscale** automatiza la malla: cada máquina (laptop, NAS, server) se agrega a tu red privada sobre la infraestructura de terceros, sin abrir puertos.

## Red Virtual en la Nube

| Pieza         | Qué es                                        |
| ------------- | --------------------------------------------- |
| **VPC / red virtual** | Red aislada y controlable donde viven los recursos de la nube |
| **VPC Peering** | Unir dos redes virtuales para que se hablen de forma privada |
| **Gateway**   | Punto de salida/entrada de la red virtual al resto |

- La seguridad vía red virtual más IAM es el corazón del modelo de nube. Ver [ops-cloud](ops-cloud/) e [ops-netsecurity](ops-netsecurity/).
- El peering conecta redes sin pasar por internet, manteniendo trafico privado y sin costos de transferencia pública.

## Service Mesh

La capa de red dentro de un clúster/microservicios: cuando hay muchos servicios que se hablan, el tráfico entre ellos se gestiona de forma centralizada.

| Pieza       | Qué es                                                    |
| ----------- | --------------------------------------------------------- |
| **Service Mesh** | Capa que gestiona la comunicación service-to-service (retries, TLS, observabilidad, policy) |
| **Cilium**  | Networking del clúster con eBPF: seguridad y observabilidad a nivel de red/kernel |
| **Istio**   | Application mesh: proxy por app con control centralizado   |

- El mesh resuelve problemas de red que aparecen con muchos servicios: retries, timeouts, cifrado mutuo (mTLS), observabilidad de tráfico y políticas de acceso.
- Frente a la complejidad: el mesh agrega infraestructura propia; es para sistemas grandes donde el control centralizado del tráfico compensa su costo. Ver [ops-kubernetes](ops-kubernetes/).