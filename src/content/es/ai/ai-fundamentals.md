---
eyebrow: IA
title: Fundamentos de IA
subtitle: Conceptos, arquitecturas, despliegue y estrategias de aprendizaje
group: Fundamentos
order: 1
summary: "Conceptos clave: tokens, ventana de contexto, embeddings, parámetros e inferencia, arquitecturas de modelos, despliegue y estrategias de aprendizaje."
---

Entender la IA significa conocer qué son los tokens, el contexto y los embeddings; cómo funcionan las arquitecturas (Transformers, SSMs, híbridas, MoE, difusión); cómo se despliegan los modelos (local vs online, LLM vs SLM); y las estrategias de aprendizaje que hay detrás.

## 1. Conceptos clave

Antes de las arquitecturas o el entrenamiento, un puñado de ideas explican cómo un modelo recibe texto, lo recuerda y responde. Todo lo demás en esta página se apoya en ellas.

- **Tokens y tokenización.** El modelo nunca ve caracteres ni palabras: divide el texto en piezas subword (BPE o SentencePiece) y solo procesa eso. Por eso la tokenización fija el tamaño del vocabulario, el coste por texto y qué tan bien maneja palabras raras o multilingües.
- **Ventana de contexto.** El máximo de tokens que el modelo puede considerar a la vez — el prompt actual más lo que genera — y con él, qué puede ver: documentos largos, codebases grandes o conversaciones de varios turnos caben o no. Ampliarla encarece el coste rápido ([ai-mathematics](../ai-mathematics/)).
- **Embeddings.** Vectores que colocan cada token o documento en un espacio de alta dimensión donde la posición codifica significado: lo similar cae cerca. Es lo que hace funcionar la búsqueda semántica, el clustering y RAG ([ai-usage](../ai-usage/)).
- **Parámetros.** Todos los números aprendidos que un modelo lleva — sus pesos. Más parámetros suelen dar más capacidad, pero también más memoria y cómputo; en los modelos MoE solo una fracción está activa por token, así que el total no es lo que consume cada respuesta.
- **Inferencia.** Ejecutar un modelo ya entrenado para producir salida. Ocurre en dos fases — leer el prompt (*prefill*) y generar token a token (*decode*) — y su coste es justo lo que la cuantización y los modelos pequeños buscan reducir ([ai-creation](../ai-creation/)).

## 2. Arquitecturas

### Por tokenización

Cómo se corta el texto en piezas antes de que el modelo lo toque: cuanto más robusto el tokenizador, menos sufre el modelo con entradas inusuales.

- **Tokens subword (BPE / SentencePiece).** Las piezas frecuentes quedan enteras; las palabras raras se dividen en unidades más pequeñas aprendidas de los datos. Es la elección estándar — vocabulario compacto con buena cobertura — y su compromiso es que el número de tokens varía según el idioma y la rareza de la palabra.
- **Byte-level BPE con byte-fallback.** Opera sobre bytes en vez de caracteres, así que cualquier entrada se puede representar, incluso scripts que el tokenizador nunca vio. Nunca hay tokens desconocidos, a cambio de secuencias más largas en algunos scripts.
- **Token-free a nivel de bytes (BLT, MambaByte).** Sin tokenizador: el modelo consume bytes crudos directamente. Elimina al tokenizador como fuente de sesgo y complejidad; aún es sobre todo dirección de investigación, cambiando longitud de secuencia por simplicidad.

### Por estructura neuronal

La forma de la propia red — cómo fluye la información y cómo se usan los parámetros.

- **Transformers.** La atención permite que cada token pese a todos los anteriores al producir el siguiente. Es el estándar para modelos de propósito general (GPT, Claude, Llama, Qwen): la mejor calidad y el mejor ecosistema, pero el coste de la atención crece mucho con la longitud del contexto ([ai-mathematics](../ai-mathematics/)).
- **Modelos de espacio de estado (SSM).** Mantienen un resumen de estado actualizado paso a paso, en vez de revisitar toda la secuencia. Muy eficientes con contextos largos y streaming; ecosistema más estrecho y, solos, por detrás de los Transformers en código y razonamiento.
- **Híbridas (Transformer + SSM).** Atención para precisión local, capas de espacio de estado para memoria de largo alcance. Capturan lo mejor de ambos mundos: es la dirección que toman la mayoría de las arquitecturas nuevas.
- **Mixture of Experts (MoE).** Muchas subredes pequeñas de expertos, con un router que activa solo unas pocas por token. Da mucha más capacidad por el mismo coste de inferencia: los parámetros totales crecen, los activos se mantienen pequeños.

### Por principio de generación

Cómo produce texto el modelo una vez que está en marcha.

- **Autorregresivo.** Genera un token a la vez, cada uno condicionado a todo lo generado hasta ahora. Es el defecto probado (GPT, Claude, Llama, Qwen): buena calidad y herramientas, pero la generación es inherentemente secuencial.
- **Difusión para lenguaje.** Empieza con ruido y refina muchos tokens en paralelo en varios pasos de denoising: puede generar mucho más rápido y considerar la secuencia entera a la vez. Aún en maduración — ver LLaDA en [ai-creation](../ai-creation/).

## 3. Despliegue

El mismo modelo puede vivir en tu portátil, en un servidor alquilado o detrás de una API. Hay dos decisiones previas: qué tamaño de modelo (LLM o SLM) y dónde va a correr.

### LLM vs SLM: la diferencia práctica

Los LLM maximizan capacidad; los SLM (small language models — pocos miles de millones de parámetros o menos) optimizan velocidad y hardware modesto. La diferencia se nota en el día a día:

