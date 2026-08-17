---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Containers
subtitle: Contenedores y runtimes
---

Los contenedores empaquetan una aplicación con sus dependencias en una unidad reproducible: el mismo artefacto corre igual en una laptop, en un CI y en producción. Acá se ven las imágenes, los registries donde viven, los runtimes que las ejecutan y cómo se cuida su seguridad.

## Imágenes

| Pieza          | Qué es                                                                      |
| -------------- | --------------------------------------------------------------------------- |
| **Imagen**     | Plantilla inmutable y por capas con app + dependencias + entorno            |
| **Contenedor** | Instancia en ejecución de una imagen                                        |
| **Runtime**    | El motor que ejecuta contenedores (derechos de kernel, namespaces, cgroups) |

### Imágenes base minimalistas

| Imagen           | Qué es                                                                   |
| ---------------- | ------------------------------------------------------------------------ |
| **AlpineLinux**  | Distribución ultraliviana (musl, ~5 MB), estándar como capa base de imagen |

- **AlpineLinux** es una distribución minimalista construida sobre musl libc y BusyBox — una imagen base típica pesa unos pocos megabytes frente a los cientos de las distribuciones generalistas. Al ser tan chica, reduce la superficie de ataque y acelera el pull, lo que la convierte en la base por defecto de muchos Dockerfiles.
- **Debilidad:** musl libc y BusyBox no son 100% compatibles con todo el software compilado para glibc — algunas aplicaciones necesitan ajustes o una base distinta (por ejemplo, imágenes `distroless` o distribuciones slim basadas en Debian/Ubuntu).

## Runtimes

### Docker

**Perfil:** el estándar de facto — arquitectura cliente-servidor con un daemon (`dockerd`) corriendo en background, que expone la API que usan el CLI y herramientas como Compose.

- **Fortalezas:** ecosistema masivo (imágenes, docs, tooling, integraciones CI/CD), developer experience pulida, Docker Compose para orquestar multi-contenedor local, Docker Desktop para onboarding rápido en cualquier OS.
- **Casos de uso:** desarrollo local, prototipado, entornos donde la velocidad de setup importa más que el hardening, equipos que ya tienen todo el flujo construido alrededor de Docker.
- **Debilidades:** el daemon corre como root por defecto (superficie de ataque mayor), single point of failure — si `dockerd` cae, todos los contenedores quedan huérfanos o se caen con él.
- **Performance:** overhead moderado por la capa daemon; en la práctica no es el cuello de botella salvo en escenarios muy densos.

### Podman

**Perfil:** daemonless — cada contenedor es un proceso hijo directo del usuario que lo lanza, sin daemon central. Soporta rootless nativamente.

- **Fortalezas:** rootless real (contenedores corren con los permisos del usuario, no de root), sin single point of failure al no haber daemon, CLI compatible con Docker (`alias docker=podman` funciona en la mayoría de los casos), pods nativos (agrupa contenedores como en Kubernetes).
- **Casos de uso:** entornos con requisitos de seguridad estrictos, TUs/multi-usuario en la misma máquina, desktop/dev donde no se quiere un daemon corriendo siempre, CI que corre en runners compartidos.
- **Debilidades:** ecosistema y comunidad más chicos que Docker, algunas herramientas de terceros asumen la API de Docker y no funcionan 1:1, Docker Compose no es nativo (existe `podman-compose`, con paridad parcial).
- **Performance:** similar o levemente mejor que Docker al no tener daemon intermediando cada llamada; rootless puede tener overhead extra en networking (userns, slirp4netns) según el caso.

### containerd

**Perfil:** runtime de bajo nivel — no está pensado para uso humano directo vía CLI, sino como pieza de infraestructura. Es el núcleo que Docker usa por debajo desde hace años.

- **Fortalezas:** liviano, enfocado solo en el ciclo de vida del contenedor (pull de imágenes, gestión de namespaces/cgroups, ejecución), diseñado para ser embebido en otros sistemas, es un proyecto CNCF graduado (estándar de facto en orquestación).
- **Casos de uso:** es la base de ejecución de Kubernetes (vía CRI), y de Docker mismo — normalmente no se interactúa con containerd directamente sino a través de estas capas superiores.
- **Debilidades:** no tiene developer experience propia (no hay equivalente a `docker run` pensado para humanos, aunque existe `ctr`/`nerdctl` como CLIs de bajo nivel), no resuelve networking ni storage por sí solo — depende de plugins (CNI, CSI).
- **Performance:** el más liviano de los tres al ser la capa más cercana al kernel — menos overhead porque no carga las capas de conveniencia que sí tienen Docker o Podman.

### Composiciones

Cuando una app no es un contenedor suelto sino un sistema de varios servicios, se define la composición en un archivo declarativo: qué imágenes, qué redes, qué volúmenes y qué variables de entorno, para levantar todo el stack con un comando. Es el patrón de "infraestructura local reproducible". Ver [ops-iac](../ops-iac/).

