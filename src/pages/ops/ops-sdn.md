---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops SDN
subtitle: Redes definidas por software y capas overlay
---

Encima de la red física se construye otra red lógica: túneles cifrados entre máquinas, redes virtuales entre nubes y mallas de servicios. Son las capas overlay que crean conectividad donde físicamente no existe.

## Underlay vs. Overlay

- **Underlay** — la red física de cables, switches y routers (ver [ops-physical-network](../ops-physical-network/)).
- **Overlay** — la red virtual construida encima, que usa la física como transporte: túneles que unen puntos que no están conectados.

El **túnel** es la unidad base del overlay: un paquete de red va encapsulado dentro de otro paquete que sí puede viajar por la física, llegando cifrado de extremo a extremo.

- **Por qué existe esta separación:** el underlay no sabe ni le importa qué corre encima — solo mueve paquetes entre puntos físicamente conectados. El overlay es el que le da forma lógica a la red: decide qué máquinas "se ven" entre sí, aunque estén en redes físicas, nubes o países distintos.
- **Consecuencia directa:** todo lo que sigue en este documento (VPNs, redes virtuales de nube, service mesh) es una variación del mismo patrón — overlay sobre underlay — aplicado a distintos niveles: entre personas y máquinas, entre nubes, y entre servicios dentro de un clúster.

## VPNs y Mallas Personales

Túneles pensados para conectar máquinas y personas entre sí, típicamente fuera del contexto de una nube o clúster específico.

- **Por qué existe:** conectar dos máquinas que están en redes distintas (una laptop en un café, un servidor en casa, un NAS en otra ciudad) sin exponerlas directamente a internet ni depender de que alguien abra puertos en un router.

### WireGuard

**Perfil:** protocolo de túnel moderno — código minimalista (a diferencia de OpenVPN o IPsec, que son mucho más grandes y complejos), pensado para vivir dentro del kernel.

- **Fortalezas:** rápido (overhead bajo comparado con soluciones más viejas), fácil de auditar por lo chico de su codebase, configuración simple (un par de claves públicas/privadas y listo).
- **Casos de uso:** VPNs tradicionales punto a punto, conexiones site-to-site (unir la red de una oficina con la de un datacenter), base de construcción para herramientas de más alto nivel.
- **Debilidades:** por sí solo es solo el túnel — no resuelve descubrimiento de pares, NAT traversal automático, ni gestión de identidades; eso hay que armarlo aparte o usar algo construido encima (como Tailscale).
- **Performance:** de los más rápidos disponibles — al vivir en el kernel evita el overhead de moverse a espacio de usuario por cada paquete.

### Tailscale

**Perfil:** malla personal (_mesh VPN_) construida sobre WireGuard, que automatiza todo lo que WireGuard deja manual.

- **Fortalezas:** cada máquina (laptop, NAS, servidor) se suma a la red privada con un solo comando, sin abrir puertos ni configurar routers — resuelve NAT traversal automáticamente usando servidores de coordinación de terceros.
- **Casos de uso:** acceder a la red de casa u oficina desde cualquier lugar, conectar dispositivos personales entre sí de forma privada, entornos donde no se quiere/puede tocar la configuración del router.
- **Debilidades:** depende de la infraestructura de coordinación de Tailscale (aunque el tráfico de datos en sí viaja peer-to-peer cuando es posible); es una capa de conveniencia, no un reemplazo de VPNs corporativas con políticas más granulares.
- **Relación con WireGuard:** Tailscale no reinventa el túnel — usa WireGuard por debajo para el cifrado y el transporte, y agrega la capa de coordinación, identidad y NAT traversal encima.

### ZTNA (Zero Trust Network Access)

**Qué es:** el modelo de acceso por identidad, no por ubicación — estar dentro de la red ya no garantiza acceso; cada conexión se verifica por sesión y política, sin importar si viene de la LAN de la oficina o de internet.

- **Por qué existe:** el modelo tradicional (perímetro + VPN = confianza total adentro) falla cuando alguien compromete una sola máquina dentro de la red y se mueve lateralmente sin más fricción. ZTNA elimina esa confianza implícita: cada request se evalúa como si viniera de afuera.
- **Se apoya en la misma infraestructura de túneles y malla** descrita arriba: la persona autorizada llega al recurso específico sin que se le exponga el resto de la red. La definición completa vive en [ops-netsecurity](../ops-netsecurity/).

| Plataforma    | Perfil                            | Uso típico                                                  |
| ------------- | --------------------------------- | ----------------------------------------------------------- |
| **WireGuard** | Túnel moderno, simple y eficiente | VPNs tradicionales, site-to-site                            |
| **Tailscale** | Malla personal sobre WireGuard    | Acceso a tu red desde cualquier lado sin configurar routers |

## Red Virtual en la Nube

El mismo patrón de overlay, aplicado adentro de un proveedor de nube: aislar y controlar qué recursos se hablan entre sí.

- **Por qué existe:** en la nube, los recursos no tienen una red física propia que se pueda cablear a mano — la VPC es la forma en que el proveedor le da a cada cliente una red lógicamente aislada, aunque el hardware subyacente sea compartido con otros clientes.

### VPC / Red virtual

**Qué es:** el espacio de red aislado y controlable donde viven los recursos de la nube (VMs, bases de datos, balanceadores) — define rangos de IP privados, subredes y reglas de tráfico propias.

- **Fortaleza central:** todo lo que corre adentro de una VPC está aislado por defecto de otras VPCs y de internet, salvo que explícitamente se abra una salida (gateway) o una conexión (peering).
- **Consecuencia directa:** es la base sobre la que se aplica el resto del modelo de seguridad de nube — sin una VPC bien segmentada, IAM y firewalls terminan compensando un diseño de red débil. Ver [ops-cloud](../ops-cloud/) e [ops-netsecurity](../ops-netsecurity/).

