import { Injectable, inject, signal } from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, of, forkJoin, firstValueFrom } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { OpenWeatherClient } from '../../../core/api/openweather.client';
import { WeatherModel, ForecastList } from '../models/weather.model';
import { safeRetry, handleDomainError } from '../../../core/rx/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private client = inject(OpenWeatherClient);

  // City Signal (Source of truth)
  public city = signal<string>('');
  public lastError = signal<unknown>(null);

  // Debounced Signal (Derived)
  private debouncedCity = toSignal(
    toObservable(this.city).pipe(
      debounceTime(500),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  // --------------------------------------------------------------------------
  // Weather Resource (rxResource)
  // --------------------------------------------------------------------------
  public readonly weatherResource = rxResource({
    params: () => ({ city: this.debouncedCity() }),
    stream: ({ params: request }) => {
      const city = request.city;
      if (!city) return of(null);

      this.lastError.set(null);
      return this.client.getCurrentByCityName(city).pipe(
        safeRetry(2),
        map(response => this.transformToWeather(response)),
        handleDomainError('WeatherResource'),
        catchError(err => {
          this.lastError.set(err);
          return of(null);
        })
      );
    }
  });

  // --------------------------------------------------------------------------
  // Forecast Resource (rxResource)
  // --------------------------------------------------------------------------
  public readonly forecastResource = rxResource({
    params: () => ({ city: this.debouncedCity() }),
    stream: ({ params: request }) => {
      const city = request.city;
      if (!city) return of(null);

      this.lastError.set(null);
      return this.client.getForecastByCityName(city).pipe(
        safeRetry(2),
        // Transform API response to ForecastList
        map(response => this.transformToForecast(response)),
        handleDomainError('ForecastResource'),
        catchError(err => {
          this.lastError.set(err);
          return of(null);
        })
      );
    }
  });

  // --------------------------------------------------------------------------
  // Transformers (Pure Private Functions)
  // --------------------------------------------------------------------------
  private transformToWeather(response: any): WeatherModel {
    return {
      city: response.name,
      tempC: Math.round(response.main.temp),
      description: response.weather[0]?.description,
      icon: response.weather[0]?.icon,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      visibility: response.visibility,
      fetchedAt: Date.now()
    };
  }

  private transformToForecast(response: any): ForecastList {
    const dailyMap = new Map<string, {
      date: Date;
      temps: number[];
      icons: { icon: string; dt: number }[];
      description: string;
    }>();

    for (const item of response.list) {
      const localTimeMs = (item.dt + response.city.timezone) * 1000;
      const localDateObj = new Date(localTimeMs);
      const key = localDateObj.toISOString().split('T')[0];

      if (!dailyMap.has(key)) {
        dailyMap.set(key, {
          date: new Date(item.dt * 1000),
          temps: [],
          icons: [],
          description: item.weather[0]?.description
        });
      }

      const entry = dailyMap.get(key)!;
      entry.temps.push(item.main.temp_min, item.main.temp_max);
      entry.icons.push({
        icon: item.weather[0]?.icon,
        dt: localDateObj.getUTCHours()
      });
    }

    return Array.from(dailyMap.values())
      .slice(0, 5)
      .map(entry => {
        const bestIcon = entry.icons.reduce((prev, curr) => {
          return (Math.abs(curr.dt - 12) < Math.abs(prev.dt - 12)) ? curr : prev;
        });

        return {
          date: entry.date,
          tempMin: Math.round(Math.min(...entry.temps)),
          tempMax: Math.round(Math.max(...entry.temps)),
          icon: bestIcon.icon,
          description: entry.description
        };
      });
  }



  // Actions
  search(city: string): void {
    if (city.trim()) {
      this.lastError.set(null);
      this.city.set(city.trim());
    }
  }

  retry(): void {
    const city = this.city();
    if (city) {
      this.lastError.set(null);
      this.weatherResource.reload();
      this.forecastResource.reload();
    }
  }

  // Comparison Feature
  public async getComparison(cities: string[]): Promise<WeatherModel[]> {
    if (!cities.length) return [];

    const requests$ = forkJoin(
      cities.map(city =>
        this.client.getCurrentByCityName(city).pipe(
          map(response => this.transformToWeather(response)),
          catchError(() => of(null))
        )
      )
    );

    const results = await firstValueFrom(requests$);
    return results.filter((w): w is WeatherModel => w !== null);
  }
}
