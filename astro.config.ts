import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { defaultLang, hreflangOf, languages } from './src/i18n/config';

const site = 'https://fuis18.github.io';
const base = process.env.NODE_ENV === 'production' ? '/software/' : '/';

export default defineConfig({
  site,
  base,
  i18n: {
    locales: [...languages],
    defaultLocale: defaultLang,
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => page !== new URL(base, site).href,
      i18n: {
        defaultLocale: defaultLang,
        locales: Object.fromEntries(languages.map((code) => [code, hreflangOf(code)])),
      },
    }),
  ],
});
