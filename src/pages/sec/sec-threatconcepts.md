---
layout: ../../layouts/Layout.astro
eyebrow: Sec
title: Sec Threat Concepts
subtitle: Marcos conceptuales de seguridad
---

Antes de las herramientas vienen los marcos: las listas de riesgos, los modelos de ataque y las metodologías para pensar la seguridad con estructura en vez de intuición. Un scanner te dice _qué_ encontró; un marco te dice _dónde mirar_ y *qué categorías no te podés olvidar de cubrir. Por eso conviene tenerlos internalizados antes de tocar la herramienta específica.

## OWASP

El catálogo de referencia de los riesgos de seguridad en aplicaciones web, mantenido por la comunidad OWASP (Open Worldwide Application Security Project) y revisado cada pocos años para reflejar cómo cambian los ataques reales.

| Recurso          | Qué es                                                    |
| ---------------- | --------------------------------------------------------- |
| **OWASP Top 10** | Los 10 riesgos web más críticos, revisados periódicamente |
| **OWASP ASVS**   | Checklist detallada de requisitos de seguridad de apps    |

- **Top 10:** Es el vocabulario común de la industria de categorías: cada una agrupa muchas variantes concretas.
- **ASVS (Application Security Verification Standard):** Es la guía práctica para auditar una aplicación: en vez de preguntar "¿es segura?", permite ir requisito por requisito y marcar cumple/no cumple.
- El detalle del catálogo y los recursos de práctica viven en [sec-roadmap](../sec-roadmap/).

## MITRE ATT&CK

El catálogo de tácticas y técnicas que usan los atacantes reales, organizado por fases de la cadena de ataque (la "kill chain"). A diferencia del Top 10 de OWASP, que se enfoca en vulnerabilidades de aplicaciones web, ATT&CK cubre el ciclo completo de un ataque, incluyendo qué hace el atacante _después_ de entrar.

- **Tácticas** — el _objetivo_ del atacante en cada fase: initial access (cómo entra por primera vez), execution (cómo corre código en el sistema), persistence (cómo se asegura de seguir teniendo acceso aunque reinicien la máquina), privilege escalation (cómo pasa de usuario limitado a administrador), lateral movement (cómo salta de una máquina a otra dentro de la red), exfiltration (cómo saca los datos), etc.
- **Técnicas** — el _cómo_ de cada táctica: phishing para lograr acceso inicial, explotación de una vulnerabilidad conocida, abuso de credenciales válidas robadas previamente. Cada técnica tiene un ID (ej. T1566 para phishing) que sirve como referencia estándar entre herramientas y reportes.
- **Para qué sirve** — da un lenguaje común entre ataque y defensa: los equipos defensivos (blue team) mapean sus reglas de detección contra el catálogo para ver qué técnicas _no_ están cubiertas, y los equipos ofensivos (red team) lo usan para planificar simulacros de ataque con cobertura completa en vez de probar siempre lo mismo.

## Threat Modeling (STRIDE)

El método para anticipar amenazas _antes_ de que exista el sistema o el feature, en vez de esperar a que algo pase para reaccionar. En la práctica se dibuja un diagrama simple de los componentes del sistema y cómo fluyen los datos entre ellos (usuario → API → base de datos, por ejemplo), y para cada flecha del diagrama se pregunta: ¿qué podría salir mal acá?

**STRIDE** (creado en Microsoft) da una checklist de seis categorías de amenaza, cada una asociada a la propiedad de seguridad que rompe:

| Letra | Amenaza                | Qué viola              | Ejemplo típico                                                        |
| ----- | ---------------------- | ---------------------- | --------------------------------------------------------------------- |
| S     | Spoofing               | Autenticidad           | Alguien se hace pasar por otro usuario o servicio                     |
| T     | Tampering              | Integridad             | Modificar datos en tránsito o en la base                              |
| R     | Repudiation            | No-repudio (auditoría) | Un usuario niega haber hecho una acción y no hay log que lo desmienta |
| I     | Information disclosure | Confidencialidad       | Datos que se filtran a quien no debería verlos                        |
| D     | Denial of Service      | Disponibilidad         | El sistema deja de responder por sobrecarga o ataque                  |
| E     | Elevation of privilege | Autorización           | Un usuario común logra ejecutar acciones de administrador             |

