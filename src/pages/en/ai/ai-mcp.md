---
layout: ../../../layouts/Layout.astro
eyebrow: AI
title: AI MCP & Skills
subtitle: MCP servers and agent skills
---

Two ways to give an agent tools: **MCP** (Model Context Protocol) is an open protocol the agent uses to connect to external data and services, and **skills** are workflow instructions in the `SKILL.md` standard that the agent loads to know how to perform a task. Both install via command — `npx <tool> setup` for MCP, `npx skills add owner/repo` for skills — so it's worth scanning whatever you install: see §2.

## 1. MCP (Model Context Protocol)

- **[Context7](https://context7.com/)** — Library docs always up to date with the version actually installed; used via `npx ctx7 setup` or as an MCP server. The antidote against your LLM's stale documentation. Per-client setup (header auth or `--api-key`) in its [clients page](https://context7.com/docs/resources/all-clients).
- **[awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)** — A curated list of MCP servers: the starting point to discover what already exists before writing your own.
- **[chrome-devtools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)** — Browser debugging and automation context.
- **[Totalum MCP](https://www.totalum.app/)** — App-building context (auth, DB, payments).
- **[GitHub MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/github)** — Repo context (issues/PRs).
- **[Playwright MCP](https://github.com/microsoft/playwright-mcp)** — Browser automation.
- **[REA (Reverse Engineer Anything)](https://github.com/morluto/rea)** — Reverse engineering MCP: native binaries (Hopper/Ghidra/IDA), JS/Electron, .NET, APKs, and websites, with evidence-backed findings; `npx rea-agents setup`. Also available as a skill on [skills.sh](https://skills.sh/b/morluto/rea).

## 2. Agent Skills

- **[skills.sh](https://skills.sh/)** — Marketplace for agent skills: discovery and installation with `npx skills add owner/repo`, on the SKILL.md standard — portable across agents that speak the same format.
- **[autoskills](https://github.com/cybersaksham/autoskills)** — Generates and installs skills with `npx autoskills@latest` without writing the SKILL.md by hand.
- **[Uncodixfy](https://github.com/cyxzdev/Uncodixfy)** — Installable with `npx skills add cyxzdev/Uncodixfy`.
- **[HyperFrames skills](https://github.com/heygen-com/hyperframes)** — HyperFrames skills for agent-native video; install with `npx skills add heygen-com/hyperframes --full-depth`. See [ai-usage](../ai-usage/).
- **[skillspector](https://github.com/NVIDIA/skillspector)** — NVIDIA's skill security scanner that reviews a skill before you install it. The habit that avoids surprises when adding third-party skills.

## Related

- [ai-usage](../ai-usage/) — Coding interfaces, agents, n8n, data, multimedia.
- [ai-execution](../ai-execution/) — Local engines and providers.
- [ai-resources](../ai-resources/) — MCP courses and curated learning resources.
