import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    timeout: 60 * 1000, // ✅ Aumentar timeout global a 60s para evitar flaky tests locales
    expect: {
        timeout: 10 * 1000,
    },
    testDir: './e2e/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    // ✅ LIMITAR WORKERS: Usar 50% de CPU locally, 1 en CI.
    // 12 workers es demasiado para Angular dev server.
    workers: process.env.CI ? 1 : '50%',
    reporter: 'html',

    use: {
        baseURL: 'http://localhost:4300', // ✅ Puerto 4300 para evitar conflictos con 4200 ocupado
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

    webServer: {
        command: 'npm run start:local -- --port 4300', // ✅ Forzar puerto 4300
        url: 'http://localhost:4300',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});
