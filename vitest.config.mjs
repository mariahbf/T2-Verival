import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['src/**/*.test.{js,ts,jsx,tsx}', 'tests/**/*.test.{js,ts,jsx,tsx}'], 
    environment: 'jsdom',
    globals: true, 
    setupFiles: ['./vitest.setup.ts'], 
  },
});
