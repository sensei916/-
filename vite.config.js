import { defineConfig } from 'vite';

// 相对路径，便于部署到 GitHub Pages 子路径
export default defineConfig({
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0, chunkSizeWarningLimit: 1200 }
});
