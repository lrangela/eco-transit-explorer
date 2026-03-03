import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from './api.tokens';
import { CurrentWeatherResponse, ForecastResponse } from './openweather.types';

@Injectable({
    providedIn: 'root'
})
export class OpenWeatherClient {
    private http = inject(HttpClient);
    private baseUrl = inject(OPENWEATHER_BASE_URL);
    private apiKey = inject(OPENWEATHER_API_KEY);

    /**
     * Get current weather by city name.
     * Path: /weather
     * Params: q={cityName}, appid={apiKey}, units=metric
     */
    getCurrentByCityName(cityName: string): Observable<CurrentWeatherResponse> {
        const params = new HttpParams()
            .set('q', cityName)
            .set('appid', this.apiKey)
            .set('units', 'metric');

        return this.http.get<CurrentWeatherResponse>(`${this.baseUrl}/weather`, { params });
    }

    /**
     * Get 5 day / 3 hour forecast by city name.
     * Path: /forecast
     * Params: q={cityName}, appid={apiKey}, units=metric
     */
    getForecastByCityName(cityName: string): Observable<ForecastResponse> {
        const params = new HttpParams()
            .set('q', cityName)
            .set('appid', this.apiKey)
            .set('units', 'metric');

        return this.http.get<ForecastResponse>(`${this.baseUrl}/forecast`, { params });
    }
}
