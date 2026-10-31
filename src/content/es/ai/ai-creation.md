---
eyebrow: IA
title: Creación de IA
subtitle: Construir, fine-tuning, cuantización, train-to-prod, navegador e investigación
group: Crear
order: 7
summary: "Construir y adaptar IA: librerías, fine-tuning, cuantización, entrenamiento a producción, inferencia en navegador e investigación."
---

Desde librerías hasta producción: entrenamiento, optimización, cuantización, serving, inferencia en navegador e investigación.

## 1. Stack técnico base

- **[PyTorch](https://pytorch.org/)** — El framework de referencia para training y fine-tuning: autograd, ecosistema y casi todos los artículos y tutoriales están escritos en él. Empieza aquí salvo que ya tengas un stack TensorFlow heredado.
- **[TensorFlow](https://www.tensorflow.org/)** — Plataforma end-to-end (Keras, TF Serving, TF Lite) pensada para llevar modelos a producción en servidor y móvil. Elige cuando el despliegue y el soporte empresarial pesan más que la novedad de investigación.
- **[Hugging Face](https://huggingface.co/)** — El hub de facto: datasets, modelos preentrenados, transformers, trainers y el espacio Spaces. Casi cualquier proyecto de NLP empieza descargando algo de aquí.
- **Matemáticas** — Lo mínimo para entender por qué funciona lo demás: álgebra lineal, probabilidad y optimización en [ai-mathematics](../ai-mathematics/).

## 2. Fine-tuning y entrenamiento

- **LoRA/QLoRA** — Congela los pesos originales y entrena solo matrices de bajo rango (QLoRA además en 4-bit), así un fine-tuning cabe en una GPU doméstica. La primera técnica que probar antes de tocar los pesos completos.
- **Unsloth** — Reimplementa los kernels de entrenamiento para que el mismo fine-tuning vaya más rápido y con menos VRAM. Elige cuando LoRA ya te cabe pero el entrenamiento sigue siendo demasiado lento.
- **axolotl** — Fine-tuning dirigido por recetas YAML: defines la configuración y el marco hace el resto. Bueno para repetir un mismo procedimiento sin reescribir código.
- **Liger Kernel** — Optimizaciones de kernels (operaciones fusionadas) que reducen memoria y tiempos sin cambiar tu script. Se añade por encima de PyTorch cuando necesitas ese margen extra.
- **PEFT** — La biblioteca de Hugging Face para fine-tuning eficiente; envuelve LoRA/QLoRA y demás métodos con una API uniforme. Tu punto de entrada si no quieres montar la adaptación a mano.

## 3. Cuantización y optimización

- **GGUF** — El formato de archivos cuantizados de llama.cpp, por defecto en LM Studio y Ollama. Elige GGUF para correr modelos en local en tu máquina.
- **AWQ, GPTQ** — Cuantización de pesos 4-bit pensada para inferencia servida en GPU: los formatos que vLLM y SGLang cargan de serie. Elige AWQ/GPTQ cuando sirves un modelo cuantizado a varios usuarios.
- **INT4/INT8/FP16** — El eje de compromiso entre VRAM, velocidad y calidad: menos bits, menos memoria y más rápido, con algún coste en exactitud. La palanca principal para que un modelo quepa en tu hardware ([ai-mathematics](../ai-mathematics/), §8).
- **Cuantización KV cache** — Aplica la misma idea al caché de atención, que en contextos largos llega a pesar tanto como los pesos. Merece la pena cuando trabajas con ventanas grandes.
- **Precisión variable por token** — Da más bits a los tokens difíciles y menos a los fáciles. Territorio de investigación aún, no de despliegue diario.

## 4. Entrenamiento a producción

- **[ONNX](https://onnxruntime.ai/)** — Exporta el modelo a un grafo intermedio independiente del framework, que ONNX Runtime ejecuta en cualquier plataforma. El puente cuando entrenas en PyTorch y despliegas en otro sitio.
- **[TensorRT](https://developer.nvidia.com/tensorrt)** — Compila el grafo para GPUs NVIDIA con operaciones fusionadas y precisión optimizada. La vía para la menor latencia en hardware verde.
- **[Candle](https://github.com/huggingface/candle)** — Framework de inferencia en Rust, minimalista y sin dependencia de Python. Elige cuando el producto es un binario en Rust con memoria y arranque controlados.
- **[tch-rs](https://github.com/LaurentMazare/tch-rs)** — Bindings de Rust a la librería C++ de PyTorch: acceso a modelos y tensores sin salir de Rust. Para migrar código existente de PyTorch.
- **[PyO3](https://pyo3.rs/)** — Puentes Rust↔Python para combinar lo mejor de ambos mundos. Cuando necesitas llamar a librerías Python desde tu binario Rust.
- **Serving** — El paso final: vLLM, SGLang o el servidor de llama.cpp exponen el modelo por API una vez exportado; en qué cada uno brilla va en [ai-execution](../ai-execution/).

## 5. Inferencia en navegador

- **[Transformers.js](https://huggingface.co/docs/transformers.js)** — Porta los modelos de Hugging Face a JavaScript y los ejecuta en el navegador con WebGPU o WebAssembly. Elige para privacidad total: el modelo nunca sale del equipo del usuario.
- **[Whisper WebGPU (ONNX Runtime)](https://huggingface.co/spaces/onnxruntime/whisper-webgpu)** — Whisper corriendo en el navegador vía WebGPU: transcripción de voz sin subir el audio a ningún servidor.
- **[Hugging Face Spaces](https://huggingface.co/spaces)** — Demos, apps web y playgrounds alojados donde probar modelos sin instalar nada. El sitio para compartir una demo rápida.

## 6. Investigación

- **[Think-Anywhere](https://www.alphaxiv.org/abs/2603.29957)** — Razonamiento on-demand en cualquier posición del proceso de generación, en vez de solo al principio o al final. Apunta a modelos que deciden cuándo y dónde "pensar más".
- **[LLaDA](https://github.com/ML-GSAI/LLaDA)** — Modelado de lenguaje con difusión: iteración de denoising que refina el texto en lugar de generarlo token a token. La alternativa generativa frente al decoder autorregresivo ([ai-fundamentals](../ai-fundamentals/)).
- **Difusión para lenguaje** — Refinamiento en paralelo vs generación autorregresiva secuencial: promesas distintas de latencia y coherencia. La vía alternativa que pone en cuestión el "solo transformer decodificador".

## Relacionados

- [ai-mathematics](../ai-mathematics/) — Matemáticas para entrenamiento/optimización.
- [ai-execution](../ai-execution/) — Serving local/online.
- [ai-models](../ai-models/) — Modelos base.
- [ai-fundamentals](../ai-fundamentals/) — Arquitecturas y estrategias.
