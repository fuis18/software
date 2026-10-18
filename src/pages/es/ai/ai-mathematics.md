---
layout: ../../../layouts/Layout.astro
eyebrow: IA
title: Matemáticas para IA
subtitle: Las matemáticas que se usan directamente en IA moderna
---

Las matemáticas son la base de cómo los modelos representan datos, aprenden y generan. Esta página cubre la matemática que aparece directamente en sistemas de IA: qué es cada concepto y dónde cumple su rol. El **núcleo mínimo** para entender cómo aprende y genera un LLM: **matrices y producto punto, regla de la cadena, softmax, entropía cruzada y descenso del gradiente**.

## 1. Álgebra lineal

Cada pieza de una red neuronal — pesos, activaciones, embeddings — se almacena y mueve como arreglos de números. El álgebra lineal es el lenguaje de esas operaciones, y gran parte de lo que parece "matemática de IA" es álgebra lineal disfrazado.

| Concepto | Qué es y por qué importa |
|---|---|
| Vectores, matrices y tensores | Los modelos son, en el fondo, estructuras de matrices n-dimensionales porque todo lo que saben vive en rejillas ordenadas de números: sus pesos son matrices, cada lote de datos viaja como tensor y cada token se convierte en un vector (su embedding). |
| Multiplicación de matrices | Es la operación más ejecutada del deep learning porque cada capa de cada red es una de ellas: cada número de salida mezcla filas de la primera con columnas de la segunda, y a mayor velocidad de multiplicar, mayor velocidad de entrenamiento e inferencia. |
| Producto punto | La atención en Transformers se construye sobre productos punto entre consultas y claves porque así obtiene una puntuación de alineación: multiplicar dos vectores elemento a elemento y sumar da un solo número, y ese número decide cuánto atiende un token a otro. |
| Similitud coseno | El motor de la búsqueda vectorial es la similitud coseno porque compara solo la dirección de dos vectores e ignora su longitud: así RAG y bases vectoriales encuentran el documento cuyo embedding apunta en la misma dirección que la consulta ([ai-usage](../ai-usage/)). |
| Normas (L1, L2) | Medir el tamaño de un vector — suma de valores absolutos frente a suma de cuadrados — es lo que permite regularizar y medir distancias: la regularización L2 encoge los pesos para evitar el sobreajuste, y las normas también definen distancias en clustering y evaluación. |

## 2. Cálculo

Entrenar es un problema de optimización, y el cálculo es lo que permite a un modelo saber en qué dirección mover cada peso para reducir su error. Estas dos ideas cargan con casi toda la retropropagación.

| Concepto | Qué es y por qué importa |
|---|---|
| Derivadas parciales y gradiente | El entrenamiento avanza respondiendo una sola pregunta — ¿hacia dónde ajusto? — y la respuesta es el gradiente: para cada peso se mide cuánto cambia el error cuando ese peso cambia un poco, y todas esas medidas se reúnen en una dirección que apunta hacia donde el error crece más rápido; por eso el entrenamiento siempre da el paso contrario. |
| Regla de la cadena | La retropropagación es la regla de la cadena aplicada capa por capa porque la red es una función hecha de pasos encadenados: derivarla exige multiplicar las tasas de cambio de cada paso, y sin eso el error de una red profunda nunca podría rastrearse hasta sus primeras capas. |

## 3. Probabilidad

Un modelo de lenguaje no "sabe" la siguiente palabra: produce una distribución sobre todos los tokens posibles, y el texto final es una muestra de esa distribución. La probabilidad es el marco en el que ocurren predicción, muestreo y evaluación.

