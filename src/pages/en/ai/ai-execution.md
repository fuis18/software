---
layout: ../../../layouts/Layout.astro
eyebrow: AI
title: AI Execution
subtitle: Running models locally and using APIs & providers
---

Run models locally for privacy and cost control, or use cloud providers and routers/gateways for scale. This page focuses on practical execution options.

## 1. Local Engines

| Tool | Platform | Notes |
|---|---|---|
| [Ollama](https://ollama.com/) | CLI/REST | The easiest way to run a model on your machine: `ollama pull qwen3:8b` downloads it and serves it behind a REST API that is OpenAI-compatible, so any client works out of the box. The default choice for SLMs and quick experiments ([ai-models](../ai-models/)); when you need maximum throughput or multi-user serving, move to vLLM. |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | CLI (llama-server, llama-cli) | The reference C/C++ implementation most other local tools are built on: it reads GGUF files, runs on CPU or GPU with very little overhead, and exposes an OpenAI-compatible server via `llama-server`. Choose it when you want control over every flag — context size, how many layers offload to the GPU — or the smallest footprint possible. |
| [vLLM](https://github.com/vllm-project/vllm) | Server | Built to serve many users at once: PagedAttention keeps KV-cache memory efficient, which translates into the highest tokens per second per GPU. Choose it for a self-hosted API in production rather than a one-person chat. |
| [SGLang](https://github.com/sgl-project/sglang) | Server | A serving layer focused on fast execution plans and structured (JSON) outputs, so it fits agent workloads that chain many short calls or must emit valid JSON every time. Choose it when your traffic is agentic rather than conversational. |
| [LM Studio](https://lmstudio.ai/) | GUI | A desktop app with a model browser: download models from the hub, chat through a visual interface, and flip on a local OpenAI-compatible server when other tools need it. The friendliest on-ramp if you would rather not live in the terminal. |
| [Jan.ai](https://jan.ai/) | GUI | A local-first desktop chat that keeps everything on disk, with a built-in API server and light RAG over your own files. Choose it when privacy by default matters more than a long feature list. |

## 2. Local UIs & Web

- **[Open WebUI](https://www.openwebui.com/)** — A full chat front-end (ChatGPT-style) that talks to any OpenAI-compatible endpoint — Ollama, vLLM, or a cloud API — with multi-model comparison, RAG over documents, and tool calling. It becomes the everyday interface once a raw API stops being enough.
- **[AnythingLLM](https://anythingllm.com/)** — A local knowledge-base app: you point it at documents, it chunks and indexes them for RAG, then answers questions with citations. Choose it when the job is "ask my files" rather than open-ended chat.
- **[text-generation-webui (oobabooga)](https://github.com/oobabooga/text-generation-webui)** — The classic power-user playground: every sampling parameter is exposed (temperature, samplers, repetition penalty) plus extensions and character cards. Choose it when you want to tune generation by hand instead of accepting defaults.

## 3. APIs & Providers

- **[Groq](https://console.groq.com/)** — Runs open models on its own LPU hardware, so latency is a fraction of what a typical GPU provider charges. The pick when a human waits on every token: chat, voice, or agent steps.
- **[Cerebras](https://www.cerebras.ai/)** — Wafer-scale inference that pushes tokens per second even higher. The natural choice for agent loops and batch jobs that burn through millions of tokens.
- **[OpenRouter](https://www.openrouter.ai/)** — One endpoint in front of hundreds of models with unified pricing, a single rate-limit surface, and automatic failover when a provider degrades. Start here if you don't want to integrate each vendor separately.
- **[FreeRouter](https://freerouter.top/)** — Free or low-cost routing over an assortment of models — useful for experiments and side projects, but check availability and limits before building on it.
- **[BytePlus](https://www.byteplus.com/)** — A provider mixing open and closed weights when you want an alternative to the US-centric vendors — check the model catalog, pricing, and region before committing.
- **[Glama.ai](https://glama.ai/)** — Model access with routing and an emphasis on tools/MCP context, handy when your client is an agent that needs tool discovery and one place to call many models.

## 4. Concepts & Configuration

Whatever engine or provider you pick, the same handful of configuration concepts decides whether a setup survives contact with real traffic.

| Concept | What it is | Where it shows up |
|---|---|---|
| Rate limit | The provider's cap on requests or tokens per minute — sometimes per API key, tier, or model. | Any agent loop or batch job needs backoff with jitter and retries; without them, one burst can burn your hourly quota and long generations queue behind short ones. |
| Trust proxy | A server setting that says "trust the forwarding headers set by my reverse proxy." | Required whenever a model server runs behind Caddy or nginx ([ops-traffic](../../ops-traffic/)) — without it, logging and rate limiting see the proxy's address instead of the client's. |
| Gateway / router | A single endpoint in front of many models that picks which one answers and fails over when it degrades. | OpenRouter-style routing avoids rewriting your client per provider, leaves you one set of credentials and metrics, and softens outages or price changes as they happen. |
| Quantization | Storing weights at lower precision than they were trained at (FP16, INT8, INT4). | The main lever for fitting a model in less VRAM, at some cost in quality — and usually the first thing to try before buying hardware ([ai-creation](../ai-creation/)). |
| Hardware fit | Whether your GPU or CPU can actually host the model at usable speed, not just whether the file downloads. | Decide before downloading: [canirun.ai](https://www.canirun.ai/) estimates the fit, [ops-hardware](../../ops/ops-hardware/) covers the machines themselves. |

## Related

- [ai-models](../ai-models/) — Which models to run.
- [ai-usage](../ai-usage/) — Coding interfaces, agents, MCP, n8n.
- [ai-creation](../ai-creation/) — Quantization, serving from training artifacts.
