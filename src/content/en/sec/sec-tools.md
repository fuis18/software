---
eyebrow: Sec
title: Sec Tools
subtitle: Red team tools
group: Red Team
order: 4
summary: "Red team tools grouped by what they solve: web traffic interception, reconnaissance and fuzzing, exploitation and C2, Active Directory attacks, workflow helper scripts, Python exploitation libraries, fingerprinting, and password cracking."
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

| Tool            | What it does                                                |
| --------------- | ----------------------------------------------------------- |
| **Nmap**        | Port, service, and version scanning of a target             |
| **Rustscan**    | Ultrafast port scanning in Rust that chains into Nmap        |
| **gobuster**    | Directory, subdomain, and DNS enumeration                   |
| **ffuf**        | Directory, subdomain, and parameter fuzzing                 |
| **Feroxbuster** | Multithreaded, recursive directory enumeration              |
| **Wfuzz**       | Parameter, header, and path fuzzing via brute force         |

- **Nmap** is a command-line network scanner, the starting point for almost all reconnaissance.
- **Rustscan** sweeps all 65k ports in seconds and hands the open ones to Nmap for service detail: what used to take minutes no longer does.
- **gobuster** is a brute-force enumeration tool, written in Go and optimized for speed.
- **ffuf** is the go-to web fuzzer: directories, subdomains, parameters, and headers with wordlists, with results filterable by size or status code.
- **Feroxbuster** does multithreaded recursive enumeration, built for applications with deep route structures.
- **Wfuzz** is a highly configurable web fuzzing tool.

## Exploitation and C2

| Tool                     | What it does                                       |
| ------------------------ | -------------------------------------------------- |
| **Metasploit Framework** | Exploit suite: payloads, and post-exploitation     |
| **Sliver**               | Open source C2 with cross-platform agents          |

- **Metasploit** is the classic exploitation suite: exploit modules per vulnerability, payload and shellcode generation, and a post-exploitation layer — the standard for running proven exploits instead of writing them from scratch.
- **Sliver** is an open source command & control framework (by Bishop Fox): agents on any platform, encrypted traffic, and evasion — the modern, self-hostable alternative to Cobalt Strike.

## Active Directory

| Tool            | What it does                                                  |
| --------------- | ------------------------------------------------------------- |
| **BloodHound**  | Maps privilege escalation paths in Active Directory           |
| **NetExec (nxc)** | Automates attacks and post-exploitation against AD          |
| **Responder**   | Poisons LLMNR/NBT-NS to capture authentication hashes        |
| **Kerbrute**    | User enumeration and brute force against Kerberos            |

- **BloodHound** is an Active Directory analysis and visualization tool (the identity and permissions management system used in corporate Windows networks).
- **NetExec** (formerly CrackMapExec, alias `nxc`) is a post-exploitation and automation tool for networks with Active Directory.
- **Responder** is a local network name resolution protocol spoofing tool (LLMNR and NBT-NS, used by Windows when normal DNS fails).
- **Kerbrute** is an enumeration and brute force tool specific to Kerberos, the authentication protocol used by Active Directory.

## Helper and Pwn Scripts

The lightweight scripts that support the daily pentest workflow — the format of `whichSystem.py`, popularized by S4vitar in the Spanish-speaking community: they automate one specific repetitive task, they're not suites.

| Tool                         | What it does                                           |
| ---------------------------- | ------------------------------------------------------ |
| **chisel / ligolo-ng**       | Pivoting and port forwarding into internal networks    |
| **AutoRecon / nmapAutomator**| Automated recon: Nmap + per-service enumeration        |
| **linpeas.sh / winpeas.exe** | Local enumeration of privilege escalation vectors      |
| **pwncat / rlwrap**          | Stable terminals for reverse shells                    |
| **evilTrust / wifiCrack**    | Rogue Access Points and Wi-Fi auditing                 |

- **chisel / ligolo-ng** — tunnels to reach the internal network from a compromised machine: classic port forwarding (chisel) or a virtual network adapter that routes the attacker's traffic into the unreachable segment (ligolo-ng).
- **AutoRecon / nmapAutomator** — take an IP, run Nmap with optimized flags in the background, and, based on the open ports, launch per-service enumeration (HTTP, SMB, FTP, SNMP).
- **linPEAS / winpeas** — run on the target system after gaining initial access and enumerate everything that can be used to escalate privileges.
- **pwncat / rlwrap** — fix the worst part of a reverse shell: they turn the stream into an interactive terminal (TTY) with tab completion and shortcuts; pwncat also manages the session.
- **evilTrust / wifiCrack** — Bash scripts to deploy rogue access points and capture credentials, or to audit Wi-Fi networks.
- **Custom functions in .zshrc / .bashrc** — personal tradecraft: many pentesters keep their own functions to create a machine's working directory, put the VPN IP on polybar/i3, or spin up a Python HTTP server instantly.

## Exploitation Libraries (Python)

| Library              | What it does                                                            |
| -------------------- | ----------------------------------------------------------------------- |
| **Pwntools**         | Exploit development: sockets, packing, shellcodes, CTFs                 |
| **Scapy**            | Low-level packet crafting and capture (IP, TCP, UDP, ICMP)              |
| **Impacket**         | Windows protocols: SMB, Kerberos, MSRPC (psexec.py, secretsdump.py)     |
| **Requests / httpx** | HTTP from scripts: fuzzing, brute force, and automation                 |

- **Pwntools** is the de facto library for CTFs and exploits: it interacts with local or remote sockets and processes, builds payloads with integer packing and shellcodes, and handles data formats (hex, base64).
- **Scapy** builds, manipulates, and captures packets field by field: the foundation for custom scanners and network tools, in the spirit of what `whichSystem.py` does.
- **Impacket** is a set of Python classes for Windows network protocols: its toolbox (psexec.py, wmiexec.py, secretsdump.py) is the standard for Active Directory intrusions.
- **Requests / httpx** handle HTTP from any script: API fuzzing, payload automation, and brute force, without the complexity of a full proxy.

## Fingerprinting and Passwords

| Tool                    | What it does                                                    |
| ----------------------- | --------------------------------------------------------------- |
| **whatweb / wappalyzer** | Identifies technologies used by a site (CMS, frameworks)        |
| **John the Ripper**     | Password cracking from hashes                                   |

- **whatweb** is a command-line fingerprinting tool, and **wappalyzer** is its browser extension equivalent.
- **John the Ripper** is a password cracking tool.

> Tools are learned on top of the [sec-redteam](../sec-redteam/) vocabulary: each one serves a phase of the methodology, and none replaces understanding what is being attacked and why.
