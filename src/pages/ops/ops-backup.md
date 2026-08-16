---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Backup
subtitle: Backup y disaster recovery
---

Ningún sistema merece vivirse sin la respuesta a una pregunta: si esto desaparece hoy, ¿cuánto perdemos y cuándo volvemos? Backup y disaster recovery llevan esa pregunta a números y a procedimientos reales.

## RPO y RTO

Los dos números que definen cualquier estrategia de respaldo.

| Sigla | Qué es                                        | Pregunta que responde                      |
| ----- | --------------------------------------------- | ------------------------------------------ |
| **RPO** | Máxima data aceptable de perderse           | ¿Qué tan viejo puede estar el último backup? |
| **RTO** | Máximo tiempo aceptable para volver a estar | ¿Cuánto tardamos en recuperar el servicio? |

- **RPO pequeño** (minutos) → backups/streaming casi continuos, más caro.
- **RTO pequeño** → recuperación ensayada y rápida, más robótica.
- La estrategia entera se negocia con negociación entre estos dos números y el costo.

## Estrategias de respaldo

| Estrategia            | Qué hace                                        | Cuándo                      |
| --------------------- | ----------------------------------------------- | --------------------------- |
| **Backup completo**   | Copia de todo el dataset                        | Base del esquema, tumbos     |
| **Incremental**       | Solo lo que cambió desde el último backup       | Viento diario, ahorro de espacio |
| **Point-in-Time Recovery** | Volver a un momento exacto (segundo/minuto) | Corregir error puntual, anular una mala acción |

- **PITR** combina backups periódicos + log/registro continuo: permite "rebobinar" el estado a un instante antes del desastre.
- **Backup ≠ réplica** — la réplica protege de la caída del nodo (ver [ops-dbadmin](../ops-dbadmin/)); el backup protege del borrado accidental y de la corrupción. La replicación de un error es solo más copias del error.

## Replicación fuera de sitio

- **Cross-region / off-site** — copias en otra ubicación física: un incendio del DC no debería llevarse también el respaldo.
- **Regla off-site 3-2-1** — 3 copias, 2 soportes distintos, 1 fuera del sitio.
- **Regiones** — en la nube, replicar a otra región / zona. Ver [ops-cloud](../ops-cloud/).

## Backup en Kubernetes

| Plataforma | Perfil                    | Uso                                   |
| ---------- | ------------------------- | ------------------------------------- |
| **Velero** | Backup/restore del clúster | Respaldo de recursos y volúmenes k8s  |

- **Velero** respalda los recursos declarativos del clúster y los volúmenes, con restore dirigido a un momento/entorno.
- Como todo en Kubernetes: el backup también es declarativo y automatizable. Ver [ops-kubernetes](../ops-kubernetes/).

## Prueba de restauración

Un backup que no se recuperó jamás no es un backup: es una esperanza.

- **Restore regular ensayado** — recuperar en un ambiente de prueba de forma periódica, no el día del incendio.
- **Runbooks del DR** — pasos escritos y validados para recomponer desde cero: datos, apps e infraestructura. Ver [ops-iac](../ops-iac/) para la parte reproducible.
- **Automatización** — el respaldo no depende de un humano que se acuerde: se programa, se alerta y se verifica. Ver [ops-observability](../ops-observability/).

> La buena noticia del backup: las estrategias son conocidas y probadas. La mala: se aprenden el día que se aplazan.