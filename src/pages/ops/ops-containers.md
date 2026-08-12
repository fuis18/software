---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Containers
subtitle: Contenedores y runtimes
---

Los contenedores empaquetan una aplicación con sus dependencias en una unidad reproducible: el mismo artefacto corre igual en una laptop, en un CI y en producción. Acá se ven las imágenes, los registries donde viven, los runtimes que las ejecutan y cómo se cuida su seguridad.

## Imágenes y Runtimes

| Pieza          | Qué es                                                     |
| -------------- | ---------------------------------------------------------- |
| **Imagen**     | Plantilla inmutable y por capas con app + dependencias + entorno |
| **Contenedor** | Instancia en ejecución de una imagen                        |
| **Runtime**    | El motor que ejecuta contenedores (derechos de kernel, namespaces, cgroups) |

| Runtime      | Perfil                                     | Uso típico                              |
| ------------ | ------------------------------------------ | --------------------------------------- |
| **Docker**   | El estándar, ecosistema y dev experience   | Desarrollo, Compose, todo-en-simple      |
| **Podman**   | Daemonless y rootless                      | Escenarios de seguridad, TUs, desktop   |
| **containerd** | Runtime de bajo nivel (núcleo de Docker) | Base sobre la que corre Kubernetes      |

### Composiciones

Cuando una app no es un contenedor suelto sino un sistema de varios servicios, se define la composición en un archivo declarativo: qué imágenes, qué redes, qué volúmenes y qué variables de entorno, para levantar todo el stack con un comando. Es el patrón de "infraestructura local reproducible". Ver [ops-iac](ops-iac/).

## Registries

El repositorio central donde se suben y bajan las imágenes: el punto de intercambio entre "imagen construida" e "imagen desplegada".

| Registry       | Dónde vive            | Uso                                      |
| -------------- | --------------------- | ---------------------------------------- |
| **Harbor**     | Self-hosted           | Empresas que quieren control y auditoría |
| **ECR**        | Nube (AWS)            | Estar junto al cómputo de la nube        |
| **Quay**       | Self-hosted           | Open source, registries múltiples        |

- **Tageo y versionado** — etiquetas que identifiquen de forma inmutable cada build; los tags que se reescriben (`latest`) rompen la reproducibilidad.
- **Pull-through proxy** — el registry como caché local de imágenes públicas, para no depender de internet en cada deploy.

## Networking de Contenedores

- **Redes por bridge** — contenedores en una red interna se ven entre sí por nombre de servicio, no por IP.
- **Exposición de puertos** — solo lo que se mapea explícitamente queda accesible desde el host.
- **Volúmenes** — persistir datos fuera del contenedor, porque el contenedor es efímero y su escritura se pierde.

## Seguridad de Contenedores

| Paso         | Qué se chequea                                             |
| ------------ | ----------------------------------------------------------- |
| **Escaneo de imágenes** | Vulnerabilidades conocidas en capas y dependencias |
| **Ejecución sin root**  | El proceso corre con mínimos privilegios           |
| **Imágenes firmadas**   | Verificar autenticidad e integridad del artefacto  |
| **Confined**  | Límites de recursos y de syscalls del runtime              |

- Escanear la imagen **antes** de que entre al registry, y volver a escanear a lo largo del ciclo de vida porque se descubren vulnerabilidades nuevas.
- Firmar imágenes para que solo artefactos verificados lleguen a producción.

> La cadena de contenedores se asegura de punta a punta: build reproducible → imagen escaneada → firmada → registry → runtime con mínimos privilegios. Las capas de seguridad se ven en [ops-netsecurity](ops-netsecurity/).