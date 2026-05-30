import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://romainblachier.fr',
  integrations: [mdx(), sitemap(), react(), tailwind({ applyBaseStyles: false })],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
