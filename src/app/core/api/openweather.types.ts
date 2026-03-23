export interface WeatherConditionDto {
    description: string;
    icon: string;
}

export interface WeatherMeasurementsDto {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
}

export interface CurrentWeatherResponse {
    name: string;
    weather: WeatherConditionDto[];
    main: WeatherMeasurementsDto;
    visibility: number;
    wind: {
        speed: number;
    };
    dt: number;
}

export interface ForecastItem {
    dt: number;
    main: WeatherMeasurementsDto;
    weather: WeatherConditionDto[];
}

export interface ForecastResponse {
    list: ForecastItem[];
    city: {
        name: string;
        timezone: number;
    };
}
