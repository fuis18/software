---
eyebrow: IA
title: Uso de IA
subtitle: Interfaces, agentes, n8n, datos y multimedia
group: Ejecutar y Usar
order: 5
summary: Interfaces para programar, agentes, n8n, datos para IA (RAG/CAG, bases vectoriales) y flujos multimedia.
---

Formas prácticas de usar IA: editores/TUI para programar, agentes, automatización con n8n, datos para IA (RAG/CAG/bases vectoriales) y flujos multimedia — los servidores MCP y skills de agentes viven en [ai-mcp](../ai-mcp/).

## 1. Interfaces para programar

- **[opencode](https://github.com/sst/opencode)** — TUI/integración editor, local-first, flujos con agentes.
- **[LM Studio](https://lmstudio.ai/)** — GUI, modelos locales, API.
- **[Continue](https://www.continue.dev/)** — Extensión IDE, multi-modelo.

## 2. Agentes

- **[OpenClaw](https://openclaw.ai/)** — Open-source, registro ClawHub skills, CLI/skills.
- **[InsForge](https://insforge.dev/)** — Infra agent-native (gateway modelos, DB, auth, storage). CLI+skills.
- **Patrones CLI agentes** — `agents.md`, CLIs agent-native, integración skills.

## 3. Automatización (n8n)

- **[n8n](https://n8n.io/)** — Flujos con IA; Docker + modelos locales.
- **Cursos** — Ver [ai-resources](../ai-resources/).

## 4. Datos para IA (RAG, CAG, bases vectoriales)

- **RAG vs CAG** — RAG recupera; CAG inyecta contexto curado.
- **Embeddings y bases vectoriales** — FAISS, Weaviate, Qdrant, LanceDB. Ver [ai-mathematics](../ai-mathematics/) (similitud coseno).
- **Frameworks** — [LlamaIndex](https://www.llamaindex.ai/), [LangChain](https://www.langchain.com/).
- **Plataforma datos** — [ops-modern-data-stack](../../ops/ops-modern-data-stack/).
- **Muestreo** — temperature/top-k/top-p ([ai-mathematics](../ai-mathematics/), §3).

## 5. Multimedia

| Herramienta | Perfil | Uso |
|---|---|---|
| [ComfyUI](https://comfyui.com/) | Imagen/vídeo | Nodo-a-nodo, local. |
| [InvokeAI](https://www.invoke.com/) | Imagen | UI SD pulida. |
| [Fooocus](https://github.com/lllyasviel/Fooocus) | Imagen | Un-click. |
| [Forge/reForge](https://github.com/lllyasviel/stable-diffusion-webui-forge) | Imagen | Extensiones. |
| [Krita + plugin IA](https://krita.org/es/) | Imagen | Edición/in-painting. |
| [HyperFrames](https://github.com/heygen-com/hyperframes) | Vídeo | HTML→MP4, agent-native. |
| [HeyGen](https://www.heygen.com/) | Vídeo/avatares | Web-based. |
| [subvid.app](https://www.subvid.app/) | Vídeo | Subtítulos/utilidades. |
| [voxtext](https://github.com/fuma-nama/voxtext) | Voz/texto | Ligero. |
| [Whisper](https://openai.com/research/whisper) | Audio | Transcripción. |

## Relacionados

- [ai-mcp](../ai-mcp/) — Servidores MCP y skills de agentes.
- [ai-execution](../ai-execution/) — Motores locales, APIs/proveedores.
- [ai-models](../ai-models/) — Selección modelos.
- [ai-creation](../ai-creation/) — Fine-tuning, cuantización.
- [ai-mathematics](../ai-mathematics/) — Coseno, muestreo, probabilidad.
