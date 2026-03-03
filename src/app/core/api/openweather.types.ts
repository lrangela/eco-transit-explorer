// DTOs for OpenWeatherMap API
// Based on https://openweathermap.org/current
// TODO: Confirm exact fields with API response/docs

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface CurrentWeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    weather: WeatherCondition[];
    base: string;
    main: MainWeatherData;
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number; // Added
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ForecastItem {
    dt: number;
    main: MainWeatherData;
    weather: WeatherCondition[];
    clouds: { all: number };
    wind: { speed: number; deg: number };
    visibility: number;
    pop: number; // Probability of precipitation
    dt_txt: string;
}

export interface ForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: {
        id: number;
        name: string;
        coord: { lat: number; lon: number };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}
