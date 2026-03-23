import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guardar en misma carpeta base para comparar
const BASELINE_DIR = path.resolve(__dirname, '../screenshots/baseline');

if (!fs.existsSync(BASELINE_DIR)) {
    fs.mkdirSync(BASELINE_DIR, { recursive: true });
}

async function capturePostRefactor() {
    console.log('🚀 Launching browser (Playwright) for POST-REFACTOR...');
    const browser: Browser = await chromium.launch({ headless: true });

    try {
        const page: Page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });

        console.log('📸 Capturing Post-Refactor Weather Page...');
        await page.goto('http://localhost:4200/', { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for main content
        await page.locator('h1').waitFor({ timeout: 10000 });

        // Full page screenshot
        await page.screenshot({
            path: path.join(BASELINE_DIR, 'postrefactor-weather-full.png'),
            fullPage: true
        });

        console.log('✅ Post-refactor weather page captured');

        // Try to navigate to transit page if it exists
        try {
            console.log('📸 Attempting to capture Post-Refactor Transit Page...');
            await page.goto('http://localhost:4200/transit', { waitUntil: 'networkidle', timeout: 10000 });
            await page.locator('h2').waitFor({ timeout: 5000 });

            await page.screenshot({
                path: path.join(BASELINE_DIR, 'postrefactor-transit-full.png'),
                fullPage: true
            });

            console.log('✅ Post-refactor transit page captured');
        } catch (err) {
            console.log('⚠️ Transit page not found or failed to load');
        }

        console.log('✅ All post-refactor screenshots captured successfully!');
        console.log('');
        console.log('🔍 VERIFICATION:');
        console.log(`  Directory: ${BASELINE_DIR}`);
        console.log('  - Baseline: baseline-weather-full.png, baseline-transit-full.png');
        console.log('  - Post-refactor: postrefactor-weather-full.png, postrefactor-transit-full.png');
        console.log('');
        console.log('Compare these images to verify no visual changes occurred.');

    } catch (error) {
        console.error('❌ Error capturing screenshots:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

capturePostRefactor();
