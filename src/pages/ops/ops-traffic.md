---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops Traffic
subtitle: Cómo se enruta y acelera el tráfico hacia los servicios
---

Entre el usuario y el servicio hay toda una capa de infraestructura de red: resolver el nombre, acelerar la entrega, balancear la carga y cifrar la conexión. Cada pieza se elige según el objetivo del tráfico.

## Resolución de Nombres (DNS)

| Pieza      | Qué hace                                        |
| ---------- | ----------------------------------------------- |
| **DNS**    | Traduce el nombre legible a la dirección del servicio |
| **CoreDNS**| Resolución interna dentro del clúster           |
| **Resolver externo** | DNS autoritativo y de caché del borde  |

- El DNS es la columna que conecta nombre con servicio: sin resolución correcta, nada se encuentra.
- En el clúster, la resolución interna por nombre de servicio es lo que permite a las apps hablarse sin conocer IPs. Ver [ops-kubernetes](ops-kubernetes/).

## Borde de Entrega (CDN / Edge)

| Pieza         | Qué es                                          |
| ------------- | ----------------------------------------------- |
| **CDN / Edge**| Red de servidores distribuida que sirve el contenido desde el punto más cercano al usuario |
| **Anycast**   | Misma dirección IP anunciada desde muchos puntos; el router lleva al más cercano |

- **CDN** acelera entrega de contenido estático y video, y además absorbe tráfico de ataques (DDoS), aliviando al origen. Ver [ops-netsecurity](ops-netsecurity/).
- **Anycast** es el mecanismo que permite esa proximidad: muchos nodos con la misma IP y la red elige el camino más corto.

## Proxy Reverso

El front-end del servicio: recibe el tráfico y lo reenruta al backend correcto, mientras suma capacidades de red.

| Plataforma | Perfil                      | Destaca en                                  |
| ---------- | --------------------------- | ------------------------------------------- |
| **NGINX**  | Todo-en-uno clásico         | Proxy, caching, TLS, balanceo, servidor web |
| **HAProxy**| Especialista en balanceo    | High availability, health checks, gRPC/websocket |

| Capacidad       | Qué hace                                                |
| --------------- | ------------------------------------------------------- |
| **Proxy reverso** | Recibe por un dominio/ruta y reenvía al servicio interno |
| **Terminación TLS** | Cifra en el borde y descifra para el backend       |
| **Caching**     | Responde cacheado sin tocar el backend                  |
| **Web server**  | Sirve contenido estático directo                        |

## Balanceadores de Carga

Distribuir el tráfico entre varias instancias del mismo servicio para no saturar ninguna.

| Tipo             | Dónde vive        | Uso                                        |
| ---------------- | ----------------- | ------------------------------------------ |
| **Software (L4)**| Hosts propios / nube | Distribución por IP y puerto, alta velocidad |
| **Hardware (L7)**| Appliance dedicado | Load balancer enterprise (F5, etc.), features avanzadas |
| **Cloud LB**     | Proveedor de nube | Balanceo gestionado sin operar nada         |
| **Cluster ingress**| Kubernetes      | Balanceo interno hacia los servicios       |

**Cómo elegir:**
- **Proxy reverso** si se necesita resolver dominios/rutas hacia servicios, caching o TLS centralizado.
- **Load balancer** cuando hay varias instancias de un servicio y se quiere repartir y detectar fallos.
- **Cluster ingress** cuando el tráfico entra a Kubernetes. Ver [ops-kubernetes](ops-kubernetes/).

## Certificados SSL/TLS

Cifrar el tráfico en tránsito es hoy obligatorio, no opcional.

- **Emisión** — certificados de dominio legítimos vía HTTP-01/DNS-01, con renovación automática.
- **Cadena de confianza** — el cliente verifica que el certificado fue firmado por una autoridad de confianza.
- **Terminación en el borde** — los certificados viven en el proxy/edge, y la conexión interna puede seguir encriptada (mTLS).

> Regla simple: tráfico externo siempre cifrado con certificados válidos y renovados automáticamente; tráfico interno con mTLS si el riesgo es crítico.