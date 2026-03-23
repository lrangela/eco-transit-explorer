import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { RuntimeConfigService } from '../../../core/config/runtime-config.service';
import { AppLoggerService } from '../../../core/logging/app-logger.service';
import {
  BikeAvailabilityStation,
  BikeAvailabilityStatus,
  CityBikeNetworkDto,
  CityBikeStationDto,
  MobilityMode,
} from '../models/transit.model';

@Injectable({
  providedIn: 'root',
})
export class TransitService {
  private readonly http = inject(HttpClient);
  private readonly runtimeConfig = inject(RuntimeConfigService);
  private readonly logger = inject(AppLoggerService);

  readonly filter = signal<'ALL' | MobilityMode>('ALL');
  readonly currentCity = signal('');
  readonly lastError = signal<string | null>(null);
  readonly hasLoaded = signal(false);

  readonly transitResource = rxResource({
    stream: () => {
      this.lastError.set(null);
      this.hasLoaded.set(false);

      return this.fetchCityBikeStations().pipe(
        catchError(() => {
          this.lastError.set('Bike network data is temporarily unavailable.');
          this.logger.error('[TransitService] City bikes API failed');
          return of<BikeAvailabilityStation[]>([]);
        }),
        finalize(() => this.hasLoaded.set(true)),
      );
    },
  });

  readonly filteredLines = computed(() => {
    const stations = this.transitResource.value() ?? [];
    const currentFilter = this.filter();

    if (currentFilter === 'ALL') {
      return stations;
    }

    return stations.filter((station) => station.mode === currentFilter);
  });

  reload(): void {
    this.transitResource.reload();
  }

  setFilter(filter: 'ALL' | MobilityMode): void {
    this.filter.set(filter);
  }

  private fetchCityBikeStations() {
    return this.http.get<CityBikeNetworkDto>(`${this.runtimeConfig.transitApiBaseUrl()}/networks/bicimad`).pipe(
      map((response) => {
        const city = response.network?.location?.city;
        if (city) {
          this.currentCity.set(city);
        }

        const stations = response.network?.stations ?? [];
        return stations.map((station) => this.mapStation(station, city ?? 'Unknown city'));
      }),
    );
  }

  private mapStation(station: CityBikeStationDto, city: string): BikeAvailabilityStation {
    const availableBikes = station.free_bikes ?? 0;
    const availableDocks = station.empty_slots ?? 0;
    const status = this.mapStatus(availableBikes);

    return {
      id: `CITYBIKES-${station.id}`,
      stationName: station.name,
      mode: 'BIKE',
      status,
      availableBikes,
      availableDocks,
      city,
      operatorId: 'BICIMAD',
      operatorLabel: 'CITYBIKES',
      alertLevel: status === 'EMPTY' ? 'WARNING' : 'NORMAL',
    };
  }

  private mapStatus(availableBikes: number): BikeAvailabilityStatus {
    if (availableBikes === 0) {
      return 'EMPTY';
    }

    if (availableBikes < 3) {
      return 'LIMITED';
    }

    return 'AVAILABLE';
  }
}
