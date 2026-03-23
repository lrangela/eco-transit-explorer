import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { TransitService } from './transit.service';
import { RuntimeConfigService } from '../../../core/config/runtime-config.service';

describe('TransitService', () => {
  let service: TransitService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TransitService,
        {
          provide: RuntimeConfigService,
          useValue: {
            transitApiBaseUrl: () => 'https://api.citybik.es/v2',
            isConsoleLoggingEnabled: () => false,
          },
        },
      ],
    });

    service = TestBed.inject(TransitService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should map bike availability without pretending ETA', async () => {
    service.reload();
    TestBed.flushEffects();

    const pendingRequests = httpMock.match('https://api.citybik.es/v2/networks/bicimad');
    const request = pendingRequests.at(-1);
    expect(request).toBeDefined();

    request!.flush({
      network: {
        location: { city: 'Madrid' },
        stations: [{ id: '1', name: 'Station 1', free_bikes: 2, empty_slots: 10 }],
      },
    });

    await Promise.resolve();
    TestBed.flushEffects();

    const line = service.filteredLines()[0];
    expect(line?.availableBikes).toBe(2);
    expect(line?.availableDocks).toBe(10);
    expect(line?.status).toBe('LIMITED');
    expect(service.currentCity()).toBe('Madrid');
  });

  it('should expose an error state when the API fails', async () => {
    service.reload();
    TestBed.flushEffects();

    const pendingRequests = httpMock.match('https://api.citybik.es/v2/networks/bicimad');
    const request = pendingRequests.at(-1);
    expect(request).toBeDefined();

    request!.flush('failure', { status: 500, statusText: 'Server error' });

    await Promise.resolve();
    TestBed.flushEffects();

    expect(service.lastError()).toBe('Bike network data is temporarily unavailable.');
    expect(service.filteredLines()).toEqual([]);
  });
});
