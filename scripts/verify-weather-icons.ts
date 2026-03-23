import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';

const CITIES = [
    { name: 'Dubai', expected: 'Clear' },
    { name: 'London', expected: 'Clouds' },
    { name: 'Yakutsk', expected: 'Snow' },
    { name: 'Singapore', expected: 'Thunderstorm' },
    { name: 'San Francisco', expected: 'Mist/Fog' },
    { name: 'Hilo', expected: 'Rain' },
    { name: 'Bergen', expected: 'Drizzle/Rain' },
    { name: 'Cairo', expected: 'Clear' },
    { name: 'Tokyo', expected: 'Clouds' },
    { name: 'Sydney', expected: 'Variable' }
];

const LOG_FILE = 'verification_results.txt';

const log = (msg: string) => {
    console.log(msg);
    fs.appendFileSync(LOG_FILE, msg + '\n');
};

(async () => {
    const browser: Browser = await chromium.launch({ headless: true });
    const page: Page = await browser.newPage();

    // reset file
    fs.writeFileSync(LOG_FILE, '');

    try {
        log('Navigating to localhost:4200...');
        // Usamos puerto 4200 (Angular default) en lugar de 4300 del script viejo
        await page.goto('http://localhost:4200', { waitUntil: 'networkidle' });

        log('\n--- Weather Icon Verification Results ---');
        log('City'.padEnd(15) + 'Src'.padEnd(35) + 'Alt'.padEnd(30) + 'Priority');
        log('-'.repeat(90));

        for (const city of CITIES) {
            console.log(`Testing ${city.name}...`);

            // Find input - Playwright usa locators, mas robusto
            const input = page.locator('input[placeholder="Search city..."]');
            await input.waitFor({ state: 'visible' });

            // Clear input
            await input.click();
            await input.fill('');

            // Type city
            await input.fill(city.name);
            await input.press('Enter');

            // Wait for weather icon to update
            try {
                // Wait up to 10s using locator
                const iconLocator = page.locator('.weather-icon img');
                await iconLocator.waitFor({ state: 'visible', timeout: 10000 });

                // Small delay to ensure render updates if animation is occurring
                await page.waitForTimeout(1000);

                const src = await iconLocator.getAttribute('src');
                const alt = await iconLocator.getAttribute('alt');
                const priority = await iconLocator.getAttribute('fetchpriority');

                const cleanSrc = src ? src.split('/').slice(-4).join('/') : 'null';

                log(
                    city.name.padEnd(15) +
                    cleanSrc.padEnd(35) +
                    (alt || 'null').substring(0, 28).padEnd(30) +
                    (priority || 'null')
                );

            } catch (e: any) {
                log(city.name.padEnd(15) + 'ERROR: Icon not found (Timeout/Error: ' + e.message + ')'.padEnd(35));
            }

            // Rate limit prevention delay
            await page.waitForTimeout(2000);
        }
        log('-'.repeat(90));

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
