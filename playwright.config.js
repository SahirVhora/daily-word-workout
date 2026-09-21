import playwright from '../node_modules/@playwright/test/index.js';

const { defineConfig, devices } = playwright;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } }
  ],
  webServer: {
    command: 'python3 -m http.server 4321 --bind 127.0.0.1',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: true
  }
});
