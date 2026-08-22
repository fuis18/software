---
layout: ../../layouts/Layout.astro
eyebrow: Sec
title: Sec Red Team
subtitle: Camino formativo en seguridad ofensiva
---

La seguridad ofensiva es la disciplina de encontrar y explotar debilidades antes de que lo haga un atacante real. Acá está el camino formativo: las certificaciones que ordenan el aprendizaje y las plataformas donde se practica contra sistemas deliberadamente vulnerables.

## Certificaciones

| Certificación        | Nivel           | Qué cubre                                            |
| -------------------- | --------------- | ---------------------------------------------------- |
| **CompTIA Security+** | Entrada         | Fundamentos de seguridad, redes, riesgo y operaciones |
| **CompTIA PenTest+**  | Intermedio      | Testing ofensivo: escaneo, explotación, reporte       |
| **CISSP**             | Avanzado        | Gestión de seguridad, arquitectura, ingeniería       |

- **Security+** — el punto de partida: el vocabulario de la seguridad (confidencialidad, integridad, disponibilidad), criptografía básica, redes seguras y gestión de riesgo. Es la base para cualquiera de las otras.
- **PenTest+** — pasa a la práctica: planificar un pentest, escanear, explotar vulnerabilidades, ganar acceso y escribir el reporte final. Complementa las habilidades de [sec-tools](../sec-tools/).
- **CISSP** — el salto a la gestión: ya no se trata de explotar sino de diseñar, operar y gobernar la seguridad de una organización. Es la certificación de quien dirige la función de seguridad, no de quien está en el teclado.

## Plataformas de práctica

| Plataforma         | Perfil                        | Uso                                                        |
| ------------------ | ----------------------------- | ---------------------------------------------------------- |
| **HackTheBox**     | Máquinas y challenges CTF      | Explotación real contra VMs con vulnerabilidades           |
| **TryHackMe**      | Caminos guiados               | Aprendizaje paso a paso para principiantes                 |
| **Cyberflow Academy** | Formación estructurada     | Cursos y laboratorios guiados                              |

- **HackTheBox** — máquinas con vulnerabilidades reales para explotar de punta a punta: reconocimiento, explotación, escalada de privilegios. El estándar para practicar de forma realista.
- **TryHackMe** — el punto de entrada más suave: salas guiadas que enseñan una técnica a la vez, sin necesitar un entorno propio.
- **Cyberflow Academy** — formación más estructurada, con cursos y labs para quien prefiere seguir un plan en vez de resolver máquinas sueltas.

> El orden de aprendizaje completo está en [sec-roadmap](../sec-roadmap/): la práctica ofensiva solo tiene sentido una vez que están los fundamentos de red, sistemas y conceptos de seguridad.

## Metodología del pentest

1. **Reconocimiento** — información sobre el objetivo (dominios, puertos, tecnologías). Ver [sec-tools](../sec-tools/).
2. **Escaneo y enumeración** — identificar servicios y versiones para buscar vulnerabilidades conocidas.
3. **Explotación** — usar la vulnerabilidad para ganar acceso.
4. **Post-explotación** — moverse lateralmente, escalar privilegios.
5. **Reporte** — documentar hallazgos, evidencia y remediación.

> La ética y el permiso son parte de la disciplina: solo se ataca lo que se tiene autorización explícita de atacar — el límite no es técnico, es legal.