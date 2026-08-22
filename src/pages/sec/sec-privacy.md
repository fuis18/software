---
layout: ../../layouts/Layout.astro
eyebrow: Sec
title: Sec Privacy
subtitle: Stack propio de privacidad y self-hosting
---

La forma más directa de proteger los propios datos es no entregarlos: servicios que se corren en infraestructura propia, sin depender de terceros que los acumulan. El self-hosting como postura de privacidad.

## El patrón

Cada pieza reemplaza un servicio en la nube por uno propio, corriendo en tu infraestructura — la misma base de [ops-selfhosted](../../ops/ops-selfhosted/), pero con la privacidad como objetivo.

| Servicio que se reemplaza | Alternativa self-hosted                 |
| ------------------------- | --------------------------------------- |
| Google Search             | **SearXNG** (buscador privado)          |
| WhatsApp / Discord        | **Matrix** (mensajería)                 |
| Google Contacts / Calendar | **CardDAV / CalDAV**                   |
| Gmail / Outlook           | **Correo propio** sobre OpenBSD         |
| Navegador con tracking    | **Mullvad Browser**                     |
| Acceso a los servicios    | **nginx** como proxy                    |

## Piezas del stack

### nginx como proxy

La puerta de entrada de todo el stack: nginx como proxy reverso recibe el tráfico, termina TLS y lo enruta a cada servicio interno — sin exponer puertos individuales al exterior. La mecánica completa está en [ops-traffic](../../ops/ops-traffic/).

### SearXNG

Un **buscador privado** self-hosted: agrega resultados de varios motores sin enviar tu historial ni tu IP a un solo proveedor, y sin cuentas ni perfilado.

### Matrix

**Mensajería** descentralizada: la comunicación va por servidores propios (o federados), con cifrado de extremo a extremo, sin que un intermediario central acumule los mensajes. El protocolo abierto de referencia frente a las apps de mensajería corporativas.

### CardDAV / CalDAV

Los estándares abiertos de **contactos y calendario**: el teléfono y las apps sincronizan contra tu propio servidor en vez de contra Google. Cualquier app que soporte estos protocolos se conecta directo.

### Correo sobre OpenBSD

**Correo propio** sobre un sistema operativo mínimo y seguro: **Postfix** (o **OpenSMTPD**) como MTA y la infraestructura de entrega sobre OpenBSD. Es la pieza más delicada del stack — el correo exige mantenimiento continuo de DNS (SPF, DKIM, DMARC) para que los mensajes no caigan en spam.

### Mullvad Browser

El **navegador** con privacidad por diseño: la versión hardened de Firefox que usa la red Tor como base, con fingerprinting reducido y sin cuenta — para navegar sin que el navegador mismo sea la fuente de tracking.

## El hilo conductor

- **nginx** une todas las piezas detrás de un solo punto de entrada con TLS.
- **El acceso desde afuera** — si se quiere llegar al stack fuera de casa, el patrón es el mismo de toda la casa: túneles y mallas personales, ver [ops-sdn](../../ops/ops-sdn/).
- **El respaldo** — los datos de correo, contactos y calendario se respaldan como cualquier otro servicio: ver [ops-backup](../../ops/ops-backup/).

> La privacidad self-hosted es una decisión de arquitectura, no una herramienta: cada servicio que se saca de la nube de un tercero es un flujo de datos que deja de acumularse afuera — y cada pieza que se corre pasa a ser infraestructura que hay que mantener, el mismo trabajo que describe toda la sección [ops](../../ops/).