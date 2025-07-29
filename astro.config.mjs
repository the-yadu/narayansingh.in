// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://narayansingh.in', // Add your actual site URL here
  output: 'static',
  integrations: [tailwind(), react(), mdx(), sitemap()],
});