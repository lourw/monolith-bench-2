/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const unitTestWorkers = Math.max(
  1,
  Number(process.env['UNIT_TEST_WORKERS'] ?? 1) || 1,
);

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/shop',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: '@org/shop',
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts', '../../tools/test-delay/setup.mjs'],
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    // UNIT_TEST_WORKERS spec files run at once (default 1: one at a time).
    fileParallelism: unitTestWorkers > 1,
    maxWorkers: unitTestWorkers,
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
      include: ['src/**/*.{ts,tsx}'],
    },
  },
}));
