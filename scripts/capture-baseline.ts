import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guardar en carpeta 'screenshots' en la raíz del proyecto
const BASELINE_DIR = path.resolve(__dirname, '../screenshots/baseline');

if (!fs.existsSync(BASELINE_DIR)) {
    fs.mkdirSync(BASELINE_DIR, { recursive: true });
}

async function captureBaseline() {
    console.log('🚀 Launching browser (Playwright)...');
    const browser: Browser = await chromium.launch({ headless: true });

    try {
        const page: Page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });

        console.log('📸 Capturing Weather Page...');
        // Usar puerto 4200 (Angular default)
        await page.goto('http://localhost:4200/', { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for main content
        await page.locator('h1').waitFor({ timeout: 10000 });

        // Full page screenshot
        await page.screenshot({
            path: path.join(BASELINE_DIR, 'baseline-weather-full.png'),
            fullPage: true
        });

        console.log('✅ Weather page captured');

        // Try to navigate to transit page
        try {
            console.log('📸 Attempting to capture Transit Page...');
            await page.goto('http://localhost:4200/transit', { waitUntil: 'networkidle', timeout: 10000 });
            await page.locator('h2').waitFor({ timeout: 5000 });

            await page.screenshot({
                path: path.join(BASELINE_DIR, 'baseline-transit-full.png'),
                fullPage: true
            });

            console.log('✅ Transit page captured');
        } catch (err) {
            console.log('⚠️ Transit page not found or failed to load');
        }

        console.log(`✅ All baseline screenshots captured in: ${BASELINE_DIR}`);

    } catch (error) {
        console.error('❌ Error capturing screenshots:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

captureBaseline();
