import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OpenWeatherClient } from '../../../core/api/openweather.client';
import { CurrentWeatherResponse } from '../../../core/api/openweather.types';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let clientSpy: {
    getCurrentByCityName: ReturnType<typeof vi.fn>;
    getForecastByCityName: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    clientSpy = {
      getCurrentByCityName: vi.fn(),
      getForecastByCityName: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        WeatherService,
        { provide: OpenWeatherClient, useValue: clientSpy },
      ],
    });

    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mapped comparison data and failed cities', async () => {
    const london: CurrentWeatherResponse = {
      name: 'London',
      main: { temp: 10, temp_min: 8, temp_max: 12, humidity: 80 },
      weather: [{ description: 'clear sky', icon: '01d' }],
      dt: 1234567890,
      wind: { speed: 5 },
      visibility: 10000,
    };

    clientSpy.getCurrentByCityName.mockReturnValueOnce(of(london));
    clientSpy.getCurrentByCityName.mockReturnValueOnce(throwError(() => new Error('rate limited')));

    const result = await service.getComparison(['London', 'Paris']);

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.city).toBe('London');
    expect(result.failedCities).toEqual(['Paris']);
  });

  it('should trigger a fetch immediately when search is called', async () => {
    clientSpy.getCurrentByCityName.mockReturnValue(
      of({
        name: 'Madrid',
        main: { temp: 22, temp_min: 20, temp_max: 24, humidity: 40 },
        weather: [{ description: 'clear sky', icon: '01d' }],
        dt: 123,
        wind: { speed: 3 },
        visibility: 10000,
      } satisfies CurrentWeatherResponse),
    );
    clientSpy.getForecastByCityName.mockReturnValue(
      of({
        city: { name: 'Madrid', timezone: 0 },
        list: [],
      }),
    );

    service.search('Madrid');
    service.weatherResource.value();
    TestBed.flushEffects();
    await Promise.resolve();

    expect(clientSpy.getCurrentByCityName).toHaveBeenCalledWith('Madrid');
  });

  it('should retry current city when search is called with the same city', () => {
    const weatherReload = vi.spyOn(service.weatherResource, 'reload');
    const forecastReload = vi.spyOn(service.forecastResource, 'reload');

    service.city.set('Madrid');
    service.search('Madrid');

    expect(weatherReload).toHaveBeenCalledTimes(1);
    expect(forecastReload).toHaveBeenCalledTimes(1);
  });
});
