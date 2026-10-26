---
layout: ../../../layouts/Layout.astro
eyebrow: IA
title: AI MCP & Skills
subtitle: Servidores MCP y skills de agentes
---

Dos formas de darle herramientas a un agente: **MCP** (Model Context Protocol) es un protocolo abierto con el que el agente se conecta a datos y servicios externos, y los **skills** son instrucciones de flujo de trabajo en el estándar `SKILL.md` que el agente carga para saber cómo hacer una tarea. Ambos se instalan por comando — `npx <tool> setup` para MCP, `npx skills add owner/repo` para skills — así que conviene escanear lo que se instala: ver §2.

## 1. MCP (Model Context Protocol)

- **[Context7](https://context7.com/)** — Docs de librerías siempre actualizadas a la versión real instalada; se usa vía `npx ctx7 setup` o como servidor MCP. El antídoto contra la documentación desactualizada de tu LLM. Configuración por cliente (header auth o `--api-key`) en su [página de clientes](https://context7.com/docs/resources/all-clients).
- **[awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)** — Lista curada de servidores MCP: el punto de partida para descubrir qué ya existe antes de escribir el tuyo.
- **[chrome-devtools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)** — Debugging y automatización de navegador.
- **[Totalum MCP](https://www.totalum.app/)** — Contexto para construir apps (auth, DB, pagos).
- **[GitHub MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/github)** — Contexto de repos (issues/PRs).
- **[Playwright MCP](https://github.com/microsoft/playwright-mcp)** — Automatización de navegador.
- **[REA (Reverse Engineer Anything)](https://github.com/morluto/rea)** — MCP de ingeniería inversa: binarios nativos (Hopper/Ghidra/IDA), JS/Electron, .NET, APKs y sitios web, con hallazgos respaldados por evidencia; `npx rea-agents setup`. También disponible como skill en [skills.sh](https://skills.sh/b/morluto/rea).

## 2. Agent Skills

- **[skills.sh](https://skills.sh/)** — Marketplace de skills: descubrimiento e instalación con `npx skills add owner/repo`, sobre el estándar SKILL.md — portables entre agentes que hablen el mismo formato.
- **[autoskills](https://github.com/cybersaksham/autoskills)** — Genera e instala skills con `npx autoskills@latest` sin escribir el SKILL.md a mano.
- **[Uncodixfy](https://github.com/cyxzdev/Uncodixfy)** — Skill instalable con `npx skills add cyxzdev/Uncodixfy`.
- **[HyperFrames skills](https://github.com/heygen-com/hyperframes)** — Skills de HyperFrames para vídeo agent-native; se instalan con `npx skills add heygen-com/hyperframes --full-depth`. Ver [ai-usage](../ai-usage/).
- **[skillspector](https://github.com/NVIDIA/skillspector)** — Escáner de seguridad de NVIDIA que revisa un skill antes de instalarlo. El hábito que evita sorpresas al añadir skills de terceros.

## Relacionados

- [ai-usage](../ai-usage/) — Interfaces para programar, agentes, n8n, datos y multimedia.
- [ai-execution](../ai-execution/) — Motores locales y proveedores.
- [ai-resources](../ai-resources/) — Cursos de MCP y recursos de aprendizaje curated.
