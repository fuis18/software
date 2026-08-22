---
layout: ../../layouts/Layout.astro
eyebrow: Sec
title: Sec Tools
subtitle: Herramientas de red team
---

El kit de la seguridad ofensiva: cada fase del pentest tiene su herramienta. Acá están las de uso frecuente, agrupadas por lo que resuelven — para cada una se explica qué es y qué hace, no solo el nombre.

## Intercepción de tráfico web

| Herramienta    | Qué hace                                                        |
| -------------- | --------------------------------------------------------------- |
| **Burp Suite** | Proxy de intercepción web: captura, modifica y reenvía requests |
| **OWASP ZAP**  | Proxy y scanner open source de la comunidad OWASP               |
| **Caido**      | Proxy web moderno y liviano, alternativa open source a Burp     |
| **FoxyProxy**  | Gestor de proxies en el navegador para alternar entre ellos     |

- **Burp Suite** es una suite de herramientas para testing de aplicaciones web con un proxy de intercepción en el centro.
- **OWASP ZAP** (Zed Attack Proxy) es el equivalente libre de Burp mantenido por OWASP: proxy de intercepción, spider, escáner pasivo/activo y fuzzer — ideal para aprender sin licencia y para automatizar escaneos DAST en un pipeline.
- **Caido** es un proxy de intercepción web moderno y open source, pensado como alternativa liviana a Burp.
- **FoxyProxy** es una extensión de navegador para gestión de proxies.

## Reconocimiento y fuzzing

| Herramienta  | Qué hace                                                 |
| ------------ | -------------------------------------------------------- |
| **Nmap**     | Escaneo de puertos, servicios y versiones de un objetivo |
| **Wfuzz**    | Fuzzing de parámetros, headers y rutas por fuerza bruta  |
| **gobuster** | Enumeración de directorios, subdominios y DNS            |

- **Nmap** es un scanner de red por línea de comandos, el punto de partida de casi todo reconocimiento.
- **gobuster** es una herramienta de enumeración por fuerza bruta, escrita en Go y optimizada para velocidad.
- **Wfuzz** es una herramienta de fuzzing web altamente configurable.

## Active Directory

| Herramienta    | Qué hace                                                    |
| -------------- | ----------------------------------------------------------- |
| **BloodHound** | Mapea rutas de escalada de privilegios en Active Directory  |
| **NetExec**    | Automatiza ataques y post-explotación contra AD             |
| **Responder**  | Envenena LLMNR/NBT-NS para capturar hashes de autenticación |
| **Kerbrute**   | Enumeración de usuarios y fuerza bruta contra Kerberos      |

- **BloodHound** es una herramienta de análisis y visualización de Active Directory (el sistema de gestión de identidades y permisos usado en redes Windows corporativas).
- **NetExec** es una herramienta de post-explotación y automatización contra redes con Active Directory.
- **Responder** es una herramienta de spoofing de protocolos de resolución de nombres en redes locales (LLMNR y NBT-NS, usados por Windows cuando el DNS normal falla).
- **Kerbrute** es una herramienta de enumeración y fuerza bruta específica para Kerberos, el protocolo de autenticación que usa Active Directory.

## Fingerprinting y contraseñas

| Herramienta              | Qué hace                                                      |
| ------------------------ | ------------------------------------------------------------- |
| **whatweb / wappalyzer** | Identifica las tecnologías que usa un sitio (CMS, frameworks) |
| **John the Ripper**      | Crackeo de contraseñas desde hashes                           |

- **whatweb** es una herramienta de fingerprinting por línea de comandos, y **wappalyzer** es su equivalente como extensión de navegador.
- **John the Ripper** es una herramienta de crackeo de contraseñas.

> Las herramientas se aprenden sobre el vocabulario del [sec-redteam](../sec-redteam/): cada una sirve una fase de la metodología, y ninguna reemplaza el entendimiento de qué se está atacando y por qué.
