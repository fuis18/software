---
layout: ../../../layouts/Layout.astro
eyebrow: Ops
title: Ops Containers
subtitle: Containers and runtimes
---

Containers package an application with its dependencies into a reproducible unit: the same artifact runs the same on a laptop, in CI, and in production. This covers images, the registries where they live, the runtimes that execute them, and how their security is maintained.

## Images

| Piece          | What it is                                                                      |
| -------------- | --------------------------------------------------------------------------- |
| **Image**     | Immutable, layered template with app + dependencies + environment            |
| **Container** | Running instance of an image                                        |
| **Runtime**    | The engine that runs containers (kernel rights, namespaces, cgroups) |

### Minimalist base images

| Image           | What it is                                                                   |
| ---------------- | ------------------------------------------------------------------------ |
| **AlpineLinux**  | Ultra-lightweight distribution (musl, ~5 MB), standard as base image layer |

- **AlpineLinux** is a minimalist distribution built on musl libc and BusyBox — a typical base image weighs a few megabytes compared to the hundreds of general-purpose distributions. Being so small, it reduces the attack surface and speeds up pulls, making it the default base for many Dockerfiles.
- **Weakness:** musl libc and BusyBox are not 100% compatible with all software compiled for glibc — some applications need adjustments or a different base (for example, `distroless` images or slim distributions based on Debian/Ubuntu).

## Runtimes

### Docker

**Profile:** the de facto standard — client-server architecture with a daemon (`dockerd`) running in the background, exposing the API used by the CLI and tools like Compose.

- **Strengths:** massive ecosystem (images, docs, tooling, CI/CD integrations), polished developer experience, Docker Compose for orchestrating local multi-container setups, Docker Desktop for fast onboarding on any OS.
- **Use cases:** local development, prototyping, environments where setup speed matters more than hardening, teams that already have the entire workflow built around Docker.
- **Weaknesses:** the daemon runs as root by default (larger attack surface), single point of failure — if `dockerd` goes down, all containers become orphaned or fall with it.
- **Performance:** moderate overhead from the daemon layer; in practice it's not the bottleneck except in very dense scenarios.

### Podman

**Profile:** daemonless — each container is a direct child process of the user who launches it, with no central daemon. Supports rootless natively.

- **Strengths:** real rootless (containers run with user permissions, not root), no single point of failure since there's no daemon, Docker-compatible CLI (`alias docker=podman` works in most cases), native pods (groups containers like in Kubernetes).
- **Use cases:** environments with strict security requirements, multi-user setups on the same machine, desktop/dev where you don't want a daemon running constantly, CI running on shared runners.
- **Weaknesses:** smaller ecosystem and community than Docker, some third-party tools assume the Docker API and don't work 1:1, Docker Compose is not native (`podman-compose` exists with partial parity).
- **Performance:** similar or slightly better than Docker since there's no daemon mediating every call; rootless may have extra overhead in networking (userns, slirp4netns) depending on the case.

### containerd

**Profile:** low-level runtime — not intended for direct human use via CLI, but as an infrastructure piece. It's the core that Docker has used underneath for years.

- **Strengths:** lightweight, focused only on the container lifecycle (image pulling, namespace/cgroup management, execution), designed to be embedded in other systems, a graduated CNCF project (de facto standard in orchestration).
- **Use cases:** it's the execution foundation of Kubernetes (via CRI), and of Docker itself — normally you don't interact with containerd directly but through these higher layers.
- **Weaknesses:** no developer experience of its own (no `docker run` equivalent designed for humans, though `ctr`/`nerdctl` exist as low-level CLIs), doesn't handle networking or storage on its own — depends on plugins (CNI, CSI).
- **Performance:** the lightest of the three since it's the layer closest to the kernel — less overhead because it doesn't load the convenience layers that Docker or Podman have.

### Compositions

When an app isn't a standalone container but a multi-service system, the composition is defined in a declarative file: what images, what networks, what volumes, and what environment variables, to bring up the entire stack with a single command. This is the "reproducible local infrastructure" pattern. See [ops-iac](../ops-iac/).

## Registries

The central repository where images are pushed and pulled: the exchange point between "built image" and "deployed image."

Without a Registry, you'd have to manually copy the compiled image (gigabyte files) via SSH to every server where you want to deploy it, which is inefficient and doesn't scale.

| Registry   | Where it lives  | Use                                      |
| ---------- | ----------- | ---------------------------------------- |
| **Harbor** | Self-hosted | Enterprises wanting control and auditing |
| **ECR**    | Cloud (AWS)  | Being close to cloud compute        |
| **Quay**   | Self-hosted | Open source, multiple registries        |
| Docker hub | Cloud        | Public and default use                |

- **Tagging and versioning** — immutable tags that identify each build; tags that get overwritten (`latest`) break reproducibility.
- **Pull-through proxy** — the registry as a local cache of public images, so you don't depend on the internet for every deploy.

## Container Networking

### Bridge Networks

When you create containers, by default they aren't fully isolated from each other; Docker or Podman creates a private virtual network (Bridge) inside your machine.

- How does it work? Containers connected to the same bridge network can communicate directly.
- Internal DNS by name: Instead of guessing what internal IP the system assigned to each container (which changes every time they restart), you communicate using the container name.
- Practical example:
  If your web application is called frontend and your database is called db-postgres, in your web application's configuration you don't put http://192.168.1.15:5432. You put directly:

```bash
DATABASE_URL="postgres://db-postgres:5432/my_database"
```

> The bridge network automatically handles translating the name db-postgres to the correct internal IP.

### Port Exposure

For security, the _bridge_ network is **completely isolated from the outside world**. No one outside your computer (not even your local web browser) can access the container unless you open a "door" for them.

- **Port mapping (`-p host:container`):** It's a traffic forwarding rule that says: _"Everything that arrives at my real computer on port X, forward it to the container on port Y"_.
- **Practical example:**
  An Nginx server listens internally on port `80`. If you run:

```bash
docker run -d -p 8080:80 nginx
```

- **Port `80` (Container):** This is the port where the Nginx server is listening _inside_ the container.
- **Port `8080` (Host):** This is the port you open on your real machine.
- **Result:** If you open `http://localhost:8080` in your browser, your computer redirects traffic to the internal container port `80`. If you don't use `-p`, the application works but is invisible from outside.

### 3. Volumes

Containers are **ephemeral**: they are designed to be created, destroyed, or updated in seconds. The internal file layer where a container writes is completely removed when the container is deleted (`docker rm`).

- **What is a volume?** It's a folder that lives on your real computer's hard drive (outside the container) but is "connected" to an internal path in the container.
- **Why is it used with databases?** To store information permanently. If you destroy or update the MySQL or PostgreSQL container, the database is recreated empty, but when reconnected to the volume, **it recovers all its data intact**.
- **Practical example:**

```bash
docker run -d \
  --name my-postgres \
  -v /my_local_data/postgres:/var/lib/postgresql/data \
  postgres

```

## Container Security

| Step                    | What is checked                                     |
| ----------------------- | -------------------------------------------------- |
| **Image scanning** | Known vulnerabilities in layers and dependencies |
| **Rootless execution**  | The process runs with minimal privileges           |
| **Signed images**   | Verify authenticity and integrity of the artifact  |
| **Confined**            | Resource and syscall limits from the runtime      |

- Scan the image **before** it enters the registry, and scan again throughout the lifecycle because new vulnerabilities are discovered.
- Sign images so only verified artifacts reach production.

> The container chain is secured end to end: reproducible build → scanned image → signed → registry → runtime with minimal privileges. The security layers are covered in [ops-netsecurity](../ops-netsecurity/).
