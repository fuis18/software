---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Server Architecture
subtitle: Qué es un servidor y qué capas implica
---

Un servidor es una máquina — física o virtual — dedicada a dar servicios a otras máquinas de la red. Corre sin escritorio, permanece encendido y se administra de forma remota, normalmente por red. Entender las capas que implica un servidor es el mapa de toda esta sección: cada capa tiene su propia página de profundidad.

## Qué Es un Servidor

Un servidor se diferencia de un equipo personal por su propósito, no por sus piezas: en lugar de servir a una persona ante una pantalla, sirve a otras máquinas — resuelve nombres, sirve páginas web, guarda datos o ejecuta cargas de trabajo. Como nadie se sienta frente a él, el servidor típico es:

- **Headless** — sin monitor ni escritorio; todo se configura por red.
- **Siempre encendido** — el uptime es el trabajo; estar caído significa que los servicios que ofrece están caídos.
- **Administrado remotamente** — vía SSH y con las herramientas de esta sección ([ops-iac](../ops-iac/)).
- **Especializado** — cada servidor o VM tiende a cumplir un rol concreto en vez de correr muchas aplicaciones a la vez.

## Sistemas Operativos de Servidor

La capa entre el hardware y todo lo demás. La familia clásica de distribuciones de servidor es la de RHEL — el estándar comercial — más sus rebuilds comunitarios:

| Distribución | Perfil |
|---|---|
| **RHEL** | Red Hat Enterprise Linux: el estándar comercial de pago, con soporte directo y certificaciones estrictas |
| **Rocky Linux** | Busca ser un clon 1:1 de RHEL: lo que corre en RHEL funciona exactamente igual en Rocky |
| **AlmaLinux** | Compatible binario con RHEL pero más pragmática: parches más rápidos, soporte extendido para hardware antiguo, funciones comunitarias |

Las distros Linux comunitarias (Debian, Ubuntu) son la alternativa libre a la familia RHEL. La comparación completa vive en [ops-hardware](../ops-hardware/).

## El Modelo de Capas

De la máquina física a los servicios entregados, un servidor se organiza en capas. Cada capa es uno de los temas de esta sección:

| Capa | Qué es | Dónde se trata |
|---|---|---|
| **Física** | El hardware real que ejecuta todo | [ops-hardware](../ops-hardware/), [ops-physical-network](../ops-physical-network/) |
| **Sistema Operativo** | El sistema operativo que corre en la máquina: RHEL, Rocky Linux, AlmaLinux o una distro comunitaria | [ops-hardware](../ops-hardware/) |
| **Virtualización** | KVM/QEMU aislando sistemas operativos sobre el mismo hardware | [ops-virtualization](../ops-virtualization/) |
| **Contenedores** | Unidades reproducibles que empaquetan cada app y sus dependencias | [ops-containers](../ops-containers/) |
| **Ingress y red** | Proxy reverso, balanceador de carga y WAF en el borde | [ops-traffic](../ops-traffic/) |
| **Aplicaciones** | Servicios de backend y frontend | [sección dev](../../dev/) |
| **Datos** | Bases de datos, caches y almacenamiento de objetos | [ops-dbadmin](../ops-dbadmin/), [ops-storage](../ops-storage/) |
| **Servicios de soporte** | DNS, autenticación, métricas, logs y colas de mensajes | [ops-observability](../ops-observability/), [dev-auth](../../dev/dev-auth/) |

El tráfico baja por el stack: entra por la capa de ingress, llega a la aplicación, la aplicación persiste y lee estado de la capa de datos, y los servicios de soporte los sostienen a todos.

## Virtualización: KVM/QEMU & Virt-Manager

La forma más común de correr un "servidor" hoy es un host Linux con máquinas virtuales encima. KVM y QEMU juntos forman el stack de hypervisor open-source estándar:

| Pieza | Rol |
|---|---|
| **KVM** | El módulo del kernel de Linux que convierte al propio kernel en hypervisor: las VMs corren como procesos normales con aceleración por hardware (Intel VT-x / AMD-V). La base de la mayoría de las nubes públicas. |
| **QEMU** | El emulador en userspace que le da a cada VM su hardware virtual (CPU, RAM, discos, red). Solo puede emular por completo (lento); combinado con KVM delega la ejecución al módulo acelerado. |
| **libvirt** | El daemon y API que gestiona el ciclo de vida de las VMs: dominios, arranque/parada, pools de almacenamiento y redes virtuales. Es con lo que hablan las herramientas de abajo. |
| **virt-manager** | La interfaz gráfica (GTK) para QEMU/KVM: crear VMs, asignar recursos y ver la consola desde un escritorio. |
| **virsh** | El equivalente CLI de virt-manager para scripting y administración remota. |

La capa de hypervisor y cómo elegir entre VMs, bare metal y contenedores se trata en [ops-virtualization](../ops-virtualization/).

## Jerarquía de Contenedores

Una vez que los contenedores son la unidad de despliegue, los servicios que corren dentro siguen una jerarquía consistente. El tráfico entra desde el borde, se enruta a las aplicaciones, las aplicaciones persisten estado en la capa de datos, y los servicios de soporte sostienen todo el sistema.

### Capa de Ingress y Red

Proxy reverso, balanceador de carga y WAF: recibe el tráfico por un dominio o ruta, termina el TLS, filtra ataques y reenvía al backend correcto.

