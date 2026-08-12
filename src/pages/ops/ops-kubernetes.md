---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Kubernetes
subtitle: Orquestación de contenedores a escala
---

Cuando los contenedores son decenas o cientos, se necesita algo que los organice: qué imagen corre dónde, cómo se descubren, cómo se les da red y almacenamiento, cómo se publican al mundo y cómo se mantiene el sistema. Eso es la orquestación.

## Conceptos base

| Concepto        | Qué es                                                             |
| --------------- | ------------------------------------------------------------------ |
| **Pod**         | La unidad mínima: uno o más contenedores que comparten red y storage |
| **Service**     | Nombre estable y virtual que agrupa pods y balancea entre ellos   |
| **Ingress**     | Entrada de tráfico desde afuera hacia los services internos        |
| **Secrets**     | Datos sensibles (tokens, claves) inyectados a los pods             |
| **Namespaces**  | Partición del clúster por entorno, equipo o uso                    |
| **RBAC**        | Control de qué identidad puede hacer qué sobre qué recurso         |

- El **pod es efímero**: no depende el sistema de su identidad; si muere, se reemplaza por otro igual.
- El **service** es el que da una dirección estable, desacoplando a los consumidores del ciclo de vida de los pods.

## Plano de control vs. nodos

- **Plano de control** — el cerebro: API, scheduler, controladores y almacenamiento del estado deseado. Decide y vigila que el sistema coincida con lo declarado.
- **Nodos / workers** — el músculo: corren los pods, el runtime de contenedores y los agentes que comunican al control plane el estado real.

El sistema trabaja **declarativamente**: se declara el estado deseado y los controladores reconcilian el estado actual hacia ese objetivo — el mismo principio que aparece en [ops-iac](ops-iac/) y [ops-cd](ops-cd/).

## Networking (CNI) y Almacenamiento (CSI)

| Pieza            | Qué hace                                                     |
| ---------------- | ------------------------------------------------------------ |
| **CNI**          | Red del clúster: cada pod con su propia IP, comunicación entre nodos |
| **CSI**          | Integración de almacenamiento: volúmenes provisionados bajo demanda |
| **Ingress controller**| El que materializa el Ingress: acepta el tráfico entrante y lo rutea |

- **CNI** define la red de overlay del clúster: cómo se comunican los pods aunque vivan en nodos distintos. Ver [ops-sdn](ops-sdn/).
- **CSI** conecta el clúster con el almacenamiento real — block o file — y lo monta en los pods. Ver [ops-storage](ops-storage/).
- **Ingress** es el front door: certificados, path routing y balanceo hacia los services internos. Ver [ops-traffic](ops-traffic/).

## Empaquetado y extensibilidad

| Pieza          | Qué es                                                        |
| -------------- | ------------------------------------------------------------- |
| **Helm**       | Empaquetado y versionado de apps completas: charts reutilizables y actualizables |
| **Operators**  | Controladores con lógica de negocio: gestionan la app como recurso autogestionado |

- **Helm** convierte un sistema de muchos manifests en un paquete instalable, con valores configurables y upgrades fáciles.
- **Operator pattern** automatiza lo humano: en vez de que alguien haga backups, upgrades y failover a mano, el operador lo hace por normas.

## Bare-Metal vs. Gestionado

| Enfoque             | Dónde corre                                | A favor / en contra                        |
| ------------------- | ------------------------------------------ | ------------------------------------------ |
| **Aprovisionado por uno mismo** | Sobre tu hardware o VMs (Talos, RKE2) | Control total; mantenimiento es tuyo        |
| **Gestionado**      | En el control plane del proveedor          | Menos mantenimiento; menos control         |

**Cómo elegir:** un clúster bare-metal auto-gestionado da autonomía y se aprende el sistema por dentro; un clúster gestionado quita el trabajo operativo del plano de control — la elección es cuánto del sistema se quiere operar uno mismo. Ver [ops-virtualization](ops-virtualization/).