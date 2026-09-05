---
layout: ../../../layouts/Layout.astro
title: Sec
subtitle: Network, system, and supply chain security
---

Network, system, and software supply chain security: the learning path and offensive red team tools (reconnaissance, exploitation, lateral movement), networking fundamentals and automation, container and pipeline security, static code analysis, identity management (IAM), and a personal privacy and self-hosting stack.

## Security Concepts

### [sec-roadmap](sec-roadmap/)

Learning path and security architecture: the order of learning, OWASP Top 10 with official resources, and practice with OWASP Juice Shop and PortSwigger Web Security Academy.

### [sec-threatconcepts](sec-threatconcepts/)

Security conceptual frameworks: OWASP, MITRE ATT&CK, threat modeling with STRIDE, and secrets management.

## Red Team

### [sec-redteam](sec-redteam/)

Offensive security learning path: certifications (CompTIA Security+, CompTIA PenTest+, CISSP) and practice platforms (HackTheBox, TryHackMe, Cyberflow Academy).

### [sec-tools](sec-tools/)

Red team tools: Burp Suite and OWASP ZAP/Caido/FoxyProxy for web traffic interception, Wfuzz/gobuster for fuzzing, Nmap for reconnaissance, BloodHound/CrackMapExec/NetExec/Responder/Kerbrute for Active Directory attacks, whatweb/wappalyzer for fingerprinting, and John the Ripper for password cracking.

### [sec-vulnerabilities](sec-vulnerabilities/)

Common vulnerabilities and exploitation techniques: SQL injection with classic payloads, hash handling, and OSINT reconnaissance (phonebook.cz for emails/subdomains, country.is for IP geolocation).

## DevSecOps

### [sec-sast](sec-sast/)

Static and dynamic code analysis: SonarQube with quality gates, Semgrep and CodeQL for SAST, and OWASP ZAP as DAST in the pipeline.

### [sec-supplychain](sec-supplychain/)

Software supply chain security: SBOM with Syft/CycloneDX, image scanning with Trivy/Grype, artifact signing with Cosign/Sigstore, and reproducible builds with the SLSA framework.

### [sec-runtime](sec-runtime/)

Runtime security: syscall, process, and suspicious access monitoring with Falco and Sysdig, and Kubernetes security policies (rootless containers, signed images, resource limits) with Kyverno and OPA Gatekeeper.

### [sec-iam](sec-iam/)

Identity and access management: what IAM is, and the path to AWS Security Specialty certification.

## Network and Privacy

### [sec-network](sec-network/)

Networking fundamentals and automation: TCP/IP, switching, routing, firewall, VPN, DNS, HTTP, FTP/SFTP, SSL/TLS, SSH, analysis with Wireshark and NetFlow (softflowd, nfdump, SiLK, Akvorado), CCNA and DevNet learning path (with sandbox), automation with Netmiko and NAPALM, and Cisco platforms like Meraki and DNA Center.

### [sec-privacy](sec-privacy/)

Personal privacy and self-hosting stack: nginx as proxy, SearXNG as private search engine, Matrix for messaging, CardDAV/CalDAV for contacts and calendar, email on OpenBSD (Postfix/OpenSMTPD), and Mullvad Browser.