La idea es recorrer cada componente y cada flujo de datos del diagrama contra las seis letras: no todas aplican siempre, pero forzar la pregunta evita el punto ciego de "nunca se me ocurrió pensar en eso".

### Threat modeling para DevOps

El pipeline de software (CI/CD, registries, dependencias) es también una superficie de ataque, y se modela con la misma lógica que la app: ¿qué componentes hay, cómo fluyen el código y los secretos entre ellos, y qué puede salir mal en cada paso?

- **Ataque al registry** — alguien compromete el registry de imágenes (por credenciales robadas o una vulnerabilidad) y publica una imagen maliciosa con el mismo nombre/tag que se usa en producción, de modo que el próximo deploy la baja sin que nadie lo note. Mitigación: firma de imágenes (para verificar que la imagen viene de donde dice) y escaneo de imágenes (para detectar malware o vulnerabilidades antes de desplegar), ver [sec-supplychain](../sec-supplychain/).
- **Pipeline comprometido** — un atacante que gana acceso al sistema de CI/CD puede inyectar código o robar secretos (API keys, credenciales de deploy) en cualquier build futuro, sin tocar el repositorio de código en sí. Es un blanco atractivo porque un solo pipeline comprometido afecta a todos los proyectos que pasan por él. Mitigación: permisos mínimos en el runner (que el pipeline solo pueda acceder a lo estrictamente necesario), secretos protegidos (no quedan en texto plano ni en logs), y revisión de [ops-ci](../../ops/ops-ci/).
- **Dependencia maliciosa** — una dependencia legítima (una librería de npm, pip, etc.) es reemplazada por una versión comprometida que roba secretos o instala una puerta trasera; esto es un supply chain attack, porque el ataque no es directo a tu código sino a algo de lo que tu código depende y en lo que confiás ciegamente. Mitigación: SBOM (Software Bill of Materials, un inventario de qué dependencias y versiones exactas usa el proyecto) y escaneo de dependencias contra bases de vulnerabilidades conocidas, ver [sec-supplychain](../sec-supplychain/).

## Gestión de secretos

Los secretos (tokens, contraseñas, claves de API, certificados) no se pegan en el código ni en el manifiesto de configuración — se gestionan como un recurso aparte, con su propio ciclo de vida y control de acceso.

- **Nunca en git** — commits, repos y logs quedan para siempre, incluso si después se borra el archivo: el historial de git conserva versiones anteriores, y un repo puede haber sido clonado por terceros antes de la corrección. Por eso la regla no es "borrarlo rápido" sino: un secreto subido una vez debe darse por comprometido y rotarse (generar uno nuevo e invalidar el viejo), no solo eliminarse del código.
- **Vault / gestores de secretos** — herramientas (como HashiCorp Vault, AWS Secrets Manager, etc.) donde el secreto se guarda cifrado en reposo y se inyecta en runtime directamente a la aplicación que lo necesita, sin que quede escrito en ningún archivo de configuración. Además llevan auditoría de quién leyó cada secreto y cuándo, lo cual es clave para investigar un incidente. En Kubernetes, el equivalente nativo es la capa de Secrets combinada con RBAC (para controlar qué pods y usuarios pueden leer cada secreto) — ver [ops-kubernetes](../../ops/ops-kubernetes/).

> Los marcos no son teoría decorativa: son la diferencia entre "seguridad por intuición" y "seguridad por cobertura" — saber qué categorías de ataque existen permite buscar activamente las que faltan, en vez de limitarse a las que ya se vieron o a las que un scanner marcó por default.
