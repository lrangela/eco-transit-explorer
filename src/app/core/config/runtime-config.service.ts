import { Injectable, signal } from '@angular/core';
import {
  DEFAULT_RUNTIME_CONFIG,
  RuntimeConfig,
  RuntimeConfigIssue,
  RuntimeFeatureKey,
  RUNTIME_CONFIG_API_KEY_PLACEHOLDER,
  sanitizeRuntimeConfig,
} from './runtime-config.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RuntimeConfigService {
  private readonly configState = signal<RuntimeConfig>(DEFAULT_RUNTIME_CONFIG);

  readonly config = this.configState.asReadonly();
  readonly validationIssues = signal<RuntimeConfigIssue[]>([]);
  readonly hasBlockingIssues = signal(false);

  async load(): Promise<void> {
    try {
      const baseConfig = await this.fetchConfig('/runtime-config.json', true);
      const mergedConfig = mergeRuntimeConfig(baseConfig ?? {}, environment.runtimeConfigOverride ?? {});
      const parsedConfig = sanitizeRuntimeConfig(mergedConfig);
      this.configState.set(parsedConfig.config);
      this.validationIssues.set(parsedConfig.issues);
      this.hasBlockingIssues.set(parsedConfig.hasBlockingIssues);
    } catch {
      this.configState.set(DEFAULT_RUNTIME_CONFIG);
      this.validationIssues.set([
        {
          path: 'root',
          message: 'Runtime config could not be loaded. Falling back to defaults.',
          severity: 'error',
        },
      ]);
      this.hasBlockingIssues.set(true);
    }
  }

  weatherBaseUrl(): string {
    return this.configState().api.weatherBaseUrl;
  }

  weatherApiKey(): string {
    return this.configState().api.weatherApiKey;
  }

  weatherUnits(): string {
    return this.configState().api.weatherUnits;
  }

  weatherLanguage(): string {
    return this.configState().api.weatherLanguage;
  }

  transitApiBaseUrl(): string {
    return this.configState().api.transitBaseUrl;
  }

  isFeatureEnabled(feature: RuntimeFeatureKey): boolean {
    if ((feature === 'comparison') && !this.hasConfiguredWeatherApiKey()) {
      return false;
    }

    return this.configState().features[feature];
  }

  isConsoleLoggingEnabled(): boolean {
    return this.configState().observability.consoleLogging;
  }

  hasConfiguredWeatherApiKey(): boolean {
    const apiKey = this.configState().api.weatherApiKey.trim();
    return apiKey.length > 0 && apiKey !== RUNTIME_CONFIG_API_KEY_PLACEHOLDER;
  }

  private async fetchConfig(path: string, required: boolean): Promise<unknown | null> {
    const response = await fetch(path, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (required) {
        throw new Error(`Runtime config request failed with status ${response.status}`);
      }

      return null;
    }

    return response.json();
  }
}

function mergeRuntimeConfig(baseConfig: unknown, overrideConfig: unknown): unknown {
  if (!isRecord(baseConfig)) {
    return overrideConfig;
  }

  if (!isRecord(overrideConfig)) {
    return baseConfig;
  }

  return {
    ...baseConfig,
    ...overrideConfig,
    api: {
      ...readRecord(baseConfig['api']),
      ...readRecord(overrideConfig['api']),
    },
    features: {
      ...readRecord(baseConfig['features']),
      ...readRecord(overrideConfig['features']),
    },
    observability: {
      ...readRecord(baseConfig['observability']),
      ...readRecord(overrideConfig['observability']),
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}
