import { Injectable, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError } from 'rxjs/operators';
import { firstValueFrom, forkJoin, map, of } from 'rxjs';
import { CurrentWeatherResponse, ForecastResponse } from '../../../core/api/openweather.types';
import { OpenWeatherClient } from '../../../core/api/openweather.client';
import { AppLoggerService } from '../../../core/logging/app-logger.service';
import { handleDomainError, safeRetry } from '../../../core/rx/operators';
import { ForecastList, WeatherComparisonResult, WeatherModel } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly client = inject(OpenWeatherClient);
  private readonly logger = inject(AppLoggerService);

  readonly city = signal('');
  readonly lastError = signal<unknown>(null);

  readonly weatherResource = rxResource({
    params: () => ({ city: this.city() }),
    stream: ({ params }) => {
      if (!params.city) {
        return of(null);
      }

      this.lastError.set(null);
      return this.client.getCurrentByCityName(params.city).pipe(
        safeRetry(2),
        map((response) => this.transformToWeather(response)),
        handleDomainError('WeatherResource', this.logger),
        catchError((error) => {
          this.lastError.set(error);
          return of(null);
        }),
      );
    },
  });

  readonly forecastResource = rxResource({
    params: () => ({ city: this.city() }),
    stream: ({ params }) => {
      if (!params.city) {
        return of(null);
      }

      this.lastError.set(null);
      return this.client.getForecastByCityName(params.city).pipe(
        safeRetry(2),
        map((response) => this.transformToForecast(response)),
        handleDomainError('ForecastResource', this.logger),
        catchError((error) => {
          this.lastError.set(error);
          return of(null);
        }),
      );
    },
  });

  search(city: string): void {
    const normalizedCity = city.trim();
    if (!normalizedCity) {
      return;
    }

    this.lastError.set(null);
    if (this.city() === normalizedCity) {
      this.retry();
      return;
    }

    this.city.set(normalizedCity);
  }

  retry(): void {
    if (!this.city()) {
      return;
    }

    this.lastError.set(null);
    this.weatherResource.reload();
    this.forecastResource.reload();
  }

  async getComparison(cities: string[]): Promise<WeatherComparisonResult> {
    if (!cities.length) {
      return {
        items: [],
        failedCities: [],
      };
    }

    const requests$ = forkJoin(
      cities.map((city) =>
        this.client.getCurrentByCityName(city, { suppressErrorToast: true }).pipe(
          map((response) => ({
            city,
            weather: this.transformToWeather(response),
            failed: false as const,
          })),
          catchError(() =>
            of({
              city,
              weather: null,
              failed: true as const,
            }),
          ),
        ),
      ),
    );

    const results = await firstValueFrom(requests$);
    return {
      items: results
        .filter((result) => !result.failed && result.weather !== null)
        .map((result) => result.weather),
      failedCities: results.filter((result) => result.failed).map((result) => result.city),
    };
  }

  private transformToWeather(response: CurrentWeatherResponse): WeatherModel {
    return {
      city: response.name,
      tempC: Math.round(response.main.temp),
      description: response.weather[0]?.description,
      icon: response.weather[0]?.icon,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      visibility: response.visibility,
      fetchedAt: Date.now(),
    };
  }

  private transformToForecast(response: ForecastResponse): ForecastList {
    const dailyMap = new Map<
      string,
      {
        date: Date;
        temps: number[];
        icons: { icon: string; hour: number }[];
        description: string;
      }
    >();

    for (const item of response.list) {
      const localTimeMs = (item.dt + response.city.timezone) * 1000;
      const localDate = new Date(localTimeMs);
      const key = localDate.toISOString().split('T')[0];

      if (!dailyMap.has(key)) {
        dailyMap.set(key, {
          date: new Date(item.dt * 1000),
          temps: [],
          icons: [],
          description: item.weather[0]?.description ?? 'Unavailable',
        });
      }

      const entry = dailyMap.get(key);
      if (!entry) {
        continue;
      }

      entry.temps.push(item.main.temp_min, item.main.temp_max);
      entry.icons.push({
        icon: item.weather[0]?.icon ?? 'fallback',
        hour: localDate.getUTCHours(),
      });
    }

    return Array.from(dailyMap.values())
      .slice(0, 5)
      .map((entry) => {
        const bestIcon = entry.icons.reduce((previous, current) => {
          return Math.abs(current.hour - 12) < Math.abs(previous.hour - 12) ? current : previous;
        });

        return {
          date: entry.date,
          tempMin: Math.round(Math.min(...entry.temps)),
          tempMax: Math.round(Math.max(...entry.temps)),
          icon: bestIcon.icon,
          description: entry.description,
        };
      });
  }
}
