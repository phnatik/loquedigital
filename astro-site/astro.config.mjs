import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://loqueagent.com',
  trailingSlash: 'never',
  build: { format: 'file' },
});
