---
layout: ../../layouts/Layout.astro
title: Sec
subtitle: Seguridad de redes, sistemas y cadena de suministro
---

Seguridad de redes, sistemas y de la cadena de suministro de software: el camino formativo y las herramientas ofensivas de red team (reconocimiento, explotación, movimiento lateral), los fundamentos de networking y su automatización, la seguridad de contenedores y pipelines, gestión de identidades (IAM), y un stack propio de privacidad y self-hosting.

## Red Team

### [sec-redteam](sec-redteam/)

Camino formativo en seguridad ofensiva: certificaciones (CompTIA Security+, CompTIA PenTest+, CISSP) y plataformas de práctica (HackTheBox, TryHackMe, Cyberflow Academy).

### [sec-tools](sec-tools/)

Herramientas de red team: Burp Suite y Caido/FoxyProxy para interceptar tráfico web, Wfuzz/gobuster para fuzzing, Nmap para reconocimiento, BloodHound/CrackMapExec/NetExec/Responder/Kerbrute para atacar Active Directory, whatweb/wappalyzer para fingerprinting, y John the Ripper para crackear contraseñas.

### [sec-vulnerabilities](sec-vulnerabilities/)

Vulnerabilidades comunes y técnicas de explotación: inyección SQL con payloads clásicos, manejo de hashes, y reconocimiento OSINT (phonebook.cz para correos/subdominios, country.is para geolocalización de IP).

## Conceptos de Seguridad

### [sec-threatconcepts](sec-threatconcepts/)

Marcos conceptuales de seguridad: OWASP, MITRE ATT&CK, threat modeling con STRIDE, y gestión de secretos.

## DevSecOps

### [sec-supplychain](sec-supplychain/)

Seguridad de la cadena de suministro de software: SBOM con Syft/CycloneDX, escaneo de imágenes con Trivy/Grype, firma de artefactos con Cosign/Sigstore, y builds reproducibles con el framework SLSA.

### [sec-runtime](sec-runtime/)

Seguridad en tiempo de ejecución: monitoreo de syscalls, procesos y accesos sospechosos con Falco y Sysdig, y políticas de seguridad en Kubernetes (contenedores sin root, imágenes firmadas, límites de recursos) con Kyverno y OPA Gatekeeper.

### [sec-iam](sec-iam/)

Gestión de identidades y accesos: qué es IAM, y el camino hacia la certificación AWS Security Specialty.

## Red y Privacidad

### [sec-network](sec-network/)

Fundamentos de networking y su automatización: TCP/IP, switching, routing, firewall, VPN, DNS, HTTP, FTP/SFTP, SSL/TLS, SSH, análisis con Wireshark, el camino CCNA y DevNet (con su sandbox), automatización con Netmiko y NAPALM, y plataformas Cisco como Meraki y DNA Center.

### [sec-privacy](sec-privacy/)

Stack propio de privacidad y self-hosting: nginx como proxy, SearXNG como buscador privado, Matrix para mensajería, CardDAV/CalDAV para contactos y calendario, correo sobre OpenBSD (Postfix/OpenSMTPD), y Mullvad Browser.
