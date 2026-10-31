import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content" }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    summary: z.string().optional(),
    group: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { docs };
