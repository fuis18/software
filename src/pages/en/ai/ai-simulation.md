---
layout: ../../../layouts/Layout.astro
eyebrow: AI
title: AI Simulation
subtitle: Neuroevolution, RL, and large-scale agents
---

Simulation and artificial life: evolving agents (NEAT), moving from evolution to reinforcement learning, and performance for thousands of agents in real time.

## 1. Neuroevolution with NEAT

- **Evolving brains and bodies together** — The network topology and its weights coevolve instead of fixing the architecture before training: the body adapts too. The foundation of NEAT.
- **Mutations** — Add, remove, or split nodes and connections as the variation operator. Because the structure itself mutates, the search space includes architectures nobody designed by hand.
- **Emergent behaviors** — Hunting, fleeing, or energy rationing appear without being programmed, driven only by natural selection. The appeal of artificial life: complex conduct from a simple fitness function.
- **Complexification** — Start with minimal networks and let evolution grow them generation after generation. Avoids designing architectures by hand.

## 2. From Evolution to Reinforcement Learning

- **Limitation of evolution** — Every improvement costs complete generations, and there is no adaptation during the individual's lifetime. The starting point for the jump to RL.
- **Next step: RL** — The agent learns and adapts in real time through rewards instead of waiting for offspring. What evolution does across generations, RL does within a single life ([ai-mathematics](../ai-mathematics/), §7).
- **Bellman's equation** — Relates the value of a state to the value of its successor states: the mathematical basis of value-based methods.
- **Policy & reward** — The policy maps states to actions and the reward defines the objective. Together they are the two knobs that decide what the agent learns.

## 3. Large-Scale Performance

A few thousand agents each doing trivial math becomes a serious workload the moment they all interact; the problems that appear are the classic ones of high-performance systems programming.

| Problem | Solution | Why it matters |
|---|---|---|
| Thousands of agents interacting in real time | Spatial partitioning (grid or quadtree) so each agent only checks its neighbors. | Turns the all-pairs check from quadratic cost into roughly linear — the difference between a simulation that runs and one that never starts. |
| Memory leaks in long runs | Careful allocation, RAII-style ownership, profiling. | Simulations run unattended for hours or days; a small leak per step compounds until the process dies mid-run. |
| Race conditions between parallel agents | Synchronization, entity-component-system patterns, message passing. | Two threads touching the same state produce results that depend on scheduling — bugs that appear once and never reproduce. |
| Raw speed | Compiled languages close to the metal — C++ first, also Zig or Rust. | Physics and perception per step must stay in the microsecond range for thousands of agents to keep real time. |
| Bugs that only appear at scale | AddressSanitizer, ThreadSanitizer, systematic profiling. | Memory and threading bugs hide in small runs and surface exactly when the simulation is hardest to debug. |

## Related

- [ai-mathematics](../ai-mathematics/) — Bellman, Markov, optimization.
- [ai-fundamentals](../ai-fundamentals/) — Learning strategies (RL, neuroevolution).
- [ai-creation](../ai-creation/) — Training/optimization context.
