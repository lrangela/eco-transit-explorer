export interface WeatherModel {
    city: string;
    tempC: number;
    description?: string;
    icon?: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    fetchedAt: number;
}

export interface ForecastDay {
    date: Date;
    tempMin: number;
    tempMax: number;
    icon: string;
    description: string;
}

export type ForecastList = ForecastDay[];

export interface WeatherComparisonResult {
    items: WeatherModel[];
    failedCities: string[];
}
