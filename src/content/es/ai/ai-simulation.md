---
eyebrow: IA
title: Simulación y Vida Artificial
subtitle: Neuroevolución, RL y agentes a gran escala
group: Simulación
order: 8
summary: Neuroevolución (NEAT), transición de evolución a aprendizaje por refuerzo y rendimiento de simulaciones a gran escala.
---

Simulación y vida artificial: agentes evolucionados (NEAT), transición a aprendizaje por refuerzo y rendimiento para miles de agentes en tiempo real.

## 1. Neuroevolución con NEAT

- **Evolucionar cerebros y cuerpos juntos** — La topología de la red y sus pesos coevolucionan en vez de fijar la arquitectura antes de entrenar: el cuerpo también se adapta. La base de NEAT.
- **Mutaciones** — Añadir, eliminar o dividir nodos y conexiones como operador de variación. Como la estructura misma muta, el espacio de búsqueda incluye arquitecturas que nadie diseñó a mano.
- **Conductas emergentes** — Cazar, huir o racionar energía aparecen sin programarse, solo por selección natural. La apuesta de la vida artificial: conducta compleja desde una función de fitness simple.
- **Complejificación** — Empieza con redes mínimas y deja que la evolución las agrande generación tras generación. Evita diseñar arquitecturas a mano.

## 2. De evolución a aprendizaje por refuerzo

- **Limitación de la evolución** — Cada mejora cuesta generaciones completas, y no hay adaptación durante la vida del individuo. El punto de partida del salto al RL.
- **Siguiente paso: RL** — El agente aprende y se adapta en tiempo real vía recompensas en lugar de esperar a la descendencia. Lo que la evolución hace entre generaciones, el RL lo hace dentro de una sola vida ([ai-mathematics](../ai-mathematics/), §7).
- **Ecuación de Bellman** — Relaciona el valor de un estado con el de sus estados siguientes: la base matemática de los métodos basados en valor.
- **Política y recompensa** — La política asigna acciones a estados y la recompensa define el objetivo. Juntas son las dos perillas que deciden qué aprende el agente.

## 3. Rendimiento a gran escala

Unos miles de agentes haciendo cada uno matemáticas triviales se convierten en una carga seria en cuanto todos interactúan; los problemas que aparecen son los clásicos de la programación de sistemas de alto rendimiento.

| Problema | Solución | Por qué importa |
|---|---|---|
| Miles de agentes interactuando en tiempo real | Particionado espacial (cuadrícula o quadtree) para que cada agente solo revise a sus vecinos. | Convierte la revisión de todos contra todos de coste cuadrático a aproximadamente lineal: la diferencia entre una simulación que corre y una que nunca arranca. |
| Memory leaks en ejecuciones largas | Asignación cuidadosa, propiedad estilo RAII, profiling. | Las simulaciones corren sin supervisión durante horas o días; una fuga pequeña por paso se acumula hasta que el proceso muere a mitad de carrera. |
| Condiciones de carrera entre agentes paralelos | Sincronización, patrones entity-component-system, paso de mensajes. | Dos hilos tocando el mismo estado producen resultados que dependen del planificador: bugs que aparecen una vez y nunca se reproducen. |
| Velocidad bruta | Lenguajes compilados cercanos al hardware: C++ primero, también Zig o Rust. | La física y la percepción por paso deben mantenerse en el rango de microsegundos para que miles de agentes mantengan el tiempo real. |
| Bugs que solo aparecen a gran escala | AddressSanitizer, ThreadSanitizer, profiling sistemático. | Los bugs de memoria e hilos se esconden en ejecuciones pequeñas y aparecen justo cuando la simulación es más difícil de depurar. |

## Relacionados

- [ai-mathematics](../ai-mathematics/) — Bellman, Markov, optimización.
- [ai-fundamentals](../ai-fundamentals/) — Estrategias (RL, neuroevolución).
- [ai-creation](../ai-creation/) — Entrenamiento/optimización.
