---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec Red Team
subtitle: Offensive security learning path
---

Offensive security is the discipline of finding and exploiting weaknesses before a real attacker does. Here's the learning path: the certifications that organize the learning and the platforms where you practice against deliberately vulnerable systems.

## Certifications

| Certification          | Level      | What it covers                                                                   |
| ---------------------- | ---------- | -------------------------------------------------------------------------------- |
| **CCST Cybersecurity** | Entry      | Basic networking concepts, operational security, and device protection           |
| **CompTIA Security+**  | Entry      | Security fundamentals, networking, risk, and operations                          |
| **CompTIA PenTest+**   | Intermediate | Offensive testing: scanning, exploitation, reporting                           |
| **CEH**                | Intermediate | Attack techniques, ethical hacking, tools, and vulnerability mitigation        |
| **CyberOps Associate** | Intermediate | SOC monitoring, log analysis, detection, and incident response                |
| **CISSP**              | Advanced   | Security management, architecture, engineering                                  |

- **CCST Cybersecurity** — the technical entry point: teaches how networks work securely, basic cybersecurity principles, and essential access point protection.
- **Security+** — the starting point: security vocabulary (confidentiality, integrity, availability), basic cryptography, secure networking, and risk management. It's the foundation for any of the others.
- **PenTest+** — moves to practice: planning a pentest, scanning, exploiting vulnerabilities, gaining access, and writing the final report. Complements [sec-tools](../sec-tools/) skills.
- **CEH** — the attacker's perspective: systematic methodologies for simulating cyberattacks, identifying breaches, and understanding offensive tools to strengthen defense.
- **CyberOps Associate** — SOC work: continuous monitoring, security event analysis, data correlation, and rapid operational response to intrusions.
- **CISSP** — the jump to management: it's no longer about exploiting but about designing, operating, and governing an organization's security. It's the certification for those who lead the security function, not those who are at the keyboard.

## Practice Platforms

| Platform            | Profile                   | Use                                              |
| ------------------- | ------------------------- | ------------------------------------------------ |
| **HackTheBox**      | Machines and CTF challenges | Real exploitation against VMs with vulnerabilities |
| **TryHackMe**       | Guided paths              | Step-by-step learning for beginners              |
| **Cyberflow Academy** | Structured training     | Guided courses and labs                          |

- **HackTheBox** — machines with real vulnerabilities to exploit end-to-end: reconnaissance, exploitation, privilege escalation. The standard for realistic practice.
- **TryHackMe** — the gentlest entry point: guided rooms that teach one technique at a time, no need for your own environment.
- **Cyberflow Academy** — more structured training, with courses and labs for those who prefer following a plan rather than solving isolated machines.

> The full learning path is at [sec-roadmap](../sec-roadmap/): offensive practice only makes sense once the networking, systems, and security concept fundamentals are in place.

## Pentest Methodology

1. **Reconnaissance** — information about the target (domains, ports, technologies). See [sec-tools](../sec-tools/).
2. **Scanning and enumeration** — identify services and versions to search for known vulnerabilities.
3. **Exploitation** — use the vulnerability to gain access.
4. **Post-exploitation** — lateral movement, privilege escalation.
5. **Reporting** — document findings, evidence, and remediation.

> Ethics and authorization are part of the discipline: you only attack what you have explicit authorization to attack — the limit isn't technical, it's legal.
