import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CurrentWeatherResponse, ForecastResponse } from './openweather.types';
import { RuntimeConfigService } from '../config/runtime-config.service';
import { UnauthorizedError } from '../error/domain-errors';
import { SKIP_ERROR_TOAST } from './http-error-interceptor';

interface OpenWeatherRequestOptions {
    suppressErrorToast?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class OpenWeatherClient {
    private readonly http = inject(HttpClient);
    private readonly runtimeConfig = inject(RuntimeConfigService);

    getCurrentByCityName(cityName: string, options?: OpenWeatherRequestOptions): Observable<CurrentWeatherResponse> {
        const requestOptions = this.buildRequestOptions(cityName, options);
        if (requestOptions instanceof UnauthorizedError) {
            return throwError(() => requestOptions);
        }

        const { baseUrl, params, context } = requestOptions;
        return this.http.get<CurrentWeatherResponse>(`${baseUrl}/weather`, { params, context });
    }

    getForecastByCityName(cityName: string, options?: OpenWeatherRequestOptions): Observable<ForecastResponse> {
        const requestOptions = this.buildRequestOptions(cityName, options);
        if (requestOptions instanceof UnauthorizedError) {
            return throwError(() => requestOptions);
        }

        const { baseUrl, params, context } = requestOptions;
        return this.http.get<ForecastResponse>(`${baseUrl}/forecast`, { params, context });
    }

    private buildRequestOptions(cityName: string, options?: OpenWeatherRequestOptions): {
        baseUrl: string;
        params: HttpParams;
        context: HttpContext;
    } | UnauthorizedError {
        if (!this.runtimeConfig.hasConfiguredWeatherApiKey()) {
            return new UnauthorizedError(
                'Weather API key is not configured. Add it to src/environments/environment.local.ts for local development or inject it during deployment.',
            );
        }

        const params = new HttpParams()
            .set('q', cityName)
            .set('appid', this.runtimeConfig.weatherApiKey())
            .set('units', this.runtimeConfig.weatherUnits())
            .set('lang', this.runtimeConfig.weatherLanguage());

        return {
            baseUrl: this.runtimeConfig.weatherBaseUrl(),
            params,
            context: new HttpContext().set(SKIP_ERROR_TOAST, options?.suppressErrorToast ?? false),
        };
    }
}
