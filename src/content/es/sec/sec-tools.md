---
eyebrow: Sec
title: Sec Tools
subtitle: Herramientas de red team
group: Red Team
order: 4
summary: "Herramientas de red team agrupadas por lo que resuelven: interceptación de tráfico web, reconocimiento y fuzzing, explotación y C2, ataques a Active Directory, scripts helper de flujo de trabajo, librerías de explotación en Python, fingerprinting y crackeo de contraseñas."
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

| Herramienta     | Qué hace                                                   |
| --------------- | ---------------------------------------------------------- |
| **Nmap**        | Escaneo de puertos, servicios y versiones de un objetivo   |
| **Rustscan**    | Escaneo de puertos ultrarrápido que encadena a Nmap        |
| **gobuster**    | Enumeración de directorios, subdominios y DNS              |
| **ffuf**        | Fuzzing de directorios, subdominios y parámetros           |
| **Feroxbuster** | Enumeración de directorios multihilo y recursiva           |
| **Wfuzz**       | Fuzzing de parámetros, headers y rutas por fuerza bruta    |

- **Nmap** es un scanner de red por línea de comandos, el punto de partida de casi todo reconocimiento.
- **Rustscan** barre los 65k puertos en segundos y le pasa los abiertos a Nmap para el detalle de servicios: lo que antes tomaba minutos, ya no.
- **gobuster** es una herramienta de enumeración por fuerza bruta, escrita en Go y optimizada para velocidad.
- **ffuf** es el fuzzer web de referencia: directorios, subdominios, parámetros y headers con wordlists, con resultados filtrables por tamaño o código de estado.
- **Feroxbuster** hace enumeración recursiva multihilo, pensada para aplicaciones con rutas profundas.
- **Wfuzz** es una herramienta de fuzzing web altamente configurable.

## Explotación y C2

| Herramienta               | Qué hace                                       |
| ------------------------- | ---------------------------------------------- |
| **Metasploit Framework**  | Suite de exploits, payloads y post-explotación |
| **Sliver**                | C2 open source con agentes cross-platform      |

- **Metasploit** es la suite de explotación clásica: módulos de exploit por vulnerabilidad, generación de payloads y shellcodes, y una capa de post-explotación — el estándar para ejecutar exploits probados en vez de escribirlos desde cero.
- **Sliver** es un framework de command & control open source (de Bishop Fox): agentes en cualquier plataforma, tráfico cifrado y evasión — la alternativa moderna y self-hostable a Cobalt Strike.

## Active Directory

| Herramienta       | Qué hace                                                    |
| ----------------- | ----------------------------------------------------------- |
| **BloodHound**    | Mapea rutas de escalada de privilegios en Active Directory  |
| **NetExec (nxc)** | Automatiza ataques y post-explotación contra AD             |
| **Responder**     | Envenena LLMNR/NBT-NS para capturar hashes de autenticación |
| **Kerbrute**      | Enumeración de usuarios y fuerza bruta contra Kerberos      |

- **BloodHound** es una herramienta de análisis y visualización de Active Directory (el sistema de gestión de identidades y permisos usado en redes Windows corporativas).
- **NetExec** (antes CrackMapExec, alias `nxc`) es una herramienta de post-explotación y automatización contra redes con Active Directory.
- **Responder** es una herramienta de spoofing de protocolos de resolución de nombres en redes locales (LLMNR y NBT-NS, usados por Windows cuando el DNS normal falla).
- **Kerbrute** es una herramienta de enumeración y fuerza bruta específica para Kerberos, el protocolo de autenticación que usa Active Directory.

## Scripts helper y pwn scripts

Los scripts ligeros que sostienen el flujo de trabajo diario — el formato del `whichSystem.py` popularizado por S4vitar en la comunidad hispanohablante: automatizan una tarea repetitiva específica, no son suites.

| Herramienta                  | Qué hace                                            |
| ---------------------------- | --------------------------------------------------- |
| **chisel / ligolo-ng**       | Pivoting y port forwarding hacia redes internas     |
| **AutoRecon / nmapAutomator**| Recon automatizado: Nmap + enumeración por servicio |
| **linpeas.sh / winpeas.exe** | Enumeración local de vectores de escalada           |
| **pwncat / rlwrap**          | Terminales estables para reverse shells             |
| **evilTrust / wifiCrack**    | Rogue Access Points y auditoría Wi-Fi               |

- **chisel / ligolo-ng** — túneles para llegar a la red interna desde una máquina comprometida: port forwarding clásico (chisel) o un adaptador de red virtual que enruta el tráfico del atacante hacia el segmento inaccesible (ligolo-ng).
- **AutoRecon / nmapAutomator** — toman una IP, corren Nmap con parámetros optimizados en segundo plano y, según los puertos abiertos, lanzan enumeración específica de cada servicio (HTTP, SMB, FTP, SNMP).
- **linPEAS / winPEAS** — se ejecutan en el sistema objetivo tras conseguir un acceso inicial y enumeran todo lo que puede servir para escalar privilegios.
- **pwncat / rlwrap** — arreglan lo peor de una reverse shell: convierten el stream en una terminal interactiva (TTY) con autocompletado y atajos; pwncat además gestiona la sesión.
- **evilTrust / wifiCrack** — scripts en Bash para desplegar APs falsos y capturar credenciales, o para auditar redes Wi-Fi.
- **Funciones en .zshrc / .bashrc** — tradecraft personal: muchos pentesters llevan funciones propias para crear el directorio de trabajo de una máquina, poner la IP de la VPN en polybar/i3, o levantar un servidor HTTP de Python al instante.

## Librerías de explotación (Python)

| Librería             | Qué hace                                                             |
| -------------------- | -------------------------------------------------------------------- |
| **Pwntools**         | Desarrollo de exploits: sockets, packing, shellcodes, CTFs           |
| **Scapy**            | Forja y captura de paquetes a bajo nivel (IP, TCP, UDP, ICMP)        |
| **Impacket**         | Protocolos de Windows: SMB, Kerberos, MSRPC (psexec.py, secretsdump.py) |
| **Requests / httpx** | HTTP desde scripts: fuzzing, fuerza bruta y automatización           |

- **Pwntools** es la librería de facto para CTFs y exploits: interactúa con sockets y procesos locales o remotos, arma payloads con packing de enteros y shellcodes, y maneja los formatos de datos (hex, base64).
- **Scapy** construye, manipula y captura paquetes campo por campo: la base para escáneres y herramientas de red propias, al estilo de lo que hace `whichSystem.py`.
- **Impacket** son clases de Python sobre protocolos de red de Windows: su caja de herramientas (psexec.py, wmiexec.py, secretsdump.py) es estándar en la intrusión en Active Directory.
- **Requests / httpx** resuelven HTTP desde cualquier script: fuzzing de APIs, automatización de payloads y fuerza bruta, sin la complejidad de un proxy completo.

## Fingerprinting y contraseñas

| Herramienta              | Qué hace                                                      |
| ------------------------ | ------------------------------------------------------------- |
| **whatweb / wappalyzer** | Identifica las tecnologías que usa un sitio (CMS, frameworks) |
| **John the Ripper**      | Crackeo de contraseñas desde hashes                           |

- **whatweb** es una herramienta de fingerprinting por línea de comandos, y **wappalyzer** es su equivalente como extensión de navegador.
- **John the Ripper** es una herramienta de crackeo de contraseñas.

> Las herramientas se aprenden sobre el vocabulario del [sec-redteam](../sec-redteam/): cada una sirve una fase de la metodología, y ninguna reemplaza el entendimiento de qué se está atacando y por qué.
