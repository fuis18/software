---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Kubernetes
subtitle: Orquestación de contenedores a escala
---

Cuando los contenedores son decenas o cientos, se necesita algo que los organice: qué imagen corre dónde, cómo se descubren, cómo se les da red y almacenamiento, cómo se publican al mundo y cómo se mantiene el sistema. Eso es la orquestación.

## Conceptos base

### Pod

**Qué es:** la unidad mínima de despliegue en Kubernetes — uno o más contenedores que comparten red (misma IP, mismo `localhost`) y storage (volúmenes montados en común).

- **Por qué existe:** Kubernetes no orquesta contenedores sueltos, orquesta pods. Cuando un pod tiene más de un contenedor, es porque hay una dependencia fuerte entre ellos (ej: un sidecar que le hace proxy o logging al contenedor principal) y necesitan vivir y morir juntos.
- **Efímero por diseño:** el pod no tiene identidad persistente que el sistema respete — si muere (por falla, actualización, reprogramación), no se "revive": se reemplaza por un pod nuevo, con IP nueva. Esto es intencional, no un bug: fuerza a que nada dependa de la identidad de un pod individual.
- **Consecuencia directa:** si nada puede depender de la IP de un pod, algo tiene que dar una dirección estable hacia un grupo de pods intercambiables. Ese algo es el Service.

### Service

**Qué es:** un nombre y una IP virtual estables que agrupan un conjunto de pods (típicamente seleccionados por labels) y balancean tráfico entre ellos.

- **Por qué existe:** desacopla a los consumidores (otros pods, otros services) del ciclo de vida de los pods reales. Un consumidor le habla al Service, nunca a un pod directamente — así los pods pueden morir y ser reemplazados sin que nadie "se entere".
- **Alcance:** por defecto el Service es interno al clúster (`ClusterIP`) — resuelve el problema de descubrimiento _dentro_ de Kubernetes, pero no abre nada hacia afuera.
- **Consecuencia directa:** si el Service solo resuelve tráfico interno, hace falta una pieza aparte para decidir qué entra desde internet y a qué Service se lo enruta. Esa pieza es el Ingress.

### Ingress

**Qué es:** la puerta de entrada de tráfico externo hacia los Services internos — define reglas de ruteo (por dominio, por path) hacia qué Service debe llegar cada request.

- **Por qué existe:** sin Ingress, exponer un Service hacia afuera requiere soluciones más rudimentarias (`NodePort`, `LoadBalancer` por servicio). El Ingress centraliza el ruteo HTTP/HTTPS de todo el clúster en un solo punto de entrada, con reglas declarativas.
- **Requiere un Ingress Controller:** el recurso Ingress por sí solo es solo la regla — necesita un controller corriendo (nginx, traefik, etc.) que efectivamente implemente el ruteo.

> Con esto se completa el camino del tráfico: **Ingress** recibe desde afuera → enruta a un **Service** → que balancea entre **Pods** vivos en ese momento.

### Secrets

**Qué es:** datos sensibles (tokens, contraseñas, claves de API, certificados) que se inyectan a los pods como variables de entorno o archivos montados, sin quedar hardcodeados en la imagen ni en el manifiesto.

- **Por qué existe:** separa la configuración sensible del artefacto de imagen — la misma imagen puede correr en distintos entornos (dev, prod) recibiendo secrets distintos, sin reconstruir nada.
- **Nota de seguridad:** por defecto los Secrets están solo codificados en base64, no encriptados en reposo — la protección real depende de RBAC (quién puede leerlos) y, si se necesita más, de encriptación en `etcd` o un gestor externo (Vault, sealed-secrets).

### Namespaces

**Qué es:** una partición lógica del clúster — divide un mismo clúster físico en compartimentos aislados por entorno (dev/staging/prod), por equipo o por proyecto.

- **Por qué existe:** pods, Services y Secrets con el mismo nombre pueden coexistir en namespaces distintos sin chocar. Es la unidad sobre la que se aplican cuotas de recursos y, sobre todo, sobre la que se define a quién se le permite hacer qué.
- **Consecuencia directa:** un namespace por sí solo no impide que alguien con acceso al clúster toque recursos de otro namespace — la separación es organizativa, no de seguridad, hasta que se combina con RBAC.

### RBAC

**Qué es:** Role-Based Access Control — el mecanismo que define qué identidad (usuario, service account) puede hacer qué acción (get, create, delete) sobre qué recurso (pods, secrets, services), típicamente acotado a un namespace.

- **Por qué existe:** es la pieza que convierte la partición lógica de los namespaces en aislamiento real. Sin RBAC, los namespaces son solo organización; con RBAC, son fronteras de permisos.
- **Dónde más pega:** es también el mecanismo que controla, por ejemplo, quién puede leer un Secret — cerrando el círculo entre los dos conceptos.

## Plano de control vs. nodos

- **Plano de control** — el cerebro: API, scheduler, controladores y almacenamiento del estado deseado. Decide y vigila que el sistema coincida con lo declarado.
- **Nodos / workers** — el músculo: corren los pods, el runtime de contenedores y los agentes que comunican al control plane el estado real.

