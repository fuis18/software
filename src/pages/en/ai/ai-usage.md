---
layout: ../../../layouts/Layout.astro
eyebrow: AI
title: AI Usage
subtitle: Coding interfaces, agents, MCP, skills, n8n, data, multimedia
---

Practical ways to use AI: coding editors/TUIs, agents, MCP servers, agent skills, automation with n8n, data pipelines for AI (RAG/CAG/vector DBs), and multimedia workflows.

## 1. Coding Interfaces

- **[opencode](https://github.com/sst/opencode)** — TUI/editor integration, local-first, agent workflows.
- **[LM Studio](https://lmstudio.ai/)** — GUI, local models, API.
- **[Continue](https://www.continue.dev/)** — IDE extension, context-aware, multi-model.

## 2. Agents

- **[OpenClaw](https://openclaw.ai/)** — Open-source AI assistant, ClawHub skills registry, CLI/skills.
- **[InsForge](https://insforge.dev/)** — Agent-native infra (model gateway, DB, auth, storage, edge). CLI+skills.
- **Agents CLI patterns** — `agents.md`, agent-native CLIs, skills integration.

## 3. MCP (Model Context Protocol)

- **[Context7](https://context7.com/)** — Up-to-date docs for any library; use `npx ctx7 setup` or MCP server.
- **[awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)** — Curated list of MCP servers.
- **[chrome-devtools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)** — Browser debugging/automation context.
- **[Totalum MCP](https://www.totalum.app/)** — App-building context (auth, DB, payments).
- **[GitHub MCP](https://github.com/modelcontextprotocol/servers/tree/main/src/github)** — Repo context (issues/PRs).
- **[Playwright MCP](https://github.com/microsoft/playwright-mcp)** — Browser automation.

## 4. Agent Skills

- **[skills.sh](https://skills.sh/)** — Marketplace for agent skills (`npx skills add owner/repo`). SKILL.md standard.
- **[autoskills](https://github.com/cybersaksham/autoskills)** — `npx autoskills@latest` to generate/install skills.
- **[Uncodixfy](https://github.com/cyxzdev/Uncodixfy)** — `npx skills add cyxzdev/Uncodixfy`.
- **[HyperFrames skills](https://github.com/heygen-com/hyperframes)** — `npx skills add heygen-com/hyperframes --full-depth`.
- **[skillspector](https://github.com/NVIDIA/skillspector)** — NVIDIA scanner to evaluate security of skills before install.

## 5. Automation (n8n)

- **[n8n](https://n8n.io/)** — Workflow automation with AI; can run with Docker and local models.
- **Courses (see [ai-resources](../ai-resources/))** — n8n courses for hands-on learning.

## 6. Data for AI (RAG, CAG, Vector DBs)

- **RAG vs CAG** — Use your own docs without fine-tuning. RAG retrieves; CAG injects curated context.
- **Embeddings & vector DBs** — FAISS, Weaviate, Qdrant, LanceDB. Relates to [ai-mathematics](../ai-mathematics/) (cosine similarity).
- **Frameworks** — [LlamaIndex](https://www.llamaindex.ai/), [LangChain](https://www.langchain.com/).
- **Data platform** — [ops-modern-data-stack](../../ops/ops-modern-data-stack/) — ingestion/transformation/storage/consumption.
- **Sampling** — temperature/top-k/top-p affect generation ([ai-mathematics](../ai-mathematics/), §3).

## 7. Multimedia

| Tool | Profile | Use Case |
|---|---|---|
| [ComfyUI](https://comfyui.com/) | Image/video | Node-based, local. |
| [InvokeAI](https://www.invoke.com/) | Image | Polished SD UI. |
| [Fooocus](https://github.com/lllyasviel/Fooocus) | Image | One-click, easy. |
| [Stable Diffusion WebUI Forge/reForge](https://github.com/lllyasviel/stable-diffusion-webui-forge) | Image | Extensions, optimized. |
| [Krita + AI plugin](https://krita.org/en/) | Image | Editing/in-painting. |
| [HyperFrames](https://github.com/heygen-com/hyperframes) | Video | HTML→MP4, agent-native. |
| [HeyGen](https://www.heygen.com/) | Video/avatars | Web-based creation/translation. |
| [subvid.app](https://www.subvid.app/) | Video | Subs/editing utils. |
| [voxtext](https://github.com/fuma-nama/voxtext) | Voice/text | Lightweight. |
| [Whisper](https://openai.com/research/whisper) | Audio | Transcription. |

## Related

- [ai-execution](../ai-execution/) — Local engines, APIs/providers.
- [ai-models](../ai-models/) — Model selection.
- [ai-creation](../ai-creation/) — Fine-tuning, quantization.
- [ai-mathematics](../ai-mathematics/) — Cosine, sampling, probability.