### VPC Peering

**Qué es:** unir dos redes virtuales para que se hablen de forma privada, como si fueran una sola red, sin pasar por internet.

- **Fortaleza:** tráfico privado entre VPCs (propias o de otra cuenta/organización), generalmente sin los costos de transferencia que tendría el tráfico público, y con menor latencia.
- **Debilidad:** el peering no es transitivo — si A está pareada con B, y B con C, A no puede hablar con C automáticamente; cada relación hay que crearla explícitamente. En arquitecturas con muchas VPCs esto puede volverse una malla difícil de mantener (ahí es donde entran soluciones tipo _transit gateway_).

### Gateway

**Qué es:** el punto de salida/entrada de la red virtual hacia el resto — internet, otra VPC, o una red on-premise.

- **Distintos tipos según la dirección del tráfico:** un _internet gateway_ permite salida/entrada pública, un _NAT gateway_ permite salida sin exponer IPs privadas, un _VPN/transit gateway_ conecta con redes fuera de la nube. Cada uno resuelve un caso distinto de "qué puede entrar o salir y por dónde".

| Pieza                 | Qué es                                                        |
| --------------------- | ------------------------------------------------------------- |
| **VPC / red virtual** | Red aislada y controlable donde viven los recursos de la nube |
| **VPC Peering**       | Unir dos redes virtuales para que se hablen de forma privada  |
| **Gateway**           | Punto de salida/entrada de la red virtual al resto            |

## Service Mesh

El mismo patrón de overlay, aplicado un nivel más adentro: no entre redes ni entre máquinas, sino entre los servicios de una misma aplicación distribuida.

- **Por qué existe:** cuando una app pasa de ser un monolito a decenas de microservicios, la comunicación entre ellos (que antes era una simple llamada de función) se vuelve tráfico de red — con todos los problemas que eso trae: latencia, fallos parciales, necesidad de cifrado, y falta de visibilidad de quién le habla a quién. El mesh centraliza la solución a esos problemas en una capa de infraestructura, en vez de que cada servicio la resuelva por su cuenta.
- **Qué resuelve en concreto:** retries y timeouts automáticos ante fallos transitorios, cifrado mutuo (mTLS) entre servicios sin que cada uno lo implemente, observabilidad de tráfico (quién llama a quién, con qué latencia, con qué tasa de error) y políticas de acceso (qué servicio puede hablarle a cuál).
- **El costo:** el mesh agrega infraestructura propia — un proxy extra por servicio, otro plano de control que operar. Tiene sentido en sistemas grandes donde el control centralizado del tráfico compensa ese costo; en sistemas chicos, suele ser complejidad de más. Ver [ops-kubernetes](../ops-kubernetes/).

### Cilium

**Perfil:** networking de clúster basado en eBPF — programa el kernel de Linux directamente para manejar el tráfico, en vez de depender de proxies en espacio de usuario.

- **Fortalezas:** overhead mucho más bajo que las soluciones basadas en sidecar/proxy, porque el filtrado y ruteo pasa a nivel kernel; da observabilidad de red muy detallada (quién habla con quién a nivel de paquete) casi gratis, gracias a eBPF.
- **Casos de uso:** CNI (plugin de red) de Kubernetes con foco en performance y seguridad de red a bajo nivel; clústeres donde el overhead de un sidecar por pod no es aceptable.
- **Debilidades:** eBPF y el kernel de Linux son la base — no aplica igual fuera de Linux; la curva de aprendizaje de eBPF es real si se necesita ir más allá de la configuración estándar.
- **Performance:** el mejor perfil de los dos — al operar a nivel kernel evita el salto extra a espacio de usuario que sí tiene un proxy tipo Istio/Envoy.

### Istio

**Perfil:** _application mesh_ clásico — un proxy (Envoy) por cada pod/servicio (patrón sidecar), con un plano de control centralizado que configura a todos esos proxies.

- **Fortalezas:** control muy granular a nivel de aplicación (routing por versión, canary releases, circuit breaking, políticas de retry por endpoint), ecosistema maduro y muy usado en producción.
- **Casos de uso:** sistemas grandes con muchos microservicios donde se necesita control fino del tráfico HTTP/gRPC entre ellos — despliegues canary, A/B testing a nivel de infraestructura, mTLS obligatorio entre todos los servicios.
- **Debilidades:** el patrón sidecar significa un proxy extra corriendo junto a cada pod — más consumo de memoria/CPU por servicio, y más latencia por el salto extra a espacio de usuario en cada request.
- **Performance:** más pesado que Cilium por diseño (proxy en espacio de usuario vs. kernel), pero a cambio da control a nivel de aplicación (HTTP/gRPC) que eBPF por sí solo no puede ver.

> Cilium e Istio no siempre compiten — muchos clústeres usan Cilium como CNI base (networking y seguridad L3/L4) e Istio (u otro mesh) encima para necesidades de capa de aplicación (L7). Cilium incluso ofrece su propio modo _sidecar-less_ de mesh, usando eBPF para cubrir parte de lo que tradicionalmente hacía un sidecar.

| Pieza            | Qué es                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------- |
| **Service Mesh** | Capa que gestiona la comunicación service-to-service (retries, TLS, observabilidad, policy) |
| **Cilium**       | Networking del clúster con eBPF: seguridad y observabilidad a nivel de red/kernel           |
| **Istio**        | Application mesh: proxy por app con control centralizado                                    |
