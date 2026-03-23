export interface EnvironmentRuntimeConfigOverride {
    api?: {
        weatherBaseUrl?: string;
        weatherApiKey?: string;
        weatherUnits?: string;
        weatherLanguage?: string;
        transitBaseUrl?: string;
    };
    features?: {
        comparison?: boolean;
        transit?: boolean;
    };
    observability?: {
        consoleLogging?: boolean;
    };
}

export interface Environment {
    production: boolean;
    runtimeConfigOverride?: EnvironmentRuntimeConfigOverride;
}