| Herramienta | Perfil |
|---|---|
| **nginx** | Todo-en-uno clásico: proxy, caching, TLS, balanceo y servidor web |
| **traefik** | Nativo para contenedores: auto-descubrimiento de servicios, Let's Encrypt automático |
| **haproxy** | Especialista en balanceo: high availability, health checks |
| **caddy** | HTTPS automático por defecto, configuración simple, hecho en Go |

Cómo funciona esta capa — resolución, borde de entrega, proxies reversos y certificados — se trata en [ops-traffic](../ops-traffic/).

### Capa de Aplicaciones

Los productos reales: APIs de backend e interfaces de frontend, cada una en su propio contenedor. Es la razón de existir de la infraestructura — ver la [sección dev](../../dev/) para saber cómo se construyen las aplicaciones y [ops-containers](../ops-containers/) para cómo se empaquetan y conectan por red.

### Capa de Datos

Los servicios persistentes que guardan y sirven estado: bases de datos relacionales, caches, document stores y almacenamiento de objetos, cada uno en su propio contenedor.

La decisión de qué base de datos usar — SQL, documento, clave-valor, vector — pertenece a [back-databases](../../dev/back-databases/); el lado operativo (replicación, sharding, migraciones) a [ops-dbadmin](../ops-dbadmin/); y los fundamentos de almacenamiento (block, file, object — incluido el S3 self-hosted tipo MinIO) a [ops-storage](../ops-storage/).

### Capa de Servicios de Soporte

Todo lo que las demás capas necesitan para funcionar: resolución de nombres, identidad, métricas, almacenamiento de logs y colas de mensajes.

| Herramienta | Rol |
|---|---|
| **unbound** | Resolver DNS recursivo liviano |
| **keycloak** | Identity provider: SSO con OIDC/OAuth2 |
| **prometheus** | Recolección de métricas y alertas |
| **elasticsearch** | Búsqueda y análisis de logs |
| **rabbitmq** | Cola de mensajes / broker entre servicios |

Las tres señales de observabilidad se tratan en [ops-observability](../ops-observability/), la identidad en [dev-auth](../../dev/dev-auth/) y los patrones de mensajería en [back-technologies](../../dev/back-technologies/).

### Lado Escritorio — Distrobox

Las cuatro capas de servicios anteriores son el lado **servidor** de los contenedores. En la **workstation**, los contenedores cumplen otro rol: darle al desarrollador entornos reproducibles sin salir del host. **Distrobox** envuelve a Podman o Docker para crear un contenedor de cualquier distro Linux con integración total con el host — comparte el `$HOME` del usuario, el almacenamiento externo y los dispositivos USB, y puede exportar apps GUI al escritorio para que corran como si fueran nativas. Mismos backends de contenedores (podman/docker) que las capas de servidor, distinto propósito.

## Servicios de Infraestructura de Red

Más allá de los servicios en contenedores, algunos servidores dan capacidades a toda la red y no a una aplicación concreta: un directorio de identidad compartido, asignación dinámica de direcciones y resolución de nombres.

### Servicios de Directorio — OpenLDAP

Usuarios y grupos centralizados en un árbol de directorio sobre el protocolo **LDAP**: la fuente única de identidad a la que el resto de los servicios consultan para autenticar y autorizar. Keycloak (de la capa de soporte) suele colocarse encima del mismo directorio, sumándole SSO y protocolos modernos.

### DHCP — Kea

Dynamic Host Configuration Protocol: asigna direcciones IP, gateways y servidores DNS automáticamente a los dispositivos de la red. **Kea** es el servidor DHCP open-source moderno (sucesor de [ISC DHCP]) — alto rendimiento, configuración vía API y políticas por subred. Es el socio natural del diseño de direccionamiento y red de [ops-physical-network](../ops-physical-network/).

[ISC DHCP]: https://www.isc.org/dhcp/

### DNS

La resolución de nombres es la columna que conecta un nombre con un servicio. En un entorno self-hosted hay dos roles: el servidor **autoritativo**, que responde por tus propios dominios, y el **resolver recursivo**, que encuentra respuestas para todo lo demás.

| Herramienta | Perfil |
|---|---|
| **BIND9** | El servidor DNS de referencia: autoritativo y recursivo, probado durante décadas |
| **knot-resolver** | Resolver recursivo de alto rendimiento (CZ.NIC), pensado para escala |
| **NextDNS** | DNS gestionado con filtrado (SaaS, no self-hosted): políticas por dispositivo y bloqueo |

El DNS como parte del enrutamiento de tráfico se trata en [ops-traffic](../ops-traffic/). Para el bloqueo de anuncios a nivel de DNS en toda la red, Pi-hole vive en [ops-selfhosted](../ops-selfhosted/).

## Relacionados

- [ops-physical-network](../ops-physical-network/) — cómo se conectan las máquinas a nivel de cable.
- [ops-virtualization](../ops-virtualization/) — hypervisors y la decisión VM vs. bare metal vs. contenedor.
- [ops-containers](../ops-containers/) — imágenes, runtimes y networking de contenedores.
- [ops-traffic](../ops-traffic/) — cómo se enruta y acelera el tráfico hacia los servicios.
- [ops-storage](../ops-storage/) / [ops-dbadmin](../ops-dbadmin/) — persistir y operar datos.
- [ops-observability](../ops-observability/) — métricas, logs y trazas.
- [ops-selfhosted](../ops-selfhosted/) — el caso práctico del hogar para todo lo de esta sección.