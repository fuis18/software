---
layout: ../../../layouts/Layout.astro
eyebrow: Sec
title: Sec SAST
subtitle: Análisis estático de código y calidad
---

El análisis estático (SAST, Static Application Security Testing) revisa el **código fuente sin ejecutarlo**: encuentra vulnerabilidades, bugs y malas prácticas antes de que el software se construya — el eslabón más temprano de [sec-supplychain](../sec-supplychain/).

## SonarQube

La plataforma de referencia para análisis estático: combina calidad de código y seguridad en una sola evaluación continua.

| Concepto        | Qué hace                                                          |
| --------------- | ----------------------------------------------------------------- |
| **SonarQube**   | Servidor que analiza el código y acumula métricas por proyecto    |
| **Quality Gate**| Umbral objetivo: el pipeline falla si el código no lo cumple       |
| **SonarLint**   | Extensión del IDE que aplica las mismas reglas mientras se escribe |

- **Qué analiza** — bugs, vulnerabilidades, code smells, duplicación y cobertura de tests, en más de 30 lenguajes.
- **Cómo funciona** — el pipeline corre `sonar-scanner` en la fase Scan de [ops-ci](../../ops/ops-ci/); los resultados suben al servidor, que compara contra la versión anterior y decide si el Quality Gate pasa.
- **Quality Gates como política** — "no se mergea nada con vulnerabilidades críticas ni cobertura decreciente" deja de ser un acuerdo verbal y se vuelve un bloqueo automático.
- **Alternativa gestionada** — SonarCloud ofrece el mismo servicio SaaS para repos públicos y open source.

## Otras herramientas

| Herramienta  | Qué hace                                                            |
| ------------ | -------------------------------------------------------------------- |
| **Semgrep**  | Reglas simples sobre patrones de código, rápido y fácil de extender  |
| **CodeQL**   | Consultas SQL-like sobre el código tratado como base de datos        |

- **Semgrep** define reglas legibles (patrón → alerta) sin entender el compilador completo: ideal para escribir reglas propias de patrones peligrosos específicos del proyecto.
- **CodeQL** (GitHub) convierte el código en una base de datos consultable: permite buscar variantes de una misma vulnerabilidad en todo el repositorio con una sola query.

## DAST: la contraparte dinámica

SAST mira el código; DAST (Dynamic AST) ataca la aplicación **corriendo**: envía payloads reales contra una instancia desplegada y observa las respuestas.

- **OWASP ZAP** en modo headless o Burp Suite Enterprise son los estándar DAST; se ejecutan contra el entorno de staging dentro del pipeline.
- **Complemento, no sustituto** — SAST encuentra dónde está la línea de código vulnerable; DAST confirma que es explotable desde afuera. El vocabulario ofensivo de ambas está en [sec-vulnerabilities](../sec-vulnerabilities/).

> La progresión natural: SonarLint en el IDE → SonarQube/Semgrep en cada PR → escaneo de imágenes con Trivy ([sec-supplychain](../sec-supplychain/)) → DAST contra staging. Cada capa atrapa lo que la anterior no vio.
