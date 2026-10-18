---
layout: ../../../layouts/Layout.astro
eyebrow: IA
title: Recursos de IA
subtitle: Herramientas, skills/MCP y cursos
---

Recursos prácticos: herramientas, skills para agentes, referencias MCP y cursos curated.

## 1. Herramientas

- **[NotebookLM](https://notebooklm.google.com/)** — Investigación "grounded": subes tus fuentes y responde citándolas, con resúmenes en audio. Para estudiar papers y documentos sin perderte entre ellos.
- **[Context7](https://context7.com/)** — Docs de librerías siempre actualizadas a la versión real instalada; se usa vía `npx ctx7 setup` o como servidor MCP. El antídoto contra la documentación desactualizada de tu LLM.
- **[awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)** — Lista curada de servidores MCP: el punto de partida para descubrir qué ya está conectado antes de escribir el tuyo.
- **[skills.sh](https://skills.sh/)** — Marketplace de skills para agentes: descubrimiento e instalación con `npx skills add owner/repo`.
- **[skillspector](https://github.com/NVIDIA/skillspector)** — Escáner de seguridad de NVIDIA que revisa un skill antes de instalarlo. El hábito que evita sorpresas al añadir skills de terceros.

## 2. Skills y MCP

- **[skills.sh](https://skills.sh/)** — Instalación con `npx skills add owner/repo`, sobre el estándar SKILL.md: skills portables entre agentes que hablen el mismo formato.
- **[autoskills](https://github.com/cybersaksham/autoskills)** — Genera e instala skills con `npx autoskills@latest` sin escribir el SKILL.md a mano.
- **[Uncodixfy](https://github.com/cyxzdev/Uncodixfy)** — Skill instalable con `npx skills add cyxzdev/Uncodixfy`.
- **[HyperFrames skills](https://github.com/heygen-com/hyperframes)** — Skills de HyperFrames para vídeo agent-native; se instalan con `npx skills add heygen-com/hyperframes --full-depth`. Ver [ai-usage](../ai-usage/).
- **[Context7 MCP](https://context7.com/docs/resources/all-clients)** — Configuración de Context7 por cliente (header auth o `--api-key`) para conectarlo a tu editor o agente.

## 3. Cursos

### MCP

- **[Learn MCP! For Beginners + Create Our First MCP From Scratch](https://www.youtube.com/watch?v=wnHczxwukYY)** — Intro práctica en inglés: construyes tu primer MCP desde cero.
- **[7 MCP que mejoran tu IA para programar](https://www.youtube.com/watch?v=NNICQKFS3TU)** — En español: MCPs concretos que mejoran tu IA para programar.

### n8n

- **[Curso de N8N desde CERO (completo)](https://www.youtube.com/watch?v=4eRPQmzO_Nw)** — Curso completo en español desde cero.
- **[Curso completo de N8N, aprende N8N ahora!](https://www.youtube.com/watch?v=8A8PyJeQhlo)** — Introducción en español al completo.
- **[Aprende n8n AHORA! curso gratis desde cero](https://www.youtube.com/watch?v=T3LNPmYp980)** — Curso gratuito en español desde cero.
- **[Introducción a N8N, automatiza tus flujos de trabajo](https://www.youtube.com/watch?v=yP0PM-fpnXo)** — Enfocado en automatizar flujos de trabajo, en español.
- **[Curso Completo De N8N: Cómo Crear y Vender Automatizaciones IA](https://www.youtube.com/watch?v=7Z-vRvIUqNs)** — En español, con enfoque en monetizar automatizaciones.
- **[Instala n8n LOCAL y GRATIS con Docker](https://www.youtube.com/watch?v=BfFkNou9m7k)** — Guía práctica para montar n8n en tu propia máquina con Docker, sin depender de la nube.
- **[Utiliza n8n Con Modelos Locales (Privado y Gratuito!)](https://www.youtube.com/watch?v=wd4voMPEOGg)** — n8n conectado a modelos locales: flujos privados y sin coste de API.

### LLMs desde cero

- **[Build a Large Language Model (From Scratch)](https://github.com/rasbt/LLMs-from-scratch)** — Libro/repositorio que construye un LLM completo paso a paso, matemáticas incluidas. El complemento teórico-práctico para [ai-mathematics](../ai-mathematics/).

## Relacionados

- [ai-usage](../ai-usage/) — Agentes, MCP, skills, n8n práctico.
- [ai-execution](../ai-execution/) — Motores locales y proveedores.
- [ai-creation](../ai-creation/) — Construir/optimizar modelos.
- [ai-mathematics](../ai-mathematics/) — Fundamentos para LLM-from-scratch.
