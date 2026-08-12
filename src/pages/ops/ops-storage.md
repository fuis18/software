---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Storage
subtitle: Persistir datos distribuidos — object, block y file
---

El almacenamiento tiene tres formas fundamentales que se diferencian por el modelo de acceso y la latencia: **block** (por bloques, a nivel disco), **file** (por archivos y carpetas, protocolo de red) y **object** (por objetos con metadatos, HTTP). Elegir bien cada tipo es una decisión de arquitectura.

## Tipos de almacenamiento

| Tipo      | Modelo de acceso          | Latencia / uso                         | Protocolos repr.          |
| --------- | ------------------------- | -------------------------------------- | ------------------------- |
| **Block** | Discos montados en un host, lectura/escritura por bloques | Baja latencia, bases de datos, raíces de VMs/contenedores | iSCSI, NVMe-oF, APIs de disco |
| **File**  | Archivos y carpetas compartidos por red | Media latencia, uso compartido multi-host | NFS, SMB               |
| **Object**| Objetos con clave + metadatos vía API/HTTP | Alta latencia, datos inmutables y masivos, backup | S3, HTTP/REST          |

## Object Storage

El modelo del mundo cloud: cada dato es un objeto con un identificador único y metadatos, guardado vía API HTTP sin estructura jerárquica.

| Plataforma | Dónde vive   | Uso                                     |
| ---------- | ------------ | --------------------------------------- |
| **S3**     | Nube (AWS)   | El estándar de facto; el resto lo replica |
| **MinIO**  | Self-hosted  | Object storage propio, compatible con S3 |
| **Ceph RGW**| Self-hosted | Gateway de objetos sobre un cluster Ceph |

- Ideal para: media, backups, data lakes, archivos inmutables — datos que se escriben una vez y se leen muchas.
- La API S3 se volvió el lenguaje común: elegir un backend de objetos compatible permite migrar sin reescribir.

## Block Storage

Almacenamiento a nivel de sector, tal como lo ve un sistema operativo: el disco que se formatea y monta.

| Plataforma | Dónde vive   | Uso                                        |
| ---------- | ------------ | ------------------------------------------ |
| **EBS**    | Nube (AWS)   | Discos de VMs en la nube                    |
| **Longhorn**| Kubernetes | Block distribuido gestionado para el clúster |
| **Ceph RBD**| Self-hosted | Block sobre un cluster Ceph                 |
| **iSCSI**  | Protocolo     | Exportar block por red a hosts              |

- Block es lo que necesitan las workloads clásicas: bases de datos, filesystems. Ver [ops-dbadmin](ops-dbadmin/).
- En Kubernetes llega vía CSI. Ver [ops-kubernetes](ops-kubernetes/).

## File Storage

Compartir archivos por red entre varias máquinas como si fueran carpetas locales.

| Plataforma | Dónde vive   | Uso                                      |
| ---------- | ------------ | ---------------------------------------- |
| **NFS**    | Protocolo     | Compartir en entornos Linux, VMs y contenedores |
| **EFS**    | Nube (AWS)   | File compartido entre muchas VMs         |
| **CephFS** | Self-hosted  | File sobre un cluster Ceph               |
| **SMB**    | Protocolo     | Compartir con Windows y dispositivos NAS |

## Cómo elegir

| Si la carga necesita...                          | Elegir   |
| ------------------------------------------------ | -------- |
| Disco de baja latencia para un host o una DB     | **Block** |
| Que varias máquinas compartan un filesystem      | **File**  |
| Volúmenes enormes, inmutables y baratos (backup, media, lake) | **Object** |
| Empezar con código abierto y no depender de la nube | **Ceph / MinIO** / NFS |

> Una misma infraestructura suele usar los tres tipos a la vez: block para las DBs, file para compartir config, object para el histórico.
> La redundancia y la estrategia de recuperación de cada tipo se ven en [ops-backup](ops-backup/).