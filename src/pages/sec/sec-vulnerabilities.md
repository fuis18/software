---
layout: ../../layouts/Layout.astro
eyebrow: Sec
title: Sec Vulnerabilities
subtitle: Vulnerabilidades comunes y reconocimiento OSINT
---

Más allá de las herramientas, importa la técnica: las vulnerabilidades clásicas que se explotan una y otra vez, y la fase de inteligencia de fuentes abiertas que antecede a cualquier ataque.

## Inyección SQL

La vulnerabilidad web más clásica: el input del usuario se interpola directamente en una consulta SQL, y el atacante inyecta código para alterar la consulta.

- **Payloads clásicos** — `' OR '1'='1` para evadir autenticación (la condición siempre es verdadera); `' UNION SELECT ...` para combinar resultados de otras tablas; comentarios (`--`, `#`) para truncar la consulta original y neutralizar el resto.
- **Por qué funciona** — la app arma la query concatenando el input sin parametrizar: el input deja de ser un valor y pasa a ser parte de la instrucción.
- **La defensa** — consultas parametrizadas / prepared statements: el input viaja siempre como dato, nunca como código. Ver la categoría de inyección en [sec-roadmap](../sec-roadmap/) (OWASP Top 10).
- **Práctica** — el estándar para explotar y entender SQLi en laboratorio es PortSwigger Web Security Academy y OWASP Juice Shop, ambos en [sec-roadmap](../sec-roadmap/).

## Manejo de hashes

Las contraseñas nunca se guardan en claro: se guardan como hashes. El atacante que roba una base de hashes se enfrenta a recuperar el valor original.

- **Identificar el tipo** — el primer paso es saber con qué hash se está: hashcat y John (ver [sec-tools](../sec-tools/)) permiten identificarlo por su formato.
- **Ataques** — diccionario (probar palabras conocidas contra el hash), fuerza bruta (todas las combinaciones), y tablas rainbow (hashes precomputados) contra hashes sin salt.
- **El salt importa** — un hash con salt (valor aleatorio por usuario) vuelve inútiles las tablas rainbow y hace cada hash un problema de fuerza bruta individual.

## OSINT (Open Source Intelligence)

Información pública sobre el objetivo, recogida antes de tocar nada — la fase de reconocimiento pasivo de [sec-redteam](../sec-redteam/).

| Recurso          | Qué permite                                   |
| ---------------- | --------------------------------------------- |
| **phonebook.cz** | Buscar correos y subdominios de un dominio    |
| **country.is**   | Geolocalizar una dirección IP                |

- **phonebook.cz** — dado un dominio, lista los correos asociados (útiles para enumerar usuarios y probar credenciales) y los subdominios conocidos (superficie de ataque adicional).
- **country.is** — dado una IP, muestra de qué país es: útil para saber dónde está alojado el objetivo y qué jurisprudencia aplica.

> El OSINT es el recordatorio de que mucha de la información de un ataque ya está publicada: la seguridad no empieza en el firewall, empieza en cuánto se filtra hacia afuera sin querer.