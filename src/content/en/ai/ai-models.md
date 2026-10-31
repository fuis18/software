---
eyebrow: AI
title: AI Models
subtitle: Language, voice/audio, image/video, and evaluation
group: Models
order: 3
summary: Language, voice and audio, image and video, and evaluation of models, with up-to-date references and local-first options.
---

A practical view of models to run locally or evaluate, with current references and tools for comparison.

## 1. Language Models

Rather than listing models, which age fast, it pays to choose by family: each has a design logic and a place where it shines.

- **Qwen (Alibaba)** — Spans from small local models to big coding ones (Qwen3, Qwen3-Coder), is multilingual, and is one of the broadest open families: the ecosystem to pick if you want a single family end to end.
- **Llama (Meta)** — The widest-reaching open ecosystem (Llama 3.2–3.4): almost every tool supports it, so it is the default when compatibility decides.
- **Gemma (Google)** — 1–4B models with a lot of quality per parameter: for modest hardware without giving up decent answers.
- **Phi (Microsoft)** — Small models trained on curated and synthetic data that punch above their weight (Phi-4-mini): the family that surprises on a laptop.
- **Mistral (Mistral AI)** — Efficient with permissive licenses (Mistral Small 3, Devstral): a good balance of quality, size, and license.
- **DeepSeek** — Potent reasoning at an aggressive cost, almost always MoE (DeepSeek V4): when reasoning well and paying little both matter.
- **Kimi (Moonshot)** — Long context and strong tool use (K2.6/K3): built for agentic flows with many steps.
- **GLM (Zhipu AI)** — Balanced open weights for code and reasoning (GLM-5.x): a solid generalist alternative.
- **MiniMax** — Efficient MoE (M2.7): lots of capability with few active parameters and good cost per token.
- **LFM (Liquid AI)** — Hybrid architectures built for extreme efficiency and edge (LFM2.5): where memory and battery matter.
- **Closed frontier (GPT, Claude, Gemini)** — The maximum capability without managing hardware: to benchmark the real ceiling or for tasks that cannot run locally.

To run these families locally — Ollama, llama.cpp, vLLM, LM Studio — see [ai-execution](../ai-execution/); check VRAM and quantization first in [ai-creation](../ai-creation/).

## 2. Voice & Audio

- **[Whisper](https://openai.com/research/whisper), [faster-whisper](https://github.com/SYSTRAN/faster-whisper), [whisper.cpp](https://github.com/ggml-org/whisper.cpp)** — Receives audio in any language and transcribes or translates it to text with timestamps; faster-whisper and whisper.cpp are the same model optimized for running locally.
- **[NVIDIA Canary-Qwen 2.5B](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/nemo/models/canary_qwen)** — Receives audio and produces text with high accuracy (SALM), especially in English; built for production pipelines.
- **[Parakeet TDT 0.6B/1.1B](https://huggingface.co/nvidia/parakeet-tdt-1.1b)** — Receives audio and transcribes it ultrafast: the one for processing large batches at maximum throughput.
- **[Moonshine v2](https://github.com/usefulsensors/moonshine)** — Receives audio and transcribes it on the device itself with minimal latency and a small footprint (mobile/edge).
- **[Qwen Audio / Qwen2-Audio](https://github.com/QwenLM/Qwen2-Audio)** — Receives audio together with a question in text and answers in text: it understands what it hears.
- **[Wav2Vec 2.0](https://github.com/facebookresearch/fairseq/tree/main/examples/wav2vec)** — Receives raw audio and learns useful representations from little labeled data: the base for your own fine-tuning.

## 3. Image & Video

- **[ComfyUI](https://comfyui.com/)** — Receives a node graph (prompt, LoRAs, ControlNet) and produces images or video step by step: every node is an operation you can reorder.
- **[InvokeAI](https://www.invoke.com/)** — Receives a prompt and produces images through a polished, modular, local-first Stable Diffusion UI.
- **[Fooocus](https://github.com/lllyasviel/Fooocus)** — Receives a prompt and nothing else, and produces images with great defaults: one-click generation.
- **[Stable Diffusion WebUI Forge/reForge](https://github.com/lllyasviel/stable-diffusion-webui-forge)** — Receives prompts and produces images in a web UI with many extensions, optimized to make the most of your VRAM.
- **[Krita + AI plugin](https://krita.org/en/)** — Receives what you paint on the canvas and fills or scales zones (in-painting/upscale) without leaving the editor.
- **[HyperFrames](https://github.com/heygen-com/hyperframes)** — Receives HTML and turns it into MP4: video as code, orchestrated with agents and CI-ready. See [ai-usage](../ai-usage/).
- **[HeyGen](https://www.heygen.com/)** — Receives a script and produces talking-avatar video (with translation included), from the web.
- **[subvid.app](https://www.subvid.app/)** — Receives a video and quickly adds or adjusts subtitles.
- **[voxtext](https://github.com/fuma-nama/voxtext)** — Turns speech into text and text into speech with lightweight utilities.

## 4. Evaluate & Compare

| Site | What it shows | Notes |
|---|---|---|
| [arena.ai](https://lmarena.ai/) | Public Elo rankings | Community votes. |
| [artificialanalysis.ai](https://artificialanalysis.ai/) | Benchmarks, price, speed, quality | Very complete. |
| [canirun.ai](https://www.canirun.ai/) | Hardware fit | VRAM/CPU; related to [ops-hardware](../../ops/ops-hardware/). |

## Related

- [ai-execution](../ai-execution/) — Local engines, UIs, APIs/providers.
- [ai-usage](../ai-usage/) — Agents, n8n, data, multimedia.
- [ai-creation](../ai-creation/) — Fine-tuning, quantization, train-to-prod.
