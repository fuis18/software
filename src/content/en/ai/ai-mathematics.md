---
eyebrow: AI
title: AI Mathematics
subtitle: The math used directly in modern AI
group: Fundamentals
order: 2
summary: "Mathematics used directly in AI: linear algebra, calculus, probability, optimization, information theory, neural network building blocks, architecture-specific math, and numerical computation. Core minimum: matrices and dot product, chain rule, softmax, cross-entropy, and gradient descent."
---

Mathematics is the foundation for how models represent data, learn, and generate. This page covers the math that shows up directly in AI systems — what each concept is and where it plays a role. The **core minimum** to understand how an LLM learns and generates: **matrices and the dot product, the chain rule, softmax, cross-entropy, and gradient descent**.

## 1. Linear Algebra

Every piece of a neural network — weights, activations, embeddings — is stored and moved as arrays of numbers. Linear algebra is the language of those operations, and most of what feels like "AI math" is linear algebra in disguise.

| Concept | What it is and why it matters |
|---|---|
| Vectors, matrices, tensors | Models are, at heart, structures of n-dimensional matrices because everything they know lives in ordered grids of numbers: their weights are matrices, each batch of data travels as a tensor, and each token becomes a vector (its embedding). |
| Matrix multiplication | The single most executed operation in deep learning, because every layer of every network is one: every output number mixes rows of the first grid with columns of the second, and how fast you multiply sets how fast training and inference go. |
| Dot product | Attention in Transformers is built on dot products between queries and keys because it needs a score of alignment: multiplying two vectors element by element and summing yields a single number, and that number decides how much one token attends to another. |
| Cosine similarity | The engine of vector search is cosine similarity because it compares only the direction of two vectors and ignores their length — this is how RAG and vector databases find the document whose embedding points the same way as the query ([ai-usage](../ai-usage/)). |
| Norms (L1, L2) | Measuring a vector's size — sum of absolute values versus sum of squares — is what enables regularization and distances: L2 regularization shrinks weights to prevent overfitting, and norms also define distances in clustering and evaluation. |

## 2. Calculus

Training is an optimization problem, and calculus is what lets a model tell which direction to move each weight to reduce its error. These two ideas carry almost all of backpropagation.

| Concept | What it is and why it matters |
|---|---|
| Partial derivatives and the gradient | Training advances by answering one question — which way do I adjust? — and the gradient is the answer: for each weight, measure how much the error changes when that weight changes a little, then collect those measurements into a single direction pointing where error grows fastest; so training always steps the opposite way. |
| Chain rule | Backpropagation is the chain rule applied layer by layer because the network is a function built of stacked steps: differentiating it means multiplying the rates of change of each step, and without that a deep network's error could never be traced back to its early layers. |

## 3. Probability

A language model does not "know" the next word — it produces a distribution over every possible token, and the final text is a sample from that distribution. Probability is the frame in which prediction, sampling, and evaluation all happen.

| Concept | What it is and why it matters |
|---|---|
| Distributions (normal, categorical) | The model's output is a categorical distribution over the whole vocabulary at every step because predicting means assigning a likelihood to every possible outcome; the normal distribution, for its part, underlies the noise in diffusion and many initialization schemes. |
| Softmax | A neural net's raw numbers become a believable distribution thanks to softmax, which turns arbitrary scores into positive probabilities that add up to one: it is applied to attention scores (weights over tokens) and at the output head (next-token probabilities). |
| Conditional probability | Next-token prediction is exactly conditional probability: the model estimates the probability of the next token conditioned on everything that came before, because an LLM's text is not loose words but sequences where each token depends on what already happened. |
| Sampling (temperature, top-k, top-p) | The practical knobs for creativity versus predictability: temperature softens or sharpens the distribution, and top-k and top-p cut the unlikely tail before a token is picked — low temperature gives near-deterministic answers, high temperature explores ([ai-usage](../ai-usage/)). |
| Maximum likelihood | The umbrella objective of pretraining is maximum likelihood — make the data you actually observed as probable as possible under the model — and that is why cross-entropy works as a loss: minimizing it is exactly maximizing likelihood. |

## 4. Optimization

Knowing the direction (the gradient) is only useful if you know how far to step. Optimization is the machinery that turns gradients into a trained model.