| Aspecto | LLM (grande) | SLM (pequeño) |
|---|---|---|
| **Tamaño** | Decenas (o cientos) de miles de millones de parámetros | Pocos miles de millones o menos |
| **Hardware** | GPU grande dedicada — o llamada a una API | Portátil, CPU o GPU modesta |
| **Velocidad y latencia** | Lento en local si cabe; vía API depende del proveedor | Muy rápido en hardware modesto, latencia baja |
| **Coste** | Mucha memoria y cómputo por token | 0 por token en tu equipo; cabe en un VPS barato |
| **Calidad** | Frontera: razonamiento largo, código complejo, tareas abiertas | Bastante para tareas acotadas: clasificación, extracción, chat interno, RAG sencillo |
| **Cuándo elegirlo** | Cuando la tarea exige profundidad o el modelo es el producto | Cuando mandan la latencia, el coste, el volumen o el hardware limitado |

Un SLM como Phi-4-mini, Qwen3 pequeño, Gemma 3/4 o LFM2.5-2.6B corre bien en un portátil y a menudo supera a un grande que apenas cabe; consulta [canirun.ai](https://www.canirun.ai/) u [ops-hardware](../../ops/ops-hardware/).

### Dónde correrlo: tu máquina, un VPS o la nube

Tres destinos con compromisos distintos sobre privacidad, coste y escala:

| Dónde | Cómo corre | Privacidad | Coste | Escala | Para cuándo |
|---|---|---|---|---|---|
| **Tu máquina** | Ollama, llama.cpp o LM Studio sobre tu CPU/GPU | Los datos nunca salen del equipo | 0 por token (hardware ya pagado) | Ninguna: manda tu equipo | Privacidad total, sin conexión, SLM, experimentar |
| **VPS alquilado** (CPU o GPU) | llama.cpp o vLLM en un servidor que controlas | Datos en un servidor que tú administras | Fijo mensual o por uso | A mano, escalado manual | API interna de equipo, control total, punto medio |
| **Nube gestionada / API** | AWS Bedrock, GCP Vertex, Azure OpenAI; APIs de OpenAI, Anthropic, Groq... | Los datos salen a un tercero | Por uso, sin hardware propio | Elástica, con SLA | Calidad de frontera, picos de tráfico, sin ops |

Los matices que no caben en la tabla: en **tu máquina** el límite es la VRAM y tú eres el administrador de seguridad y actualizaciones. En un **VPS** sigues siendo responsable de todo eso, más el escalado manual, y la latencia depende de la región (Hetzner, OVH o DigitalOcean para CPU; RunPod, Vast.ai o Lambda para GPU). En la **nube** no mantienes nada, pero dependes del proveedor, sus precios y su disponibilidad.

En corto: privacidad y cero coste → máquina; control con precio fijo → VPS; calidad de frontera y escala sin mantenimiento → nube o API. Más detalle en [ai-execution](../ai-execution/).

## 4. Estrategias de aprendizaje

Las arquitecturas describen la forma de un modelo; las estrategias de aprendizaje describen cómo se vuelve listo. Casi toda la IA moderna combina algunas de ellas; aquí van agrupadas por cómo consiguen sus datos.

### Con etiquetas humanas

- **Supervisado.** Aprende el mapeo de entradas a salidas etiquetadas por humanos. Es la base del fine-tuning e instruction tuning: pares curados de entrada–salida orientan un modelo preentrenado.
- **Semi-supervisado.** Entrena con un conjunto pequeño etiquetado y otro grande sin etiquetar. Para dominios donde las etiquetas son caras pero los datos crudos abundan.

### Sin etiquetas

- **Autosupervisado.** Genera sus propias etiquetas ocultando parte de la entrada y prediciéndola: es el propio preentrenamiento — predecir el siguiente token es la tarea que construyó cada modelo de lenguaje grande.
- **No supervisado.** Encuentra estructura en datos sin etiquetas alguna. De ahí vienen los embeddings tempranos de palabras y el clustering, hoy absorbidos en gran parte por el preentrenamiento autosupervisado.

### Adaptación a nuevas tareas

- **Transfer learning.** Reutiliza lo que un modelo aprendió en una tarea para otra. Es el flujo estándar: preentrenar una vez sobre texto y luego adaptar a un dominio o estilo.
- **Meta-learning.** Aprende a aprender, adaptándose a tareas nuevas con muy pocos ejemplos. Sostiene la adaptación few-shot y la investigación de fine-tuning rápido.

### Alineación y mejora

- **Aprendizaje por refuerzo.** Ajusta comportamiento desde recompensas, no desde respuestas correctas. Es lo que hacen RLHF y RLAIF para alinear los modelos terminados con preferencias humanas ([ai-simulation](../ai-simulation/)).
- **Adversario (GANs).** Un generador y un discriminador mejoran compitiendo entre sí. Sostiene la síntesis de imágenes y el style transfer, y también las pruebas de robustez adversarial.
- **Curriculum learning.** Ordena el entrenamiento de ejemplos fáciles a difíciles: estabiliza el entrenamiento en tareas complejas y mejora la convergencia final.

### Entrenamiento distribuido y exploración

- **Federado.** Entrena en muchos dispositivos sin enviar sus datos a un centro. Para entornos sensibles a la privacidad como teléfonos y hospitales, donde los datos no pueden salir del dispositivo.
- **Neuroevolución.** Evoluciona poblaciones de redes en vez de entrenarlas con gradientes. Trabajo de vida artificial y simulación donde cuerpos y cerebros evolucionan juntos ([ai-simulation](../ai-simulation/)).

## Relacionados

- [ai-mathematics](../ai-mathematics/) — Las matemáticas detrás de estos conceptos (gradientes, softmax, atención).
- [ai-execution](../ai-execution/) — Ejecutar modelos localmente o vía API.
- [ai-simulation](../ai-simulation/) — Neuroevolución y RL en la práctica.
