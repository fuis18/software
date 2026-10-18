---
layout: ../../../layouts/Layout.astro
eyebrow: AI
title: AI Resources
subtitle: Tools, skills/MCP references, and courses
---

Practical resources: tools, agent skills, MCP references, and curated courses to go deeper.

## 1. Tools

- **[NotebookLM](https://notebooklm.google.com/)** — "Grounded" research: upload your sources and it answers citing them, with audio summaries. For working through papers and documents without getting lost among them.
- **[Context7](https://context7.com/)** — Library docs always up to date with the version actually installed; used via `npx ctx7 setup` or as an MCP server. The antidote against your LLM's stale documentation.
- **[awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)** — A curated list of MCP servers: the starting point to discover what already exists before writing your own.
- **[skills.sh](https://skills.sh/)** — Marketplace for agent skills: discovery and installation with `npx skills add owner/repo`.
- **[skillspector](https://github.com/NVIDIA/skillspector)** — NVIDIA's skill security scanner that reviews a skill before you install it. The habit that avoids surprises when adding third-party skills.

## 2. Skills & MCP References

- **[skills.sh](https://skills.sh/)** — Install with `npx skills add owner/repo`, on the SKILL.md standard: portable skills across agents that speak the same format.
- **[autoskills](https://github.com/cybersaksham/autoskills)** — Generates and installs skills with `npx autoskills@latest` without writing the SKILL.md by hand.
- **[Uncodixfy](https://github.com/cyxzdev/Uncodixfy)** — Installable with `npx skills add cyxzdev/Uncodixfy`.
- **[HyperFrames skills](https://github.com/heygen-com/hyperframes)** — HyperFrames skills for agent-native video; install with `npx skills add heygen-com/hyperframes --full-depth`. See [ai-usage](../ai-usage/).
- **[Context7 MCP](https://context7.com/docs/resources/all-clients)** — Per-client Context7 setup (header auth or `--api-key`) to connect it to your editor or agent.

## 3. Courses

### MCP

- **[Learn MCP! For Beginners + Create Our First MCP From Scratch](https://www.youtube.com/watch?v=wnHczxwukYY)** — Hands-on English intro: you build your first MCP from scratch.
- **[7 MCP que mejoran tu IA para programar](https://www.youtube.com/watch?v=NNICQKFS3TU)** — In Spanish: concrete MCPs that improve your AI for programming.

### n8n

- **[Curso de N8N desde CERO (completo)](https://www.youtube.com/watch?v=4eRPQmzO_Nw)** — Complete Spanish course from zero.
- **[Curso completo de N8N, aprende N8N ahora!](https://www.youtube.com/watch?v=8A8PyJeQhlo)** — Complete Spanish introduction.
- **[Aprende n8n AHORA! curso gratis desde cero](https://www.youtube.com/watch?v=T3LNPmYp980)** — Free Spanish course from zero.
- **[Introducción a N8N, automatiza tus flujos de trabajo](https://www.youtube.com/watch?v=yP0PM-fpnXo)** — Focused on automating workflows, in Spanish.
- **[Curso Completo De N8N: Cómo Crear y Vender Automatizaciones IA](https://www.youtube.com/watch?v=7Z-vRvIUqNs)** — In Spanish, with a focus on monetizing automations.
- **[Instala n8n LOCAL y GRATIS con Docker](https://www.youtube.com/watch?v=BfFkNou9m7k)** — Practical guide to run n8n on your own machine with Docker, independent of the cloud.
- **[Utiliza n8n Con Modelos Locales (Privado y Gratuito!)](https://www.youtube.com/watch?v=wd4voMPEOGg)** — n8n wired to local models: private flows with no API cost.

### LLMs from Scratch

- **[Build a Large Language Model (From Scratch)](https://github.com/rasbt/LLMs-from-scratch)** — Book/repo that builds a complete LLM step by step, math included. The theory-and-practice companion to [ai-mathematics](../ai-mathematics/).

## Related

- [ai-usage](../ai-usage/) — Agents, MCP, skills, n8n in practice.
- [ai-execution](../ai-execution/) — Local engines and providers.
- [ai-creation](../ai-creation/) — Building/optimizing models.
- [ai-mathematics](../ai-mathematics/) — Foundations for LLM-from-scratch.
