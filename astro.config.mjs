import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://saulrmzlpz.github.io',
  integrations: [tailwind()],
});
