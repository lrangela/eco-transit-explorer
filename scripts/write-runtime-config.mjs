import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const runtimeConfigPath = join(process.cwd(), 'public', 'runtime-config.json');
const rawConfig = readFileSync(runtimeConfigPath, 'utf8');
const parsedConfig = JSON.parse(rawConfig);

const weatherApiKey = process.env.OPENWEATHER_API_KEY?.trim();
if (!weatherApiKey) {
  console.error('OPENWEATHER_API_KEY is required to write a deployment-ready runtime config.');
  process.exit(1);
}

const weatherBaseUrl = process.env.OPENWEATHER_BASE_URL?.trim();
const weatherUnits = process.env.OPENWEATHER_UNITS?.trim();
const weatherLanguage = process.env.OPENWEATHER_LANGUAGE?.trim();

const nextConfig = {
  ...parsedConfig,
  api: {
    ...parsedConfig.api,
    weatherApiKey,
    ...(weatherBaseUrl ? { weatherBaseUrl } : {}),
    ...(weatherUnits ? { weatherUnits } : {}),
    ...(weatherLanguage ? { weatherLanguage } : {}),
  },
};

writeFileSync(runtimeConfigPath, `${JSON.stringify(nextConfig, null, 2)}\n`, 'utf8');
console.log(`Runtime config written to ${runtimeConfigPath}`);
