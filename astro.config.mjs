import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fuis18.github.io',
  base: '/Programming/',
  integrations: [sitemap()],
});