## Registries

El repositorio central donde se suben y bajan las imágenes: el punto de intercambio entre "imagen construida" e "imagen desplegada".

Sin un Registry, tendrías que copiar manualmente la imagen compilada (archivos de gigabytes) por SSH a cada servidor donde quieras desplegarla, lo cual es ineficiente y no escalable.

| Registry   | Dónde vive  | Uso                                      |
| ---------- | ----------- | ---------------------------------------- |
| **Harbor** | Self-hosted | Empresas que quieren control y auditoría |
| **ECR**    | Nube (AWS)  | Estar junto al cómputo de la nube        |
| **Quay**   | Self-hosted | Open source, registries múltiples        |
| Docker hub | Nube        | Publico y uso por defecto                |

- **Tageo y versionado** — etiquetas que identifiquen de forma inmutable cada build; los tags que se reescriben (`latest`) rompen la reproducibilidad.
- **Pull-through proxy** — el registry como caché local de imágenes públicas, para no depender de internet en cada deploy.

## Networking de Contenedores

### Redes por Bridge

Cuando creas contenedores, por defecto no están aislados del todo entre sí; Docker o Podman crean una red virtual privada (Bridge) dentro de tu máquina.

- ¿Cómo funciona? Los contenedores conectados a la misma red bridge pueden comunicarse directamente.
- DNS interno por nombre: En lugar de adivinar qué IP interna le asignó el sistema a cada contenedor (que cambia cada vez que se reinician), te comunicas usando el nombre del contenedor.
- Ejemplo práctico:
  Si tu aplicación Web se llama frontend y tu base de datos se llama db-postgres, en la configuración de tu aplicación Web no pones http://192.168.1.15:5432. Pones directamente:

```bash
DATABASE_URL="postgres://db-postgres:5432/mi_base_de_datos"
```

> La red bridge se encarga automáticamente de traducir el nombre db-postgres a la IP interna correcta.

### Exposición de puertos

Por seguridad, la red _bridge_ está **completamente aislada del mundo exterior**. Nadie fuera de tu computadora (ni siquiera tu navegador web local) puede entrar al contenedor a menos que le abras una "puerta".

- **El mapeo de puertos (`-p host:contenedor`):** Es una regla de desvío de tráfico que dice: _"Todo lo que llegue a mi computadora real en el puerto X, envíalo al contenedor en el puerto Y"_.
- **Ejemplo práctico:**
  Un servidor Nginx escucha internamente en el puerto `80`. Si ejecutas:

```bash
docker run -d -p 8080:80 nginx
```

- **Puerto `80` (Contenedor):** Es el puerto donde el servidor Nginx está escuchando _adentro_ del contenedor.
- **Puerto `8080` (Host):** Es el puerto que abres en tu máquina real.
- **Resultado:** Si abres `http://localhost:8080` en tu navegador, tu computadora redirige el tráfico al puerto `80` interno del contenedor. Si no usas `-p`, la aplicación funciona, pero es invisible desde fuera.

### 3. Volúmenes

Los contenedores son **efímeros**: están diseñados para crearse, destruirse o actualizarse en segundos. La capa de archivos interna donde escribe un contenedor se elimina por completo cuando el contenedor se borra (`docker rm`).

- **¿Qué es un volumen?** Es una carpeta que vive en el disco duro de tu computadora real (fuera del contenedor) pero que se "conecta" a una ruta interna del contenedor.
- **¿Por qué se usa en bases de datos?** Para guardar la información de manera permanente. Si destruyes o actualizas el contenedor de MySQL o PostgreSQL, la base de datos se vuelve a crear vacía, pero al reconectarla al volumen, **recupera todos sus datos intactos**.
- **Ejemplo práctico:**

```bash
docker run -d \
  --name mi-postgres \
  -v /mis_datos_locales/postgres:/var/lib/postgresql/data \
  postgres

```

## Seguridad de Contenedores

| Paso                    | Qué se chequea                                     |
| ----------------------- | -------------------------------------------------- |
| **Escaneo de imágenes** | Vulnerabilidades conocidas en capas y dependencias |
| **Ejecución sin root**  | El proceso corre con mínimos privilegios           |
| **Imágenes firmadas**   | Verificar autenticidad e integridad del artefacto  |
| **Confined**            | Límites de recursos y de syscalls del runtime      |

- Escanear la imagen **antes** de que entre al registry, y volver a escanear a lo largo del ciclo de vida porque se descubren vulnerabilidades nuevas.
- Firmar imágenes para que solo artefactos verificados lleguen a producción.

> La cadena de contenedores se asegura de punta a punta: build reproducible → imagen escaneada → firmada → registry → runtime con mínimos privilegios. Las capas de seguridad se ven en [ops-netsecurity](../ops-netsecurity/).