| Concept | What it is and why it matters |
|---|---|
| Gradient descent | Every epoch of every model run is gradient descent: nudge each weight against the gradient, a little at a time, until the error stops falling — executed in mini-batch form millions of times, it is the training loop itself. |
| Learning rate | Knowing the direction only helps if you know how far to step, and that is what the learning rate decides: too large and training diverges or oscillates, too small and it crawls; schedules that decay it over time are standard practice. |
| Adam / AdamW | The default choice for training LLMs, because it gives each weight its own adaptive step size, combining momentum with per-parameter scaling; AdamW adds proper weight decay, tying optimization directly to regularization. |
| Regularization (L2, dropout) | L2 (weight decay) keeps weights small and dropout randomly silences units: they make fitting the training data deliberately harder, so the network is forced to learn patterns instead of memorizing examples ([ai-creation](../ai-creation/)). |

## 5. Information Theory

Information theory puts numbers on surprise and uncertainty, which is exactly the currency of a language model. It supplies both the loss that trains LLMs and the metrics used to compare them.

| Concept | What it is and why it matters |
|---|---|
| Cross-entropy | Training an LLM is minimizing cross-entropy token by token because it measures the gap between the probabilities the model assigns and the real ones, penalizing confident mistakes harshly; in passing, that is exactly maximum likelihood on the observed data. |
| Perplexity | The classic way to compare models on the same data, because it measures how confused the model remains on average about the next token: lower perplexity means the model finds the text less surprising. |
| KL divergence | It appears wherever two distributions are aligned — RLHF preference tuning, knowledge distillation, and diffusion objectives — because it measures how one distribution drifts from a second, reference distribution. |

## 6. Neural Network Building Blocks

Stacking matrix multiplications alone only learns straight-line relationships. These four pieces are what make deep networks trainable and expressive in the first place.

| Concept | What it is and why it matters |
|---|---|
| Activation functions (ReLU, GELU) | Without activation functions the whole network would collapse into a single matrix multiply, so a small nonlinear bend is applied after each layer: ReLU is the classic choice and GELU dominates modern Transformers. |
| Normalization (LayerNorm) | A big reason modern deep networks train stably at all is that LayerNorm rescales each layer's outputs to a stable range, keeping activations from drifting across layers during training. |
| Weight initialization | Choosing sensible starting values decides whether the network learns at all: a bad start (all zeros, or far too large) can make it stop learning, which is why standard initializations scale weights so the signal survives depth. |
| Vanishing and exploding gradients | The historical reason deep networks were hard to train is that errors shrink or blow up as they propagate back through the layers; the answer — residual connections, normalization, and careful initialization — is why modern architectures have the shape they do. |

## 7. Architecture-Specific Math

Different architecture families lean on different math. This table maps what you need to know to what you want to build.

| If you work with... | What you need and why |
|---|---|
| Transformers | Attention between queries, keys, and values, why scores are scaled, and positional encodings like RoPE: this is what gives the model context, because it decides which earlier tokens the model weighs when writing each new one ([ai-fundamentals](../ai-fundamentals/)). |
| Diffusion (language) | Gaussian noise and iterative denoising as a step-by-step process, because generation works by starting from noise and removing it step by step until text emerges ([ai-fundamentals](../ai-fundamentals/)). |
| Reinforcement learning | The Bellman equation, policies, and rewards: the framework for learning from outcomes rather than labels, used in RLHF to align models with human preferences ([ai-simulation](../ai-simulation/)). |
| Neuroevolution (NEAT) | Genetic algorithms and graph-based search, because evolution replaces the gradient entirely: networks are bred and mutated instead of differentiated ([ai-simulation](../ai-simulation/)). |
| SSM (Mamba) | Discretized differential equations and running state updates, because these models keep a running summary instead of re-reading the whole context — which is why they scale so well to long sequences. |

## 8. Numerical Computation

The math above assumes exact numbers; real hardware stores them approximately. Numerical reality is what turns model design into engineering trade-offs.

| Concept | What it is and why it matters |
|---|---|
| Floating point and precision (FP16, INT8, INT4) | Quantization trades numeric range and precision for memory and speed, because storing weights at lower precision means less VRAM and faster inference, at some cost in quality ([ai-creation](../ai-creation/)). |
| Linear versus quadratic complexity | Attention's quadratic cost is why long contexts get expensive — and the main motivation behind SSMs and hybrid architectures — because everything depends on how fast cost grows as the input gets longer. |

## Scope note

**Left out (useful later):** determinant and inverse, SVD, Hessian, integrals, classical statistics, convexity, and combinatorics.

## Related

- [ai-fundamentals](../ai-fundamentals/) — The concepts these math topics enable.
- [ai-creation](../ai-creation/) — Quantization, fine-tuning, and optimization in practice.
- [ai-simulation](../ai-simulation/) — RL, NEAT, and large-scale agents.
- [ai-usage](../ai-usage/) — Cosine similarity, sampling, and RAG in practice.
