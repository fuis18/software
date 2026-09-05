---
layout: ../../../layouts/Layout.astro
eyebrow: Games
title: Games Assets
subtitle: Texture, 3D model, audio, and tilemap pipelines
---

The game does not run with raw files: every asset goes through an import, optimization, and packaging pipeline before reaching the GPU or audio mixer. A well-designed pipeline makes adding content cheap.

## Textures

The images that cover models or draw sprites.

| Format      | Role                                             |
| ----------- | ------------------------------------------------ |
| **PNG**     | Lossless source: the import format               |
| **KTX2/Basis** | GPU-compressed format: VRAM and bandwidth     |
| **Atlas/Sprite sheet** | Many images in a single texture          |

- **GPU compression vs. PNG** — PNG decompresses fully to RAM; KTX2/Basis Universal stays compressed in video memory: the difference between loading 50 MB or 500 MB of VRAM.
- **Sprite atlas** — grouping sprites into a single texture avoids bind changes per draw call (batching): the most important 2D optimization.
- **Mipmaps** — pre-scaled versions of the same texture for distance: they prevent aliasing and improve cache.

## 3D Models

| Format      | Role                                                    |
| ----------- | ------------------------------------------------------- |
| **glTF/GLB** | The open exchange standard ("the JPEG of 3D")         |
| **FBX**     | The legacy format of DCC tools (Maya, Blender export)  |
| **OBJ**     | Simple static geometry, no animation                   |

- **glTF** is the modern destination: mesh + PBR materials + skeleton + animations in an efficient binary format; Godot loads it natively and the others have mature pipelines.
- **LOD (Level of Detail)** — lower-polygon versions of the same model that the engine chooses by distance.
- **Optimization** — merging static meshes, baking lighting into lightmaps, and reducing draw calls: content also respects the per-frame budget of [games-graphics](../games-graphics/).

## Audio

| Type          | Typical format | When                                            |
| ------------- | -------------- | ----------------------------------------------- |
| **Music**     | OGG Vorbis     | Compressed, streaming from disk                 |
| **Short SFX** | WAV            | Instant decoding, stays in memory               |
| **Voice/Dialogue** | OGG/MP3  | Compressed, with playback priority              |

- **Practical rule** — long music compressed and streamed; short effects in uncompressed WAV because they fire many times simultaneously.
- **Audio buses** — master, music, SFX, voice as separate channels: the mixer allows global volume per category and ducking (lowering music when there is dialogue).
- **3D positional audio** — attenuation and panning based on distance/direction to the emitter: same vector math from [games-math-physics](../games-math-physics/).

## Tilemaps

The classic 2D level system: the map is a grid referencing tiles from a shared tileset.

- **Tileset** — the sheet of tiles (ground, walls, decoration) from which the grid takes pieces; combined with the sprite atlas it is a single texture for the entire level.
- **Autotiling / terrain sets** — rules that automatically choose the correct edge/corner based on neighbors: painting terrain without placing each edge by hand.
- **Tiled** — the reference open-source editor: exports JSON/TMX that almost any framework imports (Raylib and Bevy via crates/plugins); Godot has TileMap built in with its own autotiling.
- **Layers** — background, gameplay (collisions), foreground decoration as separate layers on the same grid: draw order and collisions come free from the organization.

## The General Pipeline

1. **Source** — raw art from the artist (Blender, Aseprite, DAW).
2. **Export** — to intermediate formats (PNG, glTF, WAV/OGG, TMX).
3. **Import/processing** — compression (KTX2, OGG), mipmap/atlas/LOD generation, metadata.
4. **Packaging** — asset packs or the engine's virtual filesystem; hot-reload during development.
5. **Runtime loading** — async loading with a loading screen, pooling of reusable assets.

> An asset pipeline is IaC applied to content: reproducible, automatable, and auditable — the same spirit that [ops-containers](../../ops/ops-containers/) applies to images. Every manual step is a place where the build breaks or the game's weight balloons.