| Concepto | Qué es y por qué importa |
|---|---|
| Distribuciones (normal, categórica) | La salida del modelo es una distribución categórica sobre todo el vocabulario en cada paso porque predecir es asignar una probabilidad a cada resultado posible; la distribución normal, por su parte, aparece en el ruido de la difusión y en muchos esquemas de inicialización. |
| Softmax | Los números crudos de una red se vuelven una distribución creíble gracias al softmax, que convierte puntuaciones arbitrarias en probabilidades positivas que suman uno: se aplica a las puntuaciones de atención (pesos sobre tokens) y en la cabeza de salida (probabilidades del siguiente token). |
| Probabilidad condicional | Predecir el siguiente token es exactamente probabilidad condicional: el modelo estima la probabilidad del siguiente token condicionada a todo lo anterior, porque el texto de un LLM no son palabras sueltas sino secuencias donde cada token depende de lo que ya ocurrió. |
| Muestreo (temperatura, top-k, top-p) | Son los interruptores prácticos de creatividad frente a predictibilidad: la temperatura suaviza o agudiza la distribución, y top-k y top-p recortan la cola improbable antes de elegir un token — temperatura baja da respuestas casi deterministas, alta explora ([ai-usage](../ai-usage/)). |
| Máxima verosimilitud | El objetivo global del preentrenamiento es maximizar la verosimilitud — hacer que los datos observados sean lo más probables posible bajo el modelo — y de ahí que la entropía cruzada funcione como pérdida: minimizarla es exactamente maximizar la verosimilitud. |

## 4. Optimización

Saber la dirección (el gradiente) solo es útil si además sabes qué tan lejos dar el paso. La optimización es la maquinaria que convierte gradientes en un modelo entrenado.

| Concepto | Qué es y por qué importa |
|---|---|
| Descenso del gradiente | Cada época de cada modelo es descenso del gradiente: mover cada peso contra el gradiente, un poco cada vez, hasta que el error deja de bajar — ejecutado en su forma mini-batch millones de veces, es el propio bucle de entrenamiento. |
| Tasa de aprendizaje | Saber la dirección solo sirve si sabes qué tan lejos dar el paso, y eso decide la tasa de aprendizaje: muy alta y el entrenamiento diverge u oscila, muy baja y avanza a rastras; los horizontes que la reducen con el tiempo son práctica estándar. |
| Adam / AdamW | Es la elección por defecto al entrenar LLMs porque da a cada peso su propio tamaño de paso adaptativo, combinando momentum con escalado por parámetro; AdamW añade el weight decay correcto, atando optimización y regularización. |
| Regularización (L2, dropout) | L2 (weight decay) mantiene los pesos pequeños y dropout silencia unidades al azar: hacen que ajustarse a los datos de entrenamiento sea deliberadamente más difícil, así que la red se ve forzada a aprender patrones en vez de memorizar ejemplos ([ai-creation](../ai-creation/)). |

## 5. Teoría de la información

La teoría de la información pone números a la sorpresa y la incertidumbre, que es exactamente la moneda de un modelo de lenguaje. Aporta tanto la pérdida con la que se entrenan los LLMs como las métricas con las que se comparan.

| Concepto | Qué es y por qué importa |
|---|---|
| Entropía cruzada | Entrenar un LLM es minimizar la entropía cruzada token a token porque mide la brecha entre las probabilidades que asigna el modelo y las reales, penalizando con dureza los errores seguros; de paso, eso equivale exactamente a maximizar la verosimilitud de los datos observados. |
| Perplejidad | La forma clásica de comparar modelos sobre los mismos datos es la perplejidad, porque mide qué tan confundido sigue el modelo en promedio sobre el siguiente token: menor perplejidad significa que el modelo encuentra el texto menos sorprendente. |
| Divergencia KL | Aparece donde se alinean dos distribuciones — ajuste de preferencias con RLHF, destilación de conocimiento y objetivos de difusión — porque mide cuánto se desvía una distribución de una segunda distribución de referencia. |

## 6. Piezas de las redes neuronales

Apilar multiplicaciones de matrices solo aprende relaciones rectilíneas. Estas cuatro piezas son lo que hace que las redes profundas sean entrenables y expresivas.

