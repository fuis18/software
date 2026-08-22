---
layout: ../../layouts/Layout.astro
eyebrow: Sec
title: Sec Supply Chain
subtitle: Seguridad de la cadena de suministro de software
---

Un atacante ya no necesita romper el firewall: basta con que un componente del software que corre adentro esté comprometido. La seguridad de la cadena de suministro protege ese flujo — de la dependencia a la imagen desplegada.

## SBOM (Software Bill of Materials)

El SBOM es la **lista de todos los componentes** del software: cada dependencia, librería y su versión exacta. Es el inventario que permite saber qué contiene cada artefacto.

| Herramienta  | Rol                            |
| ------------ | ------------------------------ |
| **Syft**     | Genera el SBOM de imágenes y de codebase |
| **CycloneDX**| Formato estándar de SBOM       |

- **Syft** genera el inventario: a partir de una imagen de contenedor o un directorio de código, lista cada paquete y su versión.
- **CycloneDX** es el formato: un estándar de representación del SBOM que permite que herramientas distintas produzcan y consuman el mismo inventario.
- **Por qué importa** — sin SBOM no se puede responder "¿esta vulnerabilidad nos afecta?" cuando se publica un CVE: con el SBOM, el análisis es una búsqueda en el inventario.

## Escaneo de imágenes

El SBOM dice qué hay; el escaneo dice **qué de eso es vulnerable**.

| Herramienta | Qué hace                                       |
| ----------- | ---------------------------------------------- |
| **Trivy**   | Escaneo de vulnerabilidades en imágenes y filesystems |
| **Grype**   | Escaneo de vulnerabilidades sobre el SBOM (de Syft)  |

- **Trivy** — el estándar: escanea la imagen contra bases de datos de vulnerabilidades conocidas y reporta las CVEs por capa y paquete.
- **Grype** — trabaja sobre el inventario generado por Syft: mismo objetivo, yendo de la lista de componentes a las vulnerabilidades.
- **Cuándo** — se escanea antes de subir la imagen al registry y a lo largo de su vida, porque aparecen vulnerabilidades nuevas. El detalle del flujo de imágenes está en [ops-containers](../../ops/ops-containers/).

## Firma de artefactos

El escaneo no prueba la autenticidad: firmar verifica que el artefacto es exactamente el que un autor legítimo construyó — no uno suplantado o modificado en el camino.

| Herramienta | Qué hace                                        |
| ----------- | ----------------------------------------------- |
| **Cosign**  | Firma y verifica imágenes de contenedores       |
| **Sigstore**| Ecosistema de firma de software de código abierto |

- **Cosign** firma imágenes con claves o con el servicio de **Sigstore**, y permite verificar esa firma antes de desplegar — la misma idea de "imágenes firmadas" que aparece en la cadena de seguridad de [ops-containers](../../ops/ops-containers/).
- **Sigstore** resuelve la gestión de claves: firma, verificación y transparencia de certificados de corta duración, sin tener que operar infraestructura PKI propia.

## Secure Builds (SLSA)

SLSA (Supply-chain Levels for Software Artifacts) es el **framework de builds reproducibles y verificables**: niveles que definen qué tan confiable es la cadena que produjo un artefacto.

| Nivel | Qué garantiza                                            |
| ----- | -------------------------------------------------------- |
| **L1** | El build es documentado                                  |
| **L2** | El build es reproducible y versionado                    |
| **L3** | El build es hermético y resistente a interferencia       |
| **L4** | El build es auditable de punta a punta y autorizado      |

- **La progresión** — cada nivel suma garantías sobre cómo se construyó el artefacto: quién lo construyó, con qué fuente, y que nadie externo pudo alterarlo en el proceso.
- **En la práctica** — SLSA eleva los principios de build reproducible de [ops-ci](../../ops/ops-ci/) a un estándar medible: el objetivo es que el artefacto desplegado solo pueda venir de un build verificado.

> La cadena completa se asegura de punta a punta: SBOM (qué hay) → escaneo (qué es vulnerable) → firma (qué es auténtico) → build verificado (cómo se construyó). Es la capa que convierte al pipeline de [ops-ci](../../ops/ops-ci/) en un pipeline confiable.