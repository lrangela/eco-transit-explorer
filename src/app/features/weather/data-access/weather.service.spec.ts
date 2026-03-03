import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { OpenWeatherClient } from '../../../core/api/openweather.client';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { CurrentWeatherResponse } from '../../../core/api/openweather.types';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('WeatherService', () => {
  let service: WeatherService;
  let clientSpy: { getCurrentByCityName: any; getForecastByCityName: any };

  beforeEach(() => {
    // Mock Client using Vitest
    clientSpy = {
      getCurrentByCityName: vi.fn(),
      getForecastByCityName: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        WeatherService,
        { provide: OpenWeatherClient, useValue: clientSpy }
      ]
    });

    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getComparison (Concurrency)', () => {
    it('should call client.getCurrentByCityName N times and return mapped models', async () => {
      // Arrange
      const cities = ['London', 'Paris'];

      const mockResponseLondon: Partial<CurrentWeatherResponse> = {
        name: 'London',
        main: { temp: 10, temp_min: 8, temp_max: 12, pressure: 1000, humidity: 80, feels_like: 9 },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        dt: 1234567890,
        sys: { country: 'GB', sunrise: 0, sunset: 0, id: 1, type: 1 },
        wind: { speed: 5, deg: 100 },
        visibility: 10000
      };

      const mockResponseParis: Partial<CurrentWeatherResponse> = {
        name: 'Paris',
        main: { temp: 15, temp_min: 14, temp_max: 16, pressure: 1010, humidity: 60, feels_like: 14 },
        weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
        dt: 1234567890,
        sys: { country: 'FR', sunrise: 0, sunset: 0, id: 2, type: 1 },
        wind: { speed: 4, deg: 10 },
        visibility: 10000
      };

      // RxJS Mock Returns
      clientSpy.getCurrentByCityName.mockReturnValueOnce(of(mockResponseLondon as CurrentWeatherResponse));
      clientSpy.getCurrentByCityName.mockReturnValueOnce(of(mockResponseParis as CurrentWeatherResponse));

      // Act
      const results = await service.getComparison(cities);

      // Assert
      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledTimes(2);
      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledWith('London');
      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledWith('Paris');

      expect(results.length).toBe(2);
      expect(results[0].city).toBe('London');
      expect(results[0].tempC).toBe(10);
      expect(results[1].city).toBe('Paris');
      expect(results[1].tempC).toBe(15);
    });

    it('should return empty array if no cities provided', async () => {
      const results = await service.getComparison([]);
      expect(results).toEqual([]);
      expect(clientSpy.getCurrentByCityName).not.toHaveBeenCalled();
    });
  });
  describe('search debounce', () => {
    it('should debounce search input by 500ms', async () => {
      service.weatherResource.value();

      // 1. Initial State
      service.search('M');
      await new Promise(resolve => setTimeout(resolve, 200));
      expect(clientSpy.getCurrentByCityName).not.toHaveBeenCalled();

      // 2. Type "Ma" (resets timer)
      service.search('Ma');
      await new Promise(resolve => setTimeout(resolve, 400));
      expect(clientSpy.getCurrentByCityName).not.toHaveBeenCalled();

      // 3. Type "Mad" (resets timer)
      // Provide mock return for the expected call
      clientSpy.getCurrentByCityName.mockReturnValue(of({
        name: 'Mad',
        main: { temp: 20, humidity: 50 },
        weather: [{ description: 'desc', icon: '01d' }],
        wind: { speed: 10 },
        visibility: 10000
      } as any));

      service.search('Mad');
      await new Promise(resolve => setTimeout(resolve, 550));
      TestBed.flushEffects();
      await Promise.resolve();

      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledWith('Mad');
      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledTimes(1);
    });
  });
});
