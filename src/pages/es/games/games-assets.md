---
layout: ../../../layouts/Layout.astro
eyebrow: Games
title: Games Assets
subtitle: Pipelines de texturas, modelos 3D, audio y tilemaps
---

El juego no corre con archivos crudos: cada asset pasa por un pipeline de importación, optimización y empaquetado antes de llegar a la GPU o al mezclador de audio. El pipeline bien diseñado hace que agregar contenido sea barato.

## Texturas

Las imágenes que cubren modelos o dibujan sprites.

| Formato   | Rol                                             |
| --------- | ----------------------------------------------- |
| **PNG**   | Fuente sin pérdida: el formato de importación   |
| **KTX2/Basis** | Formato comprimido en GPU: VRAM y ancho de banda |
| **Atlas/Sprite sheet** | Muchas imágenes en una sola textura |

- **Compresión en GPU vs. PNG** — PNG se descomprime a RAM completa; KTX2/Basis Universal queda comprimido en memoria de video: la diferencia entre cargar 50 MB o 500 MB de VRAM.
- **Sprite atlas** — agrupar sprites en una sola textura evita cambios de bind por draw call (batching): la optimización 2D más importante.
- **Mipmaps** — versiones pre-escaladas de la misma textura para la distancia: evitan aliasing y mejoran cache.

## Modelos 3D

| Formato  | Rol                                                    |
| -------- | ------------------------------------------------------ |
| **glTF/GLB** | El estándar abierto de intercambio ("el JPEG del 3D") |
| **FBX**  | El formato legacy de DCC tools (Maya, Blender export)  |
| **OBJ**  | Geometría simple estática, sin animación               |

- **glTF** es el destino moderno: malla + materiales PBR + esqueleto + animaciones en un formato binario eficiente; Godot lo carga nativo y los demás tienen pipelines maduros.
- **LOD (Level of Detail)** — versiones de menor poligonaje del mismo modelo que el engine elige por distancia.
- **Optimización** — merge de meshes estáticas, baking de iluminación a lightmaps, y reducción de draw calls: el contenido también respeta el presupuesto de frame de [games-graphics](../games-graphics/).

## Audio

| Tipo         | Formato típico | Cuándo                                            |
| ------------ | -------------- | ------------------------------------------------- |
| **Música**   | OGG Vorbis     | Comprimido, streaming desde disco                 |
| **SFX cortos** | WAV          | Decodificación instantánea, quedan en memoria     |
| **Voz/diálogos** | OGG/MP3    | Comprimido, con prioridad de reproducción         |

- **Regla práctica** — música larga comprimida en streaming; efectos cortos en WAV sin comprimir porque se disparan muchas veces simultáneas.
- **Audio buses** — master, música, SFX, voz como canales separados: el mixer permite volumen global por categoría y ducking (bajar la música cuando hay diálogo).
- **Audio posicional 3D** — atenuación y paneo según distancia/dirección al emisor: mismo cálculo de vectores de [games-math-physics](../games-math-physics/).

## Tilemaps

El sistema clásico de niveles 2D: el mapa es una grilla que referencia tiles de un tileset compartido.

- **Tileset** — la hoja de tiles (suelo, paredes, decoración) de donde la grilla toma piezas; combinado con el sprite atlas es una sola textura para todo el nivel.
- **Autotiling / terrain sets** — reglas que eligen automáticamente el borde/cornisa correcta según los vecinos: pintar terreno sin colocar cada borde a mano.
- **Tiled** — el editor de referencia open source: exporta JSON/TMX que casi cualquier framework importa (Raylib y Bevy via crates/plugins); Godot tiene TileMap integrado con autotiling propio.
- **Capas** — fondo, gameplay (colisiones), decoración frontal como capas separadas sobre la misma grilla: el orden de dibujo y las colisiones salen gratis de la organización.

## El pipeline general

1. **Fuente** — arte crudo del artista (Blender, Aseprite, DAW).
2. **Export** — a formatos intermedios (PNG, glTF, WAV/OGG, TMX).
3. **Import/procesamiento** — compresión (KTX2, OGG), generación de mipmaps/atlas/LODs, metadata.
4. **Empaquetado** — asset packs o filesystem virtual del engine; hot-reload durante desarrollo.
5. **Carga en runtime** — async loading con pantalla de carga, pooling de assets reusables.

> Un pipeline de assets es IaC aplicado al contenido: reproducible, automatizable y auditable — el mismo espíritu que [ops-containers](../../ops/ops-containers/) aplica a imágenes. Cada paso manual es un lugar donde el build se rompe o el peso del juego se dispara.