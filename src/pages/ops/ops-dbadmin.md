---
layout: ../../layouts/Layout.astro
eyebrow: Ops
title: Ops DB Admin
subtitle: Administración y escalado de bases de datos
---

Operar una base de datos en producción es un oficio aparte: mantenerla alta, replicarla para disponibilidad, escalarla cuando crece, y cambiar el esquema sin tirar el servicio.

## Motores

| Motor          | Tipo                | Uso típico                            |
| -------------- | ------------------- | ------------------------------------- |
| **PostgreSQL** | SQL                 | Aplicaciones web, datos estructurados |
| **MySQL**      | SQL                 | Web tradicional, compatible con MySQL |
| **Redis**      | Key-Value (memoria) | Caché, sesiones, colas, real-time     |
| **MongoDB**    | Document Store      | Esquemas flexibles, catálogos, CMS    |

La comparación de ACID, JOINs, escalabilidad y disponibilidad — y cuándo elegir cada uno desde la perspectiva de desarrollo — está en [back-databases](../../dev/back-databases/). Acá importa el lado operativo: mantenerlos vivos y escalables, sin importar cuál se haya elegido.

## Replicación

Copiar los datos en más de una instancia para disponibilidad y para repartir lecturas.

- **Por qué existe:** una sola instancia de base de datos es un punto único de falla y un techo de capacidad de lectura — si esa instancia cae, el sistema entero pierde acceso a los datos; si recibe más lecturas de las que aguanta, no hay dónde repartir la carga. La replicación resuelve ambos problemas manteniendo copias sincronizadas de los mismos datos.

### Replicación primaria/réplica

**Qué hace:** todas las escrituras van a una instancia primaria; esa instancia propaga los cambios a una o más réplicas, que atienden lecturas.

- **Gana:** disponibilidad de lectura (si una réplica cae, las demás siguen sirviendo) y capacidad de lectura paralela (repartir el tráfico de lectura entre varias instancias en vez de saturar una sola).
- **Pierde:** lag de replicación — las réplicas no están sincronizadas al instante con el primario, así que una lectura desde una réplica puede devolver un dato ligeramente desactualizado. Esto importa especialmente si la aplicación lee inmediatamente después de escribir y espera ver su propio cambio reflejado.

### Failover

**Qué hace:** si el primario cae, una de las réplicas se promueve a nuevo primario, automáticamente o con intervención mínima.

- **Gana:** alta disponibilidad sin depender de que un humano note la caída y actúe a mano.
- **Pierde:** la promoción no es instantánea — hay una ventana entre la caída del primario y que una réplica termine de promoverse (verificar que está al día, redirigir el tráfico), durante la cual el sistema puede quedar sin poder escribir.

### Multi-primary / clusters

**Qué hace:** en vez de un solo nodo que recibe todas las escrituras, varios nodos aceptan escrituras simultáneamente y se sincronizan entre sí.

- **Gana:** escalado de escritura — el techo de cuánto se puede escribir ya no está limitado a lo que soporta un solo nodo.
- **Pierde:** complejidad de conflicto real — si dos nodos reciben una escritura distinta sobre el mismo dato casi al mismo tiempo, alguien tiene que resolver cuál gana (o el sistema tiene que estar diseñado para que ese conflicto no pueda ocurrir). Es la estrategia más potente y también la más difícil de operar bien de las tres.

| Patrón                           | Qué hace                                        | Gana                               | Pierde                      |
| -------------------------------- | ----------------------------------------------- | ---------------------------------- | --------------------------- |
| **Replicación primaria/replica** | Escrituras a una, lecturas a múltiples réplicas | Disponibilidad, lecturas paralelas | Replica con lag             |
| **Failover**                     | Si el primario cae, una réplica toma su lugar   | Alta disponibilidad automática     | Promoción no es instantánea |
| **Multi-primary / clusters**     | Distribuir escrituras entre nodos               | Escalado de escritura              | Complejidad de conflicto    |

