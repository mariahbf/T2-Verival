import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

export default defineConfig({
  testDir: './tests/e2e/specs',
  timeout: 120000,
  expect: {
    timeout: 5000,
  },
  reporter: [['list'], ['html']],
  use: {
    baseURL: process.env.LOCALHOST,
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  workers: process.env.CI ? 2 : undefined,
});