El sistema trabaja **declarativamente**: se declara el estado deseado y los controladores reconcilian el estado actual hacia ese objetivo — el mismo principio que aparece en [ops-iac](../ops-iac/) y [ops-cd](../ops-cd/).

## Kubernetes bare-metal

El clúster se puede instalar sobre VMs en la nube (gestionado por el proveedor) o sobre servidores físicos propios. En bare-metal, el sistema operativo del nodo y la instalación pasan a ser parte del problema — y hay distribuciones pensadas específicamente para eso.

| Distribución | Perfil                                       | Destaca en                                |
| ------------ | -------------------------------------------- | ----------------------------------------- |
| **Talos**    | SO inmutable diseñado solo para Kubernetes   | Seguridad, gestión por API, sin SSH       |
| **RKE2**     | Kubernetes hardened de Rancher, con containerd | Cumplimiento CIS, instalación simple      |

- **Talos** es un sistema operativo que no existe para otra cosa que correr Kubernetes: inmutable (nada se instala ni modifica en runtime), sin SSH ni shell interactivo — se administra entero por API, con certificados. Cada nodo es idéntico y reproducible, lo que encaja con el modelo declarativo.
- **RKE2** es la distribución de Rancher: un solo binario levanta el clúster con containerd y componentes hardened, alineado a los benchmarks CIS. Menos radical que Talos (sigue siendo un SO con servicios), pero más simple de operar que montar un clúster con `kubeadm` a mano.
- La instalación física de estos nodos se apoya en el aprovisionamiento y el out-of-band de [ops-hardware](../ops-hardware/).

## Networking y Almacenamiento

Kubernetes no implementa la red ni el almacenamiento por sí mismo: define interfaces estándar — **CNI** y **CSI** — y deja que un plugin las implemente. El clúster declara _qué_ necesita; el plugin resuelve _cómo_ lo consigue contra la infraestructura real.

### CNI (Container Network Interface)

**Qué es:** la interfaz que conecta el clúster con el plugin de red. Kubernetes la usa para que cada pod reciba su propia IP y para que pods de nodos distintos se comuniquen como si estuvieran en una misma red.

- **Por qué existe:** la red del clúster se puede resolver de muchas formas (overlay con túneles, eBPF en el kernel, integración con la red de la nube). Kubernetes no decide cuál usar: delega la decisión al plugin y queda agnóstico del _cómo_.
- **Lo que el clúster exige:** cada pod con IP propia, comunicación pod-a-pod entre nodos y — si el plugin lo soporta — políticas de red que digan qué pods pueden hablarse.
- **El plugin es la implementación:** la topología real de esa red (túneles, encapsulación, velocidad) vive en el plugin, no en Kubernetes. Las capas overlay sobre las que se construyen se ven en [ops-sdn](../ops-sdn/).

> El Service se apoya en esto: balancea entre pods que _tienen IP_ gracias a la CNI. Red de pods y Service forman el "adentro" del clúster; el Ingress abre ese adentro hacia afuera.

### CSI (Container Storage Interface)

**Qué es:** la interfaz que conecta el clúster con el plugin de almacenamiento. Kubernetes la usa para que el plugin provisione, adjunte y monte volúmenes en los pods.

- **Por qué existe:** la capa de escritura local de un pod es efímera por diseño — muere con el pod. Cuando la data debe sobrevivir (una base de datos, archivos de la app), se necesita un volumen que se pueda montar, desmontar y volver a montar en otro nodo sin perder nada.
- **Declarativo de punta a punta:** el pod declara cuánto y qué tipo de almacenamiento necesita; el plugin lo materializa contra el backend real — un disco de la nube, un filesystem compartido, un backend de objetos.
- **El plugin es el puente:** el _cómo_ (qué backend, block/file/object) es problema del plugin, no del clúster. Los tipos de almacenamiento que hay detrás se ven en [ops-storage](../ops-storage/).

### Ingress Controller

**Qué es:** el plugin que materializa el recurso Ingress — el que realmente escucha el tráfico entrante, aplica las reglas declaradas y lo reenvía al Service correcto.

- **Por qué existe:** el recurso Ingress es solo la regla (dominio → Service). Sin un controller corriendo, la regla no hace nada: el controller levanta el proxy / balanceador real que recibe las requests y las rutea.
- **Es donde Ingress toca la capa de tráfico:** los controllers son proxies o balanceadores ejecutándose dentro del clúster; la mecánica de ese tráfico — routing, TLS, balanceo — se ve en [ops-traffic](../ops-traffic/).

> En resumen: la CNI les da red a los pods, la CSI les da datos que sobreviven, y el Ingress Controller abre el clúster hacia afuera — mientras Service e Ingress (vistos arriba) son la parte lógica que organiza el tráfico.

## Empaquetado y extensibilidad

| Pieza         | Qué es                                                                            |
| ------------- | --------------------------------------------------------------------------------- |
| **Helm**      | Empaquetado y versionado de apps completas: charts reutilizables y actualizables  |
| **Operators** | Controladores con lógica de negocio: gestionan la app como recurso autogestionado |

- **Helm** convierte un sistema de muchos manifests en un paquete instalable, con valores configurables y upgrades fáciles.
- **Operator pattern** automatiza lo humano: en vez de que alguien haga backups, upgrades y failover a mano, el operador lo hace por normas.