- **RPO/RTO** — qué tanto de los datos se puede perder (_Recovery Point Objective_) y cuánto tarda en volver el sistema (_Recovery Time Objective_); se define aquí, en el diseño de replicación y failover, y se concreta en la práctica en [ops-backup](../ops-backup/).
- **La replicación protege de la caída de un nodo; no sustituye el backup** — un borrado accidental o una corrupción de datos se replica también, a la misma velocidad que cualquier escritura legítima. Si alguien borra una tabla por error, esa réplica "sana" también la pierde en segundos. Por eso replicación (alta disponibilidad) y backup (recuperación ante desastre o error humano) son problemas relacionados pero distintos, y ninguno reemplaza al otro.

## Sharding

Distribuir los datos entre múltiples bases por una clave: la estrategia de **escalado horizontal** cuando una sola base ya no da — ni replicando lecturas ni con un nodo primario más grande.

- **Por qué existe:** la replicación reparte _lecturas_, pero todas las escrituras siguen yendo a (o coordinándose entre) un conjunto limitado de nodos. Cuando el volumen de datos o de escrituras supera lo que cualquier configuración de replicación puede sostener, la única salida es partir los datos mismos en piezas más chicas que vivan en bases separadas — eso es sharding.

| Cómo                   | Qué implica                                              |
| ---------------------- | -------------------------------------------------------- |
| **Por clave de shard** | Cada fila va a un shard según un campo (usuario, región) |
| **Ruteo**              | La app pregunta al shard correcto por clave              |
| **Tradeoff**           | Consultas que cruzan shards se complican y encarecen     |

- **La elección de la clave de shard lo es todo:** una mala clave (por ejemplo, una que concentre desproporcionadamente los datos de los usuarios más activos en un solo shard) recrea el mismo problema de cuello de botella que el sharding buscaba resolver, solo que ahora distribuido de forma desigual.
- **El costo real no es solo técnico:** consultas que antes eran un simple JOIN dentro de una sola base ahora requieren consultar múltiples shards y combinar los resultados en la capa de aplicación — sharding no es gratis, cambia qué tipo de queries siguen siendo baratas y cuáles se vuelven caras.

**Cuándo sharding:** cuando las lecturas/escrituras exceden lo que una base única aguanta en costo o performance, y el volumen justifica la complejidad operativa y de ruteo que agrega — es, casi siempre, la última herramienta a la que se recurre, después de haber agotado réplicas, mejor hardware, e índices bien pensados.

## Migraciones de Esquema

Cambiar la estructura de la base (tablas, columnas, índices) sin romper el servicio.

- **Por qué es un problema distinto a "solo cambiar código":** a diferencia del código de una aplicación (que se puede reemplazar entero de una vez), el esquema de una base convive con los datos que ya existen y con las réplicas que replican ese esquema — un cambio mal aplicado no se revierte con solo desplegar la versión anterior del código, porque el estado de la base ya cambió.

- **Migraciones versionadas** — los cambios de esquema viven en archivos versionados y se aplican en orden, igual que el código. Esto da trazabilidad de qué cambió el esquema, cuándo y por qué, y permite reproducir el mismo esquema en cualquier entorno aplicando la misma secuencia. Mismo espíritu de [ops-iac](../ops-iac/).
- **Incrementales y reversibles** — cada cambio debe poder aplicarse y, si falla o se degrada, revertirse. Migraciones grandes y monolíticas son más difíciles de revertir limpiamente que una secuencia de cambios chicos, cada uno con su propio camino de vuelta.
- **Compatibilidad durante el deploy** — el código nuevo y la base nueva casi nunca se despliegan en el mismo instante exacto: hay una ventana donde código viejo y esquema nuevo (o código nuevo y esquema viejo) conviven. Por eso el patrón clásico es _additive first_: agregar columnas o tablas nuevas sin tocar las existentes, desplegar el código que las usa, y solo después (en un paso separado) eliminar lo que quedó obsoleto — nunca romper en un solo paso algo que el código en producción todavía necesita.

> Operar una base es operar un sistema degradable y con estado: donde el resto de la infraestructura se recrea, la base persiste — por eso todo lo relacionado a respaldo vive en [ops-backup](../ops-backup/).
