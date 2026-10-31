#!/usr/bin/env node
// Falla el build si el contenido no está balanceado entre idiomas.
// - Cada página `es/X` debe tener su par `en/X` y viceversa.
// - Cada página no-índice debe tener `group`, `order` y `summary` (para los índices automáticos).
import fs from "node:fs";
import path from "node:path";

const CONTENT = "src/content";
const LANGS = ["es", "en"];

function collect(lang) {
  const root = path.join(CONTENT, lang);
  const ids = [];
  (function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (name.endsWith(".md")) {
        const rel = path.relative(root, full).replace(/\.md$/, "");
        ids.push(rel);
      }
    }
  })(root);
  return ids;
}

function frontmatterOf(lang, rel) {
  const src = fs.readFileSync(path.join(CONTENT, lang, `${rel}.md`), "utf8");
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : "";
}

const [a, b] = LANGS;
const idsA = new Set(collect(a));
const idsB = new Set(collect(b));

const problems = [];

for (const id of idsA)
  if (!idsB.has(id)) problems.push(`Falta ${b}/${id}.md (existe ${a}/${id})`);
for (const id of idsB)
  if (!idsA.has(id)) problems.push(`Falta ${a}/${id}.md (existe ${b}/${id})`);

// Metadatos de índice: solo las páginas no-índice (id con 3+ segmentos) necesitan group/order/summary.
for (const lang of LANGS) {
  for (const id of collect(lang)) {
    const segments = id.split("/");
    if (segments.length < 3) continue; // índice (raíz o categoría)
    const fm = frontmatterOf(lang, id);
    for (const field of ["group", "order", "summary"]) {
      if (!new RegExp(`^${field}:`, "m").test(fm)) {
        problems.push(
          `${lang}/${id}.md sin "${field}" (necesario para el índice automático)`,
        );
      }
    }
  }
}

if (problems.length) {
  console.error("✗ Check de contenido falló:\n");
  for (const p of problems) console.error("  - " + p);
  console.error(`\n${problems.length} problema(s).`);
  process.exit(1);
}

console.log(
  `✓ Contenido balanceado: ${idsA.size} páginas en ${a}/${b}, todas con metadatos de índice.`,
);
