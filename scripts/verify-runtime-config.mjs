import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const VALID_WEATHER_UNITS = new Set(['standard', 'metric', 'imperial']);
const LANGUAGE_CODE_PATTERN = /^[a-z]{2}(?:-[A-Z]{2})?$/;

function isRecord(value) {
  return typeof value === 'object' && value !== null;
}

function readHttpsUrl(source, key, path, issues) {
  const value = source[key];
  if (typeof value !== 'string' || value.trim().length === 0) {
    issues.push(`${path} must be a non-empty HTTPS URL.`);
    return false;
  }

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') {
      issues.push(`${path} must use HTTPS.`);
      return false;
    }
    return true;
  } catch {
    issues.push(`${path} must be a valid HTTPS URL.`);
    return false;
  }
}

function readBoolean(source, key, path, issues) {
  const value = source[key];
  if (typeof value === 'boolean') {
    return true;
  }

  issues.push(`${path} must be a boolean.`);
  return false;
}

function readWeatherUnits(source, key, path, issues) {
  const value = source[key];
  if (typeof value === 'string' && VALID_WEATHER_UNITS.has(value)) {
    return true;
  }

  issues.push(`${path} must be one of ${Array.from(VALID_WEATHER_UNITS).join(', ')}.`);
  return false;
}

function readLanguageCode(source, key, path, issues) {
  const value = source[key];
  if (typeof value === 'string' && LANGUAGE_CODE_PATTERN.test(value.trim())) {
    return true;
  }

  issues.push(`${path} must use a locale code such as en or es-PE.`);
  return false;
}

const runtimeConfigPath = join(process.cwd(), 'public', 'runtime-config.json');
const rawConfig = readFileSync(runtimeConfigPath, 'utf8');
const parsedConfig = JSON.parse(rawConfig);
const issues = [];

if (!isRecord(parsedConfig)) {
  issues.push('Runtime config root must be an object.');
} else {
  if (!isRecord(parsedConfig.api)) {
    issues.push('api section is missing or invalid.');
  } else {
    readHttpsUrl(parsedConfig.api, 'weatherBaseUrl', 'api.weatherBaseUrl', issues);
    if (!(typeof parsedConfig.api.weatherApiKey === 'string' && parsedConfig.api.weatherApiKey.trim().length > 0)) {
      issues.push('api.weatherApiKey must be a non-empty string.');
    }
    readWeatherUnits(parsedConfig.api, 'weatherUnits', 'api.weatherUnits', issues);
    readLanguageCode(parsedConfig.api, 'weatherLanguage', 'api.weatherLanguage', issues);
    readHttpsUrl(parsedConfig.api, 'transitBaseUrl', 'api.transitBaseUrl', issues);
  }

  if (!isRecord(parsedConfig.features)) {
    issues.push('features section is missing or invalid.');
  } else {
    readBoolean(parsedConfig.features, 'comparison', 'features.comparison', issues);
    readBoolean(parsedConfig.features, 'transit', 'features.transit', issues);
  }

  if (!isRecord(parsedConfig.observability)) {
    issues.push('observability section is missing or invalid.');
  } else {
    readBoolean(parsedConfig.observability, 'consoleLogging', 'observability.consoleLogging', issues);
  }
}

if (issues.length > 0) {
  console.error('Runtime config validation failed:');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Runtime config is valid: ${runtimeConfigPath}`);
