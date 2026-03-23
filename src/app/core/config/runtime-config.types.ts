export type WeatherUnits = 'standard' | 'metric' | 'imperial';

export interface WeatherApiRuntimeConfig {
  weatherBaseUrl: string;
  weatherApiKey: string;
  weatherUnits: WeatherUnits;
  weatherLanguage: string;
}

export interface BikeAvailabilityApiRuntimeConfig {
  transitBaseUrl: string;
}

export interface RuntimeFeatureFlags {
  comparison: boolean;
  transit: boolean;
}

export interface RuntimeObservabilityConfig {
  consoleLogging: boolean;
}

export interface RuntimeConfig {
  api: WeatherApiRuntimeConfig & BikeAvailabilityApiRuntimeConfig;
  features: RuntimeFeatureFlags;
  observability: RuntimeObservabilityConfig;
}

export type RuntimeFeatureKey = keyof RuntimeFeatureFlags;
export type RuntimeConfigIssueSeverity = 'warning' | 'error';

export interface RuntimeConfigIssue {
  path: string;
  message: string;
  severity: RuntimeConfigIssueSeverity;
}

export interface RuntimeConfigValidationResult {
  config: RuntimeConfig;
  issues: RuntimeConfigIssue[];
  hasBlockingIssues: boolean;
}

export const RUNTIME_CONFIG_API_KEY_PLACEHOLDER = '__OPENWEATHER_API_KEY__';
const VALID_WEATHER_UNITS = new Set<WeatherUnits>(['standard', 'metric', 'imperial']);
const LANGUAGE_CODE_PATTERN = /^[a-z]{2}(?:-[A-Z]{2})?$/;

export const DEFAULT_RUNTIME_CONFIG: RuntimeConfig = {
  api: {
    weatherBaseUrl: 'https://api.openweathermap.org/data/2.5',
    weatherApiKey: RUNTIME_CONFIG_API_KEY_PLACEHOLDER,
    weatherUnits: 'metric',
    weatherLanguage: 'en',
    transitBaseUrl: 'https://api.citybik.es/v2',
  },
  features: {
    comparison: true,
    transit: true,
  },
  observability: {
    consoleLogging: false,
  },
};

