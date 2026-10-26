---
layout: ../../../layouts/Layout.astro
eyebrow: IA
title: Modelos de IA
subtitle: Lenguaje, voz/audio, imagen/vídeo y evaluación
---

Visión práctica de modelos para ejecutar en local o evaluar, con referencias actualizadas y herramientas de comparación.

## 1. Modelos de lenguaje

En vez de listar modelos, que envejecen rápido, conviene elegir por familia: cada una tiene una lógica de diseño y un sitio donde destaca.

- **Qwen (Alibaba)** — Cubre desde pequeños locales hasta grandes de código (Qwen3, Qwen3-Coder), es multilingüe y de las familias abiertas más completas: el ecosistema a elegir si quieres una sola familia de extremo a extremo.
- **Llama (Meta)** — El ecosistema abierto más extendido (Llama 3.2–3.4): casi todas las herramientas lo soportan, por eso es la opción por defecto cuando manda la compatibilidad.
- **Gemma (Google)** — Modelos de 1–4B con mucha calidad por parámetro: para hardware modesto sin renunciar a respuestas decentes.
- **Phi (Microsoft)** — Pequeños entrenados con datos curados y sintéticos que rinden por encima de su tamaño (Phi-4-mini): la familia que sorprende en un portátil.
- **Mistral (Mistral AI)** — Eficientes y con licencias permisivas (Mistral Small 3, Devstral): buen equilibrio entre calidad, tamaño y licencia.
- **DeepSeek** — Razonamiento potente a coste agresivo, casi siempre MoE (DeepSeek V4): cuando mandan razonar bien y pagar poco.
- **Kimi (Moonshot)** — Contexto largo y fuerte en uso de herramientas (K2.6/K3): pensada para flujos agentícos con muchos pasos.
- **GLM (Zhipu AI)** — Pesos abiertos equilibrados para código y razonamiento (GLM-5.x): alternativa generalista sólida.
- **MiniMax** — MoE eficiente (M2.7): mucha capacidad con pocos parámetros activos y buen coste por token.
- **LFM (Liquid AI)** — Arquitecturas híbridas pensadas para eficiencia extrema y edge (LFM2.5): donde importan la memoria y la batería.
- **Frontera cerrada (GPT, Claude, Gemini)** — La máxima capacidad sin gestionar hardware: para evaluar el techo real o tareas que no admiten modelos locales.

Para correr estas familias en local — Ollama, llama.cpp, vLLM, LM Studio — va en [ai-execution](../ai-execution/); antes revisa VRAM y cuantización en [ai-creation](../ai-creation/).

## 2. Voz y audio

- **[Whisper](https://openai.com/research/whisper), [faster-whisper](https://github.com/SYSTRAN/faster-whisper), [whisper.cpp](https://github.com/ggml-org/whisper.cpp)** — Recibe audio en cualquier idioma y lo transcribe o traduce a texto con marcas de tiempo; faster-whisper y whisper.cpp son el mismo modelo optimizado para correr en local.
- **[NVIDIA Canary-Qwen 2.5B](https://catalog.ngc.nvidia.com/orgs/nvidia/teams/nemo/models/canary_qwen)** — Recibe audio y produce texto con precisión alta (SALM), sobre todo en inglés; pensado para pipelines de producción.
- **[Parakeet TDT 0.6B/1.1B](https://huggingface.co/nvidia/parakeet-tdt-1.1b)** — Recibe audio y lo transcribe ultrarrápido: el indicado para procesar lotes grandes con máximo throughput.
- **[Moonshine v2](https://github.com/usefulsensors/moonshine)** — Recibe audio y lo transcribe en el propio dispositivo con latencia mínima y footprint reducido (móvil/edge).
- **[Qwen Audio / Qwen2-Audio](https://github.com/QwenLM/Qwen2-Audio)** — Recibe audio junto con una pregunta en texto y responde en texto: entiende lo que se oye.
- **[Wav2Vec 2.0](https://github.com/facebookresearch/fairseq/tree/main/examples/wav2vec)** — Recibe audio crudo y aprende representaciones útiles con poco dato etiquetado: la base para hacer tu propio fine-tuning.

## 3. Imagen y vídeo

- **[ComfyUI](https://comfyui.com/)** — Recibe un grafo de nodos (prompt, LoRAs, ControlNet) y produce imágenes o vídeo paso a paso: cada nodo es una operación que puedes reordenar.
- **[InvokeAI](https://www.invoke.com/)** — Recibe un prompt y produce imágenes con una UI pulida y modular de Stable Diffusion, local-first.
- **[Fooocus](https://github.com/lllyasviel/Fooocus)** — Recibe un prompt y nada más, y produce imágenes con buenos valores por defecto: generación de un clic.
- **[Stable Diffusion WebUI Forge/reForge](https://github.com/lllyasviel/stable-diffusion-webui-forge)** — Recibe prompts y produce imágenes en una web UI con muchas extensiones, optimizada para aprovechar la VRAM.
- **[Krita + plugin IA](https://krita.org/es/)** — Recibe lo que pintas en el lienzo y rellena o escala zonas (in-painting/upscale) sin salir del editor.
- **[HyperFrames](https://github.com/heygen-com/hyperframes)** — Recibe HTML y lo convierte a MP4: el vídeo como código, orquestado con agentes y apto para CI. Ver [ai-usage](../ai-usage/).
- **[HeyGen](https://www.heygen.com/)** — Recibe un guion y produce vídeo de avatares hablando (con traducción incluida), desde la web.
- **[subvid.app](https://www.subvid.app/)** — Recibe un vídeo y le añade o ajusta subtítulos rápidamente.
- **[voxtext](https://github.com/fuma-nama/voxtext)** — Convierte voz en texto y texto en voz con utilidades ligeras.

## 4. Evaluar y comparar

| Sitio | Qué muestra | Notas |
|---|---|---|
| [arena.ai](https://lmarena.ai/) | Ranking Elo público | Votos comunidad. |
| [artificialanalysis.ai](https://artificialanalysis.ai/) | Benchmarks, precio, velocidad, calidad | Muy completo. |
| [canirun.ai](https://www.canirun.ai/) | Ajuste a hardware | VRAM/CPU; relacionado con [ops-hardware](../../ops/ops-hardware/). |

## Relacionados

- [ai-execution](../ai-execution/) — Motores locales, UIs, APIs/proveedores.
- [ai-usage](../ai-usage/) — Agentes, n8n, datos, multimedia.
- [ai-creation](../ai-creation/) — Fine-tuning, cuantización, entrenamiento a producción.
