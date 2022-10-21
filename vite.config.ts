import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

const plugins = [];

// 打包生产环境才引入的插件
if (process.env.NODE_ENV === 'production') {
  process.env.ANALYZE &&
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [splitVendorChunkPlugin(), react(), ...plugins],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
});