export function sanitizeRuntimeConfig(candidate: unknown): RuntimeConfigValidationResult {
  const issues: RuntimeConfigIssue[] = [];

  if (!isRecord(candidate)) {
    return {
      config: DEFAULT_RUNTIME_CONFIG,
      issues: [createIssue('root', 'Runtime config root must be an object. Falling back to defaults.', 'error')],
      hasBlockingIssues: true,
    };
  }

  const api = isRecord(candidate['api']) ? candidate['api'] : {};
  const features = isRecord(candidate['features']) ? candidate['features'] : {};
  const observability = isRecord(candidate['observability']) ? candidate['observability'] : {};

  if (!isRecord(candidate['api'])) {
    issues.push(createIssue('api', 'API section is missing or invalid. Falling back to defaults.', 'error'));
  }

  if (!isRecord(candidate['features'])) {
    issues.push(createIssue('features', 'Features section is missing or invalid. Falling back to defaults.', 'error'));
  }

  if (!isRecord(candidate['observability'])) {
    issues.push(createIssue('observability', 'Observability section is missing or invalid. Falling back to defaults.', 'error'));
  }

  const config: RuntimeConfig = {
    api: {
      weatherBaseUrl: readHttpsUrl(
        api,
        'weatherBaseUrl',
        DEFAULT_RUNTIME_CONFIG.api.weatherBaseUrl,
        'api.weatherBaseUrl',
        issues,
      ),
      weatherApiKey: readWeatherApiKey(api, issues),
      weatherUnits: readWeatherUnits(api, issues),
      weatherLanguage: readLanguageCode(api, issues),
      transitBaseUrl: readHttpsUrl(
        api,
        'transitBaseUrl',
        DEFAULT_RUNTIME_CONFIG.api.transitBaseUrl,
        'api.transitBaseUrl',
        issues,
      ),
    },
    features: {
      comparison: readBoolean(features, 'comparison', DEFAULT_RUNTIME_CONFIG.features.comparison, 'features.comparison', issues),
      transit: readBoolean(features, 'transit', DEFAULT_RUNTIME_CONFIG.features.transit, 'features.transit', issues),
    },
    observability: {
      consoleLogging: readBoolean(
        observability,
        'consoleLogging',
        DEFAULT_RUNTIME_CONFIG.observability.consoleLogging,
        'observability.consoleLogging',
        issues,
      ),
    },
  };

  return {
    config,
    issues,
    hasBlockingIssues: issues.some((issue) => issue.severity === 'error'),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function createIssue(path: string, message: string, severity: RuntimeConfigIssueSeverity): RuntimeConfigIssue {
  return { path, message, severity };
}

function readBoolean(
  source: Record<string, unknown>,
  key: string,
  fallback: boolean,
  path: string,
  issues: RuntimeConfigIssue[],
): boolean {
  const value = source[key];

  if (value === undefined) {
    return fallback;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  issues.push(createIssue(path, `${path} must be a boolean. Falling back to default.`, 'error'));
  return fallback;
}

function readHttpsUrl(
  source: Record<string, unknown>,
  key: string,
  fallback: string,
  path: string,
  issues: RuntimeConfigIssue[],
): string {
  const value = source[key];

  if (value === undefined) {
    return fallback;
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    issues.push(createIssue(path, `${path} must be a non-empty HTTPS URL. Falling back to default.`, 'error'));
    return fallback;
  }

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') {
      issues.push(createIssue(path, `${path} must use HTTPS. Falling back to default.`, 'error'));
      return fallback;
    }

    return parsed.toString().replace(/\/$/, '');
  } catch {
    issues.push(createIssue(path, `${path} must be a valid HTTPS URL. Falling back to default.`, 'error'));
    return fallback;
  }
}

function readWeatherUnits(source: Record<string, unknown>, issues: RuntimeConfigIssue[]): WeatherUnits {
  const value = source['weatherUnits'];

  if (value === undefined) {
    return DEFAULT_RUNTIME_CONFIG.api.weatherUnits;
  }

  if (typeof value === 'string' && VALID_WEATHER_UNITS.has(value as WeatherUnits)) {
    return value as WeatherUnits;
  }

  issues.push(
    createIssue(
      'api.weatherUnits',
      `api.weatherUnits must be one of ${Array.from(VALID_WEATHER_UNITS).join(', ')}. Falling back to default.`,
      'error',
    ),
  );
  return DEFAULT_RUNTIME_CONFIG.api.weatherUnits;
}

function readLanguageCode(source: Record<string, unknown>, issues: RuntimeConfigIssue[]): string {
  const value = source['weatherLanguage'];

  if (value === undefined) {
    return DEFAULT_RUNTIME_CONFIG.api.weatherLanguage;
  }

  if (typeof value === 'string' && LANGUAGE_CODE_PATTERN.test(value.trim())) {
    return value.trim();
  }

  issues.push(
    createIssue(
      'api.weatherLanguage',
      'api.weatherLanguage must follow a simple locale code such as en or es-PE. Falling back to default.',
      'error',
    ),
  );
  return DEFAULT_RUNTIME_CONFIG.api.weatherLanguage;
}

function readWeatherApiKey(source: Record<string, unknown>, issues: RuntimeConfigIssue[]): string {
  const value = source['weatherApiKey'];

  if (value === undefined) {
    issues.push(
      createIssue(
        'api.weatherApiKey',
        'api.weatherApiKey is missing. Weather features require a local override or deployment injection.',
        'warning',
      ),
    );
    return DEFAULT_RUNTIME_CONFIG.api.weatherApiKey;
  }

  if (typeof value !== 'string' || value.trim().length === 0) {
    issues.push(
      createIssue(
        'api.weatherApiKey',
        'api.weatherApiKey must be a non-empty string. Falling back to template placeholder.',
        'warning',
      ),
    );
    return DEFAULT_RUNTIME_CONFIG.api.weatherApiKey;
  }

  if (value.trim() === RUNTIME_CONFIG_API_KEY_PLACEHOLDER) {
    issues.push(
      createIssue(
        'api.weatherApiKey',
        'api.weatherApiKey still uses the template placeholder. Add a local override or inject a deployment-specific runtime config.',
        'warning',
      ),
    );
  }

  return value.trim();
}
