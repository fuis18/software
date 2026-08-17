---
layout: ../../layouts/Layout.astro
title: Ops
subtitle: Infraestructura, automatización y sistemas
---

Todo el ciclo de vida de la infraestructura: del cableado físico y los racks del datacenter hasta lo que corre en producción y cómo se mide. Cómo se aprovisiona y configura el hardware, cómo se contienen y orquestan las cargas de trabajo, cómo se automatizan entrega y despliegue, y cómo se garantiza — con alertas, métricas y prácticas de fiabilidad — que el sistema real se sostiene en el tiempo.

## Red Física, Hardware y Data Center

### [ops-physical-network](ops-physical-network/)

Cómo viajan los datos a nivel de cable y equipo: routing y switching, los protocolos de la capa física, y la infraestructura pasiva que conecta cada máquina — cableado, patch panels y las VLANs que segmentan la red.

### [ops-hardware](ops-hardware/)

El cómputo real detrás de todo: servidores bare-metal, sistemas operativos de servidor, gestión out-of-band para administrar máquinas sin sistema operativo levantado, y el aprovisionamiento físico.

### [ops-datacenter](ops-datacenter/)

Las operaciones y facilidades que sostienen el hardware: gestión de racks, energía, refrigeración y seguridad física, y el trabajo cotidiano de operar un cuarto de servidores.

## Cómputo y Nube

### [ops-cloud](ops-cloud/)

La infraestructura como servicio de terceros: proveedores de nube pública, los conceptos de arquitectura de nube (regiones, zonas, redes virtuales y control de accesos) y la gestión de costos.

### [ops-virtualization](ops-virtualization/)

Máquinas virtuales y hypervisors: qué es la virtualización, dónde corre cada hypervisor, y cuándo conviene una VM frente a metal desnudo o contenedores.

### [ops-containers](ops-containers/)

Contenedores y runtimes: imágenes, registries, networking de contenedores y escaneo de seguridad de lo que se empaqueta.

### [ops-kubernetes](ops-kubernetes/)

Orquestación de contenedores a escala: plano de control, networking del clúster, almacenamiento, ingreso de tráfico, empaquetado y operadores.

## Almacenamiento

### [ops-storage](ops-storage/)

Las tres formas de persistir datos distribuidos — object, block y file — comparadas por protocolo, latencia y caso de uso.

## NetOps

### [ops-netsecurity](ops-netsecurity/)

La defensa del perímetro y del host: firewalls dedicados, protección contra ataques dirigidos al borde, reglas locales del sistema operativo y control de accesos.

### [ops-traffic](ops-traffic/)

Cómo se enruta y acelera el tráfico hacia los servicios: resolución de nombres, borde de entrega, proxies reversos, balanceadores de carga y certificados.

### [ops-sdn](ops-sdn/)

Redes definidas por software y capas de overlay: túneles entre máquinas, conexiones entre nubes y mallas de servicios.

## CI/CD y Release Ops

### [ops-ci](ops-ci/)

Integración continua: pipelines que compilan, prueban y escanean cada cambio de código antes de que llegue a producción.

### [ops-cd](ops-cd/)

Entrega y despliegue continuo: el repositorio como fuente de verdad, despliegues progresivos y las estrategias para publicar cambios sin romper a los usuarios.

### [ops-iac](ops-iac/)

Infraestructura y configuración como código: la diferencia entre aprovisionar recursos y configurar servidores, la idempotencia, y el flujo declarativo que une la infraestructura con la aplicación.

## SRE y Observabilidad

### [ops-observability](ops-observability/)

Las tres señales para entender qué pasa en producción — métricas, logs y trazas — y los dashboards que las visualizan.

### [ops-incident](ops-incident/)

Gestión de incidentes y alertas: definir objetivos de fiabilidad medibles, alertar a la persona correcta y aprender de cada caída con post-mortems.

### [ops-reliability](ops-reliability/)

Fiabilidad y chaos engineering: dimensionamiento de capacidad, escalado automático, sistemas auto-reparables y romper a propósito para descubrir cómo falla lo construido.

## DataOps / DBRE

### [ops-dbadmin](ops-dbadmin/)

Administración y escalado de bases de datos: replicación, sharding, migraciones de esquema y el trabajo de operar motores de datos en producción.

### [ops-dataops](ops-dataops/)

Pipelines y flujos de datos: orquestación de trabajos, streams de eventos y la arquitectura de lago de datos.

### [ops-backup](ops-backup/)

Backup y disaster recovery: definir cuánta data se puede perder y cuánto se tarda en volver, y las estrategias de recuperación punto a tiempo y replicación fuera de sitio.

## Self-Hosted Services

### [ops-selfhosted](ops-selfhosted/)

Servicios propios para la casa o infraestructura propia: media servers, la automatización que los rodea, descargadores y las utilidades que sostienen la red del hogar.