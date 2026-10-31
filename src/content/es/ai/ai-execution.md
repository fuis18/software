---
eyebrow: IA
title: Ejecución de IA
subtitle: Ejecutar modelos localmente y usar APIs y proveedores
group: Ejecutar y Usar
order: 4
summary: Ejecución de modelos en local y uso de APIs y proveedores, gateways, routers y configuraciones prácticas.
---

Ejecuta modelos en local para privacidad y control de costes, o usa APIs/proveedores y gateways para escalar.

## 1. Motores locales

| Herramienta | Plataforma | Notas |
|---|---|---|
| [Ollama](https://ollama.com/) | CLI/REST | La forma más fácil de arrancar un modelo en tu máquina: `ollama pull qwen3:8b` lo descarga y lo sirve detrás de una API REST compatible con OpenAI, así que cualquier cliente funciona sin tocar nada. La opción por defecto para SLMs y pruebas rápidas ([ai-models](../ai-models/)); cuando necesites máximo throughput o varios usuarios, pasa a vLLM. |
| [llama.cpp](https://github.com/ggml-org/llama.cpp) | CLI (llama-server, llama-cli) | La implementación C/C++ de referencia sobre la que se apoyan casi todas las demás herramientas locales: lee archivos GGUF, corre en CPU o GPU con muy poco overhead y expone un servidor compatible con OpenAI vía `llama-server`. Elígelo cuando quieras controlar cada flag — tamaño del contexto, cuántas capas se descargan a la GPU — o la menor huella posible. |
| [vLLM](https://github.com/vllm-project/vllm) | Server | Pensado para servir a muchos a la vez: PagedAttention mantiene eficiente la memoria del KV-cache, y eso se traduce en los más altos tokens/segundo por GPU. Elige para una API autoalojada en producción, no para un chat de una persona. |
| [SGLang](https://github.com/sgl-project/sglang) | Server | Capa de serving centrada en planes de ejecución rápidos y salidas estructuradas (JSON), de modo que encaja con flujos agentícos que encadenan muchas llamadas cortas o deben emitir JSON válido siempre. Elígelo cuando tu tráfico es agentíco, no conversacional. |
| [LM Studio](https://lmstudio.ai/) | GUI | Una app de escritorio con navegador de modelos: descargas desde el hub, chateas por una interfaz visual y activas un servidor local compatible con OpenAI cuando otras herramientas lo necesitan. La entrada más amigable si no quieres vivir en la terminal. |
| [Jan.ai](https://jan.ai/) | GUI | Chat de escritorio local-first que lo mantiene todo en disco, con servidor API integrado y RAG ligero sobre tus propios archivos. Elígelo cuando la privacidad por defecto importa más que una lista larga de funciones. |

## 2. UIs locales y web

- **[Open WebUI](https://www.openwebui.com/)** — Un front-end de chat completo (estilo ChatGPT) que habla con cualquier endpoint compatible con OpenAI — Ollama, vLLM o una API en la nube — con comparación multi-modelo, RAG sobre documentos y llamada de herramientas. Se vuelve el diario de a bordo cuando una API a secas se queda corta.
- **[AnythingLLM](https://anythingllm.com/)** — App de base de conocimiento local: la apuntas sobre documentos, trocea e indexa para RAG y luego responde citando la fuente. Elígelo cuando la tarea es "preguntar a mis archivos" y no un chat abierto.
- **[text-generation-webui (oobabooga)](https://github.com/oobabooga/text-generation-webui)** — El clásico laboratorio de usuario avanzado: cada parámetro de muestreo queda expuesto (temperatura, samplers, repetition penalty) además de extensiones y fichas de personaje. Elígelo cuando quieras ajustar la generación a mano en vez de aceptar los defaults.

## 3. APIs y proveedores

- **[Groq](https://console.groq.com/)** — Ejecuta modelos abiertos en hardware LPU propio, con una latencia que es una fracción de la de un proveedor GPU típico. La elección cuando un humano espera cada token: chat, voz o pasos de agente.
- **[Cerebras](https://www.cerebras.ai/)** — Inferencia a escala de oblea que empuja los tokens/segundo aún más allá. La elección natural para bucles de agentes y trabajos por lotes que consumen millones de tokens.
- **[OpenRouter](https://www.openrouter.ai/)** — Un único endpoint ante cientos de modelos, con precios unificados, un solo techo de rate limits y failover automático cuando un proveedor se degrada. Empieza aquí si no quieres integrar a cada fabricante por separado.
- **[FreeRouter](https://freerouter.top/)** — Enrutado gratuito o de bajo coste sobre modelos variados; útil para experimentos y proyectos laterales, pero revisa disponibilidad y límites antes de construir encima.
- **[BytePlus](https://www.byteplus.com/)** — Proveedor con pesos abiertos y cerrados cuando buscas una alternativa a los fabricantes estadounidenses: revisa catálogo, precios y región antes de comprometerte.
- **[Glama.ai](https://glama.ai/)** — Acceso a modelos con routing y énfasis en contexto de herramientas/MCP, útil cuando tu cliente es un agente que necesita descubrir herramientas y llamar a muchos modelos desde un solo sitio.

## 4. Conceptos y configuración

Sea cual sea el motor o proveedor que elijas, el mismo puñado de conceptos de configuración decide si la configuración sobrevive al contacto con tráfico real.

| Concepto | Qué es | Dónde aparece |
|---|---|---|
| Rate limit | El techo del proveedor sobre peticiones o tokens por minuto — a veces por clave API, nivel o modelo. | Cualquier bucle de agente o trabajo por lotes necesita backoff con jitter y reintentos; sin ellos, una ráfaga puede quemar tu cuota de la hora y las generaciones largas se encolan detrás de las cortas. |
| Trust proxy | Ajuste del servidor que dice "confía en las cabeceras de reenvío que pone mi reverse proxy". | Obligatorio cuando un servidor de modelos corre detrás de Caddy o nginx ([ops-traffic](../../ops-traffic/)): sin ello, los logs y el rate limiting ven la dirección del proxy, no la del cliente. |
| Gateway / router | Un único endpoint frente a muchos modelos que elige cuál responde y hace failover cuando uno se degrada. | El routing estilo OpenRouter evita reescribir el cliente por proveedor, deja un solo juego de credenciales y métricas, y suaviza caídas o cambios de precio sobre la marcha. |
| Cuantización | Guardar pesos a menor precisión con la que se entrenaron (FP16, INT8, INT4). | La palanca principal para caber un modelo en menos VRAM, con algún coste en calidad — y normalmente lo primero que conviene probar antes de comprar hardware ([ai-creation](../ai-creation/)). |
| Ajuste a hardware | Si tu GPU o CPU realmente puede alojar el modelo a velocidad utilizable, no solo si el archivo se descarga. | Decide antes de descargar: [canirun.ai](https://www.canirun.ai/) estima el ajuste, [ops-hardware](../../ops/ops-hardware/) cubre las máquinas. |

## Relacionados

- [ai-models](../ai-models/) — Qué modelos ejecutar.
- [ai-usage](../ai-usage/) — Interfaces, agentes, n8n.
- [ai-creation](../ai-creation/) — Cuantización, serving.
