import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fuis18.github.io',
  base: process.env.NODE_ENV === 'production' ? '/software/' : '/',
  integrations: [sitemap()],
});