| Concepto | Qué es y por qué importa |
|---|---|
| Funciones de activación (ReLU, GELU) | Sin funciones de activación toda la red colapsaría en una sola multiplicación de matrices, así que tras cada capa se aplica una pequeña curva no lineal: ReLU es la elección clásica y GELU domina los Transformers modernos. |
| Normalización (LayerNorm) | Buena parte de la razón por la que las redes profundas modernas entrenan de forma estable es que LayerNorm reescala las salidas de cada capa a un rango estable, evitando que las activaciones se desplacen entre capas durante el entrenamiento. |
| Inicialización de pesos | Elegir valores de partida sensatos decide si la red llega a aprender: un mal inicio (todo ceros, o demasiado grande) puede hacer que deje de aprender del todo, por eso las inicializaciones estándar escalan los pesos para que la señal sobreviva a la profundidad. |
| Gradiente que se desvanece o explota | La razón histórica por la que las redes profundas eran difíciles de entrenar es que los errores se encogen o se disparan al propagarse hacia atrás por las capas; la solución — conexiones residuales, normalización e inicialización cuidadosa — es por lo que las arquitecturas modernas tienen la forma que tienen. |

## 7. Específico por arquitectura

Cada familia de arquitecturas se apoya en matemáticas distintas. Esta tabla mapea qué necesitas entender según lo que quieras construir.

| Si trabajas con... | Qué necesitas y por qué |
|---|---|
| Transformers | Atención entre consultas, claves y valores, por qué se escalan las puntuaciones y codificaciones posicionales como RoPE: es lo que da contexto al modelo, porque decide qué tokens anteriores pesa al escribir cada uno nuevo ([ai-fundamentals](../ai-fundamentals/)). |
| Difusión (lenguaje) | Ruido gaussiano y denoising iterativo como proceso paso a paso, porque la generación funciona empezando con ruido y quitándolo paso a paso hasta que emerge el texto ([ai-fundamentals](../ai-fundamentals/)). |
| Aprendizaje por refuerzo | La ecuación de Bellman, políticas y recompensas: el marco para aprender de resultados en lugar de etiquetas, usado en RLHF para alinear modelos con preferencias humanas ([ai-simulation](../ai-simulation/)). |
| Neuroevolución (NEAT) | Algoritmos genéticos y búsqueda sobre grafos, porque la evolución reemplaza por completo al gradiente: las redes se cruzan y mutan en vez de diferenciarse ([ai-simulation](../ai-simulation/)). |
| SSM (Mamba) | Ecuaciones diferenciales discretizadas y actualizaciones de estado en curso, porque estos modelos mantienen un resumen en vez de releer todo el contexto — y por eso escalan tan bien a secuencias largas. |

## 8. Computación numérica

La matemática anterior asume números exactos; el hardware real los almacena de forma aproximada. La realidad numérica es lo que convierte el diseño de modelos en compromisos de ingeniería.

| Concepto | Qué es y por qué importa |
|---|---|
| Punto flotante y precisión (FP16, INT8, INT4) | La cuantización cambia rango y precisión numérica por memoria y velocidad, porque guardar pesos a menor precisión significa menos VRAM e inferencia más rápida, a algún coste en calidad ([ai-creation](../ai-creation/)). |
| Complejidad lineal frente a cuadrática | El coste cuadrático de la atención es la razón por la que los contextos largos se encarecen — y la principal motivación detrás de los SSM y las arquitecturas híbridas — porque todo depende de qué tan rápido crece el coste a medida que la entrada se alarga. |

## Alcance

**Fuera de alcance (útil después):** determinante e inversa, SVD, Hessiana, integrales, estadística clásica, convexidad y combinatoria.

## Relacionados

- [ai-fundamentals](../ai-fundamentals/) — Los conceptos que habilitan estas matemáticas.
- [ai-creation](../ai-creation/) — Cuantización, fine-tuning y optimización en la práctica.
- [ai-simulation](../ai-simulation/) — RL, NEAT y agentes a gran escala.
- [ai-usage](../ai-usage/) — Similitud coseno, muestreo y RAG en la práctica.
