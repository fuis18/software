---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Cloud
subtitle: Nube pública, arquitectura y FinOps
---

La infraestructura como servicio de terceros: en vez de comprar y mantener hardware, se alquila cómputo, red y almacenamiento desde la nube, con modelos de cobro por uso. Acá están los conceptos de arquitectura de nube y cómo se gestiona su costo.

## Proveedores

| Proveedor      | Perfil                         | Destaca en                                            |
| -------------- | ------------------------------ | ----------------------------------------------------- |
| **AWS**        | El más grande y maduro         | Catálogo enorme, industria, certificaciones           |
| **Azure**      | Integración Microsoft          | Entornos corporativos, Active Directory, O365         |
| **GCP**        | Datos y machine learning       | BigQuery, Kubernetes gestionado, red global           |

**Cómo elegir:** no hay "pirámide ganadora"; se elige por el ecosistema cercano (¿ya usa la empresa productos del proveedor?), por la madurez del servicio exacto que se necesita y por el equipo que lo va a operar.

## Arquitectura de Nube

Los conceptos que se repiten en cualquier nube, con nombres que cambian levemente entre proveedores.

| Concepto        | Qué es                                                               |
| --------------- | -------------------------------------------------------------------- |
| **Región**      | Zona geográfica donde viven físicamente los recursos                 |
| **Zona de disponibilidad** | Datacenter independiente dentro de una región (aislado en fallas) |
| **Red virtual** | Segmento de red aislado y controlable donde se ponen los recursos    |
| **Control de accesos** | Quién puede hacer qué sobre cada recurso (roles y políticas)  |
| **Objetos de almacenamiento** | Buckets/servicios de almacenamiento de objetos          |

- **Regiones y zonas** — el patrón de alta disponibilidad en la nube: replicar la carga entre zonas para sobrevivir la caída de un datacenter completo.
- **VPC / red virtual** — la nube segura se parece a una red on-premise: subredes, firewalls de red, peering. Ver [ops-sdn](../ops-sdn/).
- **IAM (Identity and Access Management)** — el control granular de accesos: sin permisos mínimos y sin rotación, la nube es una puerta abierta. Ver [ops-netsecurity](../ops-netsecurity/).

## FinOps

La disciplina de gestionar el costo de la nube, porque a diferencia del hardware propio, en la nube cada recurso encendido es consumo facturado.

- **Derecho a tamaño (right-sizing)** — pagar por la capacidad que la carga realmente usa, no por la que sobra.
- **Descuentos por compromiso** — el consumo sostenido y predecible se paga más barato comprometiendo uso por adelantado.
- **Etiquetado y atribución** — cada recurso marcado (proyecto, equipo, entorno) para saber quién consume qué.
- **Optimización de almacenamiento** — mover datos a tier de menor costo según frecuencia de acceso. Ver [ops-storage](../ops-storage/).

> FinOps no es ahorro puntual: es un ciclo continuo de informar → optimizar → operar, alineando al negocio con el costo real de la infraestructura.