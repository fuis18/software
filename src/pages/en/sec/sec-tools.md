---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec Tools
subtitle: Red team tools
---

The offensive security toolkit: every pentest phase has its tool. Here are the frequently used ones, grouped by what they solve — for each one, an explanation of what it is and what it does, not just the name.

## Web Traffic Interception

| Tool          | What it does                                                      |
| ------------- | ----------------------------------------------------------------- |
| **Burp Suite** | Web interception proxy: captures, modifies, and forwards requests |
| **OWASP ZAP**  | Open source proxy and scanner from the OWASP community           |
| **Caido**      | Modern, lightweight web proxy, open source alternative to Burp   |
| **FoxyProxy**  | Browser proxy manager for switching between proxies              |

- **Burp Suite** is a web application testing suite with an interception proxy at its core.
- **OWASP ZAP** (Zed Attack Proxy) is the free equivalent of Burp maintained by OWASP: interception proxy, spider, passive/active scanner, and fuzzer — ideal for learning without a license and for automating DAST scans in a pipeline.
- **Caido** is a modern, open source web interception proxy, designed as a lightweight alternative to Burp.
- **FoxyProxy** is a browser extension for proxy management.

## Reconnaissance and Fuzzing

| Tool        | What it does                                               |
| ----------- | ---------------------------------------------------------- |
| **Nmap**    | Port, service, and version scanning of a target            |
| **Wfuzz**   | Parameter, header, and path fuzzing via brute force        |
| **gobuster** | Directory, subdomain, and DNS enumeration                 |

- **Nmap** is a command-line network scanner, the starting point for almost all reconnaissance.
- **gobuster** is a brute-force enumeration tool, written in Go and optimized for speed.
- **Wfuzz** is a highly configurable web fuzzing tool.

## Active Directory

| Tool          | What it does                                                  |
| ------------- | ------------------------------------------------------------- |
| **BloodHound** | Maps privilege escalation paths in Active Directory          |
| **NetExec**    | Automates attacks and post-exploitation against AD           |
| **Responder**  | Poisons LLMNR/NBT-NS to capture authentication hashes       |
| **Kerbrute**   | User enumeration and brute force against Kerberos            |

- **BloodHound** is an Active Directory analysis and visualization tool (the identity and permissions management system used in corporate Windows networks).
- **NetExec** is a post-exploitation and automation tool for networks with Active Directory.
- **Responder** is a local network name resolution protocol spoofing tool (LLMNR and NBT-NS, used by Windows when normal DNS fails).
- **Kerbrute** is an enumeration and brute force tool specific to Kerberos, the authentication protocol used by Active Directory.

## Fingerprinting and Passwords

| Tool                    | What it does                                                    |
| ----------------------- | --------------------------------------------------------------- |
| **whatweb / wappalyzer** | Identifies technologies used by a site (CMS, frameworks)       |
| **John the Ripper**     | Password cracking from hashes                                   |

- **whatweb** is a command-line fingerprinting tool, and **wappalyzer** is its browser extension equivalent.
- **John the Ripper** is a password cracking tool.

> Tools are learned on top of the [sec-redteam](../sec-redteam/) vocabulary: each one serves a phase of the methodology, and none replaces understanding what is being attacked and why.
