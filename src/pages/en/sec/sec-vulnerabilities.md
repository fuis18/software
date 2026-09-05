---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec Vulnerabilities
subtitle: Common vulnerabilities and OSINT reconnaissance
---

Beyond tools, technique matters: the classic vulnerabilities that get exploited over and over, and the open-source intelligence phase that precedes any attack.

## SQL Injection

The most classic web vulnerability: user input is directly interpolated into a SQL query, and the attacker injects code to alter the query.

- **Classic payloads** — `' OR '1'='1` to bypass authentication (the condition is always true); `' UNION SELECT ...` to combine results from other tables; comments (`--`, `#`) to truncate the original query and neutralize the rest.
- **Why it works** — the app builds the query by concatenating input without parameterizing: the input stops being a value and becomes part of the statement.
- **The defense** — parameterized queries / prepared statements: input always travels as data, never as code. See the injection category in [sec-roadmap](../sec-roadmap/) (OWASP Top 10).
- **Practice** — the standard for exploiting and understanding SQLi in a lab is PortSwigger Web Security Academy and OWASP Juice Shop, both in [sec-roadmap](../sec-roadmap/).

## Hash Handling

Passwords are never stored in plaintext: they're stored as hashes. An attacker who steals a hash database faces recovering the original value.

- **Identify the type** — the first step is knowing what hash you're dealing with: hashcat and John (see [sec-tools](../sec-tools/)) can identify it by format.
- **Attacks** — dictionary (trying known words against the hash), brute force (all combinations), and rainbow tables (precomputed hashes) against unsalted hashes.
- **Salt matters** — a hashed value with salt (a random value per user) renders rainbow tables useless and makes each hash an individual brute force problem.

## OSINT (Open Source Intelligence)

Public information about the target, gathered before touching anything — the passive reconnaissance phase of [sec-redteam](../sec-redteam/).

| Resource       | What it allows                                    |
| -------------- | ------------------------------------------------- |
| **phonebook.cz** | Search emails and subdomains for a domain       |
| **country.is**   | Geolocate an IP address                         |

- **phonebook.cz** — given a domain, lists associated emails (useful for enumerating users and testing credentials) and known subdomains (additional attack surface).
- **country.is** — given an IP, shows what country it belongs to: useful for knowing where the target is hosted and what jurisdiction applies.

> OSINT is the reminder that much of an attack's information is already published: security doesn't start at the firewall, it starts with how much leaks outward unintentionally.
