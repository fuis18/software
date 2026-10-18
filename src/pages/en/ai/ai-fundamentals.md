---
layout: ../../../layouts/Layout.astro
eyebrow: AI
title: AI Fundamentals
subtitle: Concepts, architectures, deployment, and learning strategies
---

Understanding AI means knowing what tokens, context, and embeddings are; how different architectures work (Transformers, SSMs, hybrids, MoE, diffusion); how models are deployed (local vs online, LLM vs SLM); and the learning strategies behind them.

## 1. Core Concepts

Before architectures or training, a handful of ideas explain how a model receives text, remembers it, and answers. Everything else in this section builds on them.

- **Tokens and tokenization.** The model never sees characters or words: it splits text into subword pieces (BPE or SentencePiece) and processes only those. Tokenization therefore sets vocabulary size, cost per text, and how well the model handles rare or multilingual words.
- **Context window.** The maximum number of tokens the model can consider at once — the current prompt plus what it generates — and with it, what it can see: long documents, big codebases, or multi-turn conversations either fit or don't. Wider windows raise cost quickly ([ai-mathematics](../ai-mathematics/)).
- **Embeddings.** Vectors that place each token or document in a high-dimensional space where position encodes meaning: similar things land close together. This is what makes semantic search, clustering, and RAG work ([ai-usage](../ai-usage/)).
- **Parameters.** All the learned numbers a model carries — its weights. More parameters generally mean more capability but also more memory and compute; in MoE models only a fraction is active per token, so the total is not what each response consumes.
- **Inference.** Running a trained model to produce output. It happens in two phases — reading the prompt (*prefill*) and generating token by token (*decode*) — and its cost is exactly what quantization and small models aim to reduce ([ai-creation](../ai-creation/)).

## 2. Architectures

### By tokenization

How text is cut into pieces before the model touches it — the more robust the tokenizer, the less the model struggles with unusual input.

- **Subword tokens (BPE / SentencePiece).** Frequent word pieces stay whole; rare words are split into smaller units learned from data. The standard choice — a compact vocabulary with good coverage — traded against a token count that varies with the language and how rare the word is.
- **Byte-level BPE with byte-fallback.** Operates on bytes instead of characters, so any input can be represented, including scripts the tokenizer never saw. No unknown tokens at all, at the cost of longer sequences for some scripts.
- **Token-free, byte-level (BLT, MambaByte).** No tokenizer: the model consumes raw bytes directly. Removes the tokenizer as a source of bias and complexity; still mostly a research direction, trading sequence length for simplicity.

### By neural structure

The shape of the network itself — how information flows and how parameters are used.

- **Transformers.** Attention lets every token weigh every previous token when producing the next one. The default for general-purpose models (GPT, Claude, Llama, Qwen): the best quality and ecosystem, but attention cost grows steeply with context length ([ai-mathematics](../ai-mathematics/)).
- **State space models (SSM).** Maintain a running summary state updated step by step, instead of revisiting the whole sequence. Very efficient on long contexts and streaming; narrower ecosystem and, alone, generally behind Transformers on code and reasoning.
- **Hybrids (Transformer + SSM).** Attention for local precision, state-space layers for long-range memory. Captures most of both strengths — the direction most new architectures are taking.
- **Mixture of Experts (MoE).** Many small expert subnetworks, with a router activating only a few per token. Much more capability for the same inference cost: total parameters grow while active parameters stay small.

### By generation principle

How the model produces text once it is running.

- **Autoregressive.** Generates one token at a time, each conditioned on everything generated so far. The proven default (GPT, Claude, Llama, Qwen) — strong quality and tooling, but generation is inherently sequential.
- **Diffusion for language.** Starts from noise and refines many tokens in parallel over several denoising steps: it can generate far faster and consider a whole sequence at once. Still maturing — see LLaDA in [ai-creation](../ai-creation/).

## 3. Deployment

The same model can live on your laptop, a rented server, or behind an API. Two decisions come first: how big a model (LLM or SLM) and where it will run.

### LLM vs SLM: the practical difference

LLMs maximize capability; SLMs (small language models — a few billion parameters or less) optimize for speed and modest hardware. The difference shows up day to day:

