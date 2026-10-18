---
layout: ../../../layouts/Layout.astro
eyebrow: AI
title: AI Creation
subtitle: Building, fine-tuning, quantization, train-to-prod, in-browser, research
---

From libraries to production: training, optimization, quantization, serving, in-browser inference, and research directions.

## 1. Base Technical Stack

- **[PyTorch](https://pytorch.org/)** — The leading framework for training and fine-tuning: autograd, ecosystem, and nearly every paper and tutorial is written in it. Start here unless you already have a TensorFlow stack in production.
- **[TensorFlow](https://www.tensorflow.org/)** — An end-to-end platform (Keras, TF Serving, TF Lite) built to take models to production on server and mobile. Choose it when deployment and vendor support matter more than research novelty.
- **[Hugging Face](https://huggingface.co/)** — The de facto hub: datasets, pretrained models, transformers, trainers, and the Spaces platform. Almost any NLP project starts by downloading something from here.
- **Mathematics** — The minimum to understand why everything else works: linear algebra, probability, and optimization in [ai-mathematics](../ai-mathematics/).

## 2. Fine-tuning & Training

- **LoRA/QLoRA** — Freezes the original weights and trains only low-rank matrices (QLoRA additionally in 4-bit), so fine-tuning fits on a consumer GPU. The first technique to try before touching full weights.
- **Unsloth** — Reimplements training kernels so the same fine-tuning runs faster with less VRAM. Choose it once LoRA already fits but training is still too slow.
- **axolotl** — Config-driven fine-tuning recipes: you define the configuration and the framework does the rest. Good for repeating the same procedure without rewriting code.
- **Liger Kernel** — Kernel optimizations (fused operations) that cut memory and time without changing your script. Layer it on top of PyTorch when you need that extra margin.
- **PEFT** — Hugging Face's library for parameter-efficient fine-tuning; it wraps LoRA/QLoRA and other methods behind one uniform API. Your entry point if you don't want to build adaptation by hand.

## 3. Quantization & Optimization

- **GGUF** — llama.cpp's quantized file format, the default in LM Studio and Ollama. Choose GGUF to run models locally on your machine.
- **AWQ, GPTQ** — 4-bit weight quantization built for GPU-hosted inference: the formats vLLM and SGLang load out of the box. Choose AWQ/GPTQ when serving a quantized model to multiple users.
- **INT4/INT8/FP16** — The tradeoff axis between VRAM, speed, and quality: fewer bits mean less memory and more speed at some cost in accuracy. The main lever for fitting a model on your hardware ([ai-mathematics](../ai-mathematics/), §8).
- **KV cache quantization** — Applies the same idea to the attention cache, which in long contexts can weigh as much as the weights themselves. Worth it when you work with large windows.
- **Token-level precision variance** — Gives more bits to hard tokens and fewer to easy ones. Still research territory, not daily deployment.

## 4. Training-to-Production

- **[ONNX](https://onnxruntime.ai/)** — Exports the model to a framework-agnostic intermediate graph that ONNX Runtime runs on any platform. The bridge when you train in PyTorch and deploy elsewhere.
- **[TensorRT](https://developer.nvidia.com/tensorrt)** — Compiles the graph for NVIDIA GPUs with fused operations and optimized precision. The path to the lowest latency on green hardware.
- **[Candle](https://github.com/huggingface/candle)** — A Rust inference framework, minimal and without a Python dependency. Choose it when the product is a Rust binary with controlled memory and startup.
- **[tch-rs](https://github.com/LaurentMazare/tch-rs)** — Rust bindings to PyTorch's C++ library: access models and tensors without leaving Rust. For migrating existing PyTorch code.
- **[PyO3](https://pyo3.rs/)** — Rust↔Python bridges to combine the best of both worlds. When you need to call Python libraries from your Rust binary.
- **Serving** — The final step: vLLM, SGLang, or the llama.cpp server expose the exported model over an API; where each one shines is covered in [ai-execution](../ai-execution/).

## 5. In-Browser Inference

- **[Transformers.js](https://huggingface.co/docs/transformers.js)** — Ports Hugging Face models to JavaScript and runs them in the browser via WebGPU or WebAssembly. Choose it for full privacy: the model never leaves the user's machine.
- **[Whisper WebGPU (ONNX Runtime)](https://huggingface.co/spaces/onnxruntime/whisper-webgpu)** — Whisper running in the browser via WebGPU: speech-to-text without uploading audio to any server.
- **[Hugging Face Spaces](https://huggingface.co/spaces)** — Hosted demos, web apps, and playgrounds to try models without installing anything. The place to share a quick demo.

## 6. Research Directions

- **[Think-Anywhere](https://www.alphaxiv.org/abs/2603.29957)** — On-demand reasoning at any position of the generation process, instead of only at the beginning or the end. It points to models that decide when and where to "think more".
- **[LLaDA](https://github.com/ML-GSAI/LLaDA)** — Diffusion-based language modeling: iterative denoising that refines text instead of generating it token by token. The generative alternative to the autoregressive decoder ([ai-fundamentals](../ai-fundamentals/)).
- **Diffusion for language** — Parallel refinement vs autoregressive sequential generation: different promises of latency and coherence. The alternative path that puts "decoder-only transformer" into question.

## Related

- [ai-mathematics](../ai-mathematics/) — Math for training/optimization.
- [ai-execution](../ai-execution/) — Serving models locally/online.
- [ai-models](../ai-models/) — Base models to adapt.
- [ai-fundamentals](../ai-fundamentals/) — Architectures and strategies.
