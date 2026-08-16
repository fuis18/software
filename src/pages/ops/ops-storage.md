---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Storage
subtitle: Persistir datos distribuidos — object, block y file
---

El almacenamiento tiene tres formas fundamentales que se diferencian por el modelo de acceso y la latencia: **block** (por bloques, a nivel disco), **file** (por archivos y carpetas, protocolo de red) y **object** (por objetos con metadatos, HTTP). Elegir bien cada tipo es una decisión de arquitectura.

Esta jerarquía (block → file → object) también es una jerarquía de **qué tan lejos se puede escalar**: block generalmente vive atado a un host o a una red muy cercana; file ya asume red compartida entre varias máquinas; object está diseñado desde el día uno para escalar a nivel planetario, a costa de renunciar a latencia baja y a operaciones tipo filesystem (no se puede "abrir y modificar" un objeto, se reemplaza entero).

## Object Storage

El modelo del mundo cloud: cada dato es un objeto con un identificador único y metadatos, guardado vía API HTTP sin estructura jerárquica.

- **Por qué existe:** los filesystems tradicionales no escalan bien a miles de millones de archivos ni a múltiples datacenters — object storage resuelve esto aplanando todo a un namespace clave-valor, sin directorios reales (las "carpetas" que se ven en un bucket S3 son solo prefijos en el nombre de la clave).
- **Ideal para:** media, backups, data lakes, archivos inmutables — datos que se escriben una vez y se leen muchas (patrón WORM: _write once, read many_).
- **Debilidad estructural:** no sirve para datos que cambian con frecuencia parcial (no se puede editar un byte en el medio de un objeto, hay que reescribirlo entero) ni para cargas que necesitan latencia de milisegundos consistente.
- **La API S3 se volvió el lenguaje común:** casi todo backend de objetos self-hosted implementa la misma API que S3, lo que permite elegir un backend compatible y migrar sin reescribir el código de la aplicación.

### Plataformas

- **S3 (AWS):** el estándar de facto y el que define el protocolo que todos los demás replican. Fortaleza principal: durabilidad extrema (11 nueves) e integración nativa con el resto del ecosistema AWS. Debilidad: costo de egress si se saca mucho tráfico hacia afuera de AWS, y dependencia de vendor.
- **MinIO:** object storage self-hosted, compatible con la API de S3. Fortaleza: correr el mismo modelo mental de S3 on-premise o en cualquier nube, con foco en alto rendimiento (pensado para clusters propios, no solo como "S3 casero"). Caso de uso típico: data lakes privados, backups internos sin salir a la nube pública.
- **Ceph RGW (RADOS Gateway):** la interfaz de objetos sobre un cluster Ceph ya existente. Fortaleza: si ya se tiene Ceph corriendo (por block o file), habilitar RGW da object storage sin infraestructura adicional. Debilidad: hereda la complejidad operativa de administrar Ceph.

## Block Storage

Almacenamiento a nivel de sector, tal como lo ve un sistema operativo: el disco que se formatea y monta.

- **Por qué existe:** es el nivel más bajo y más rápido de abstracción de storage — el SO (o el hipervisor) lo trata exactamente igual que un disco físico, lo que lo hace el único tipo apto para cargas sensibles a latencia, como bases de datos transaccionales o el filesystem raíz de una VM.
- **Ideal para:** workloads clásicas — bases de datos, filesystems de VMs/contenedores. Ver [ops-dbadmin](../ops-dbadmin/) para el detalle de cómo las DBs dependen de esta baja latencia.
- **Debilidad estructural:** no está pensado para compartirse entre múltiples hosts a la vez (un volumen block normalmente lo monta un solo consumidor); compartirlo requiere una capa encima (ahí es donde entra file storage).
- **En Kubernetes** llega vía CSI (Container Storage Interface), el estándar que le permite a un clúster pedir volúmenes block de forma declarativa sin acoplarse al proveedor. Ver [ops-kubernetes](../ops-kubernetes/).

### Plataformas

- **EBS (AWS):** los discos que se le atan a las VMs (EC2) en la nube. Fortaleza: snapshots integrados, distintos tiers de performance (gp3, io2) según cuánto IOPS necesite la carga. Caso de uso: raíz de instancias, discos de bases de datos gestionadas.
- **Longhorn:** block storage distribuido pensado para Kubernetes — cada volumen se replica entre nodos del clúster. Fortaleza: nativo de k8s, simple de operar comparado con Ceph. Caso de uso: clústeres on-prem o bare-metal que necesitan PersistentVolumes sin depender de un proveedor cloud.
- **Ceph RBD (RADOS Block Device):** block distribuido sobre un cluster Ceph. Fortaleza: escalabilidad y madurez — es la opción self-hosted más probada para block a gran escala. Debilidad: curva de operación más alta que Longhorn.
- **iSCSI:** no es una plataforma sino el protocolo que permite exportar un volumen block por red hacia otro host, como si fuera un disco local. Es la pieza que muchas de las plataformas de arriba usan por debajo para "entregar" el volumen.

## File Storage

Compartir archivos por red entre varias máquinas como si fueran carpetas locales.

- **Por qué existe:** cubre el caso que block no puede — múltiples máquinas necesitando leer y escribir sobre la misma jerarquía de carpetas al mismo tiempo, con semántica de filesystem normal (permisos, locks, paths).
- **Ideal para:** configuración compartida, directorios home, cualquier caso donde varios procesos en distintos hosts necesiten ver exactamente los mismos archivos, con los mismos paths.
- **Debilidad estructural:** más lento que block (hay una capa de red y de protocolo de por medio) y menos escalable que object para volúmenes masivos — no es la opción para petabytes de datos inmutables.

### Plataformas / Protocolos

- **NFS (Network File System):** el protocolo estándar en el mundo Linux/Unix. Fortaleza: simple, universalmente soportado por VMs y contenedores. Caso de uso: compartir configuración o datos entre pods/hosts Linux.
- **EFS (AWS):** la versión gestionada de file storage compartido en AWS, pensada para que muchas VMs monten el mismo filesystem elástico. Fortaleza: escala automáticamente, sin gestionar servidores NFS propios. Debilidad: latencia mayor que EBS, costo por uso puede subir con tráfico alto.
- **CephFS:** file storage sobre un cluster Ceph. Fortaleza: si ya hay Ceph para block u object, sumar CephFS da la tercera pata sin infraestructura nueva. Caso de uso: entornos self-hosted que quieren los tres tipos (block, file, object) desde un mismo cluster.
- **SMB:** protocolo equivalente a NFS pero para el mundo Windows — también el que entienden la mayoría de los NAS domésticos/empresariales. Caso de uso: compartir con estaciones Windows o dispositivos NAS.

## Cómo elegir

La pregunta no es "¿cuál es mejor?" sino **qué necesita realmente la carga**: latencia, si se comparte entre hosts, y si el dato cambia o es inmutable.

| Si la carga necesita...                                       | Elegir                 |
| ------------------------------------------------------------- | ---------------------- |
| Disco de baja latencia para un host o una DB                  | **Block**              |
| Que varias máquinas compartan un filesystem                   | **File**               |
| Volúmenes enormes, inmutables y baratos (backup, media, lake) | **Object**             |
| Empezar con código abierto y no depender de la nube           | **Ceph / MinIO / NFS** |

> Una misma infraestructura suele usar los tres tipos a la vez: block para las DBs, file para compartir config, object para el histórico.
> La redundancia y la estrategia de recuperación de cada tipo se ven en [ops-backup](../ops-backup/).