| Aspect | LLM (large) | SLM (small) |
|---|---|---|
| **Size** | Tens (or hundreds) of billions of parameters | A few billion or fewer |
| **Hardware** | A big dedicated GPU — or an API call | Laptop, CPU, or modest GPU |
| **Speed and latency** | Slow locally if it fits; via an API it depends on the provider | Very fast on modest hardware, low latency |
| **Cost** | Lots of memory and compute per token | Nothing per token on your own machine; fits on a cheap VPS |
| **Quality** | Frontier: long reasoning, complex code, open-ended tasks | Enough for bounded tasks: classification, extraction, internal chat, simple RAG |
| **When to pick it** | When the task needs depth or the model is the product | When latency, cost, volume, or limited hardware dominate |

An SLM such as Phi-4-mini, Qwen3 small, Gemma 3/4, or LFM2.5-2.6B runs well on a laptop and often beats a large model that barely fits; check [canirun.ai](https://www.canirun.ai/) or [ops-hardware](../../ops/ops-hardware/).

### Where to run it: your machine, a VPS, or the cloud

Three destinations with different trade-offs on privacy, cost, and scale:

| Where | How it runs | Privacy | Cost | Scale | When to use it |
|---|---|---|---|---|---|
| **Your machine** | Ollama, llama.cpp, or LM Studio on your CPU/GPU | Data never leaves your machine | Nothing per token (hardware already paid for) | None: your hardware is the limit | Total privacy, offline, SLMs, experimenting |
| **Rented VPS** (CPU or GPU) | llama.cpp or vLLM on a server you control | Data on a server you administer | Fixed monthly or per use | Manual, hand-rolled scaling | Internal team APIs, total control, the middle ground |
| **Managed cloud / API** | AWS Bedrock, GCP Vertex, Azure OpenAI; APIs from OpenAI, Anthropic, Groq... | Data leaves to a third party | Pay per use, no hardware of your own | Elastic, with an SLA | Frontier quality, traffic spikes, no ops |

The nuances the table can't hold: on **your machine** the limit is VRAM and you are the security-and-updates administrator. On a **VPS** you are still responsible for all of that, plus manual scaling, and latency depends on the region (Hetzner, OVH, or DigitalOcean for CPU; RunPod, Vast.ai, or Lambda for GPU). In the **cloud** you maintain nothing, but you depend on the provider, its prices, and its availability.

In short: privacy and zero cost → your machine; control at a fixed price → VPS; frontier quality and scale without maintenance → cloud or API. More detail in [ai-execution](../ai-execution/).

## 4. Learning Strategies

Architectures describe the shape of a model; learning strategies describe how it gets smart. Nearly all of modern AI combines a few of them; here they are grouped by how they get their data.

### With human labels

- **Supervised.** Learns the mapping from inputs to human-labeled outputs. The basis of fine-tuning and instruction tuning: curated input–output pairs steer a pretrained model.
- **Semi-supervised.** Trains on a small labeled set plus a large unlabeled one. For domains where labels are expensive but raw data is plentiful.

### Without labels

- **Self-supervised.** Generates its own labels by hiding part of the input and predicting it: this is pretraining itself — predicting the next token is the task that built every large language model.
- **Unsupervised.** Finds structure in data that has no labels at all. Early word embeddings and clustering came from here, today largely absorbed by self-supervised pretraining.

### Adapting to new tasks

- **Transfer learning.** Reuses what a model learned on one task for another. The standard workflow: pretrain once on text, then adapt to a domain or style.
- **Meta-learning.** Learns how to learn, adapting to new tasks from very few examples. It underpins few-shot adaptation and rapid fine-tuning research.

### Alignment and improvement

- **Reinforcement learning.** Adjusts behavior from rewards rather than from correct answers. This is what RLHF and RLAIF do to align finished models with human preferences ([ai-simulation](../ai-simulation/)).
- **Adversarial (GANs).** A generator and a discriminator improve by competing against each other. It underpins image synthesis and style transfer, and also adversarial robustness testing.
- **Curriculum learning.** Arranges training from easy examples to hard ones: it stabilizes training on complex tasks and improves final convergence.

### Distributed training and exploration

- **Federated.** Trains across many devices without sending their data to a center. For privacy-sensitive settings like phones and hospitals, where data cannot leave the device.
- **Neuroevolution.** Evolves populations of networks instead of training them with gradients. Artificial-life and simulation work where bodies and brains evolve together ([ai-simulation](../ai-simulation/)).

## Related

- [ai-mathematics](../ai-mathematics/) — The math behind these concepts (gradients, softmax, attention).
- [ai-execution](../ai-execution/) — Running models locally or via APIs.
- [ai-simulation](../ai-simulation/) — Neuroevolution and RL in practice.
