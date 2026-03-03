import { Injectable, signal, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TransitLine, TransitType } from '../models/transit.model';

@Injectable({
    providedIn: 'root'
})
export class TransitService {
    private http = inject(HttpClient);

    // Signal for filtering
    readonly filter = signal<'ALL' | TransitType>('ALL');

    // Signal for current city
    readonly currentCity = signal<string>('Unknown City');

    // Resource API using rxResource
    // logic: Only fetch Real Data (CityBikes) - Fetched once on load (or manual reload)
    readonly transitResource = rxResource({
        stream: () => {
            return this.fetchCityBikesData().pipe(
                catchError(err => {
                    console.error('CityBikes API failed', err);
                    return of([]); // Return empty array on error, NO simulation
                })
            );
        }
    });

    // Computed signal for filtered lines
    readonly filteredLines = computed(() => {
        const allLines = this.transitResource.value() || [];
        const currentFilter = this.filter();

        if (currentFilter === 'ALL') {
            return allLines;
        }
        return allLines.filter(line => line.type === currentFilter);
    });

    // Actions
    reload() {
        this.transitResource.reload();
    }

    setFilter(filter: 'ALL' | TransitType) {
        this.filter.set(filter);
    }

    /**
     * Fetches real bike-sharing station data from CityBikes API.
     * URL: https://api.citybik.es/v2/networks/bicimad (Madrid BiciMad network)
     * This API is CORS-enabled and works from browser environments.
     */
    private fetchCityBikesData() {
        return this.http.get<any>('https://api.citybik.es/v2/networks/bicimad').pipe(
            map(response => {
                // Extract City Name
                const city = response.network?.location?.city;
                if (city) {
                    this.currentCity.set(city);
                }

                const stations = response.network?.stations || [];

                const lines: TransitLine[] = stations.map((station: any) => {
                    const freeBikes = station.free_bikes || 0;
                    const emptySlots = station.empty_slots || 0;
                    const isAvailable = freeBikes > 0;

                    return {
                        id: `CITYBIKES-${station.id}`,
                        name: station.name,
                        type: 'BIKE',
                        status: isAvailable ? 'ON_TIME' : 'CLOSED',
                        nextArrival: freeBikes, // Using free_bikes as "bikes available"
                        destination: `${freeBikes} bikes, ${emptySlots} slots`,
                        agencyId: 'BICIMAD',
                        dataSource: 'CITYBIKES',
                        alertLevel: freeBikes === 0 ? 'WARNING' : 'NORMAL'
                    } as TransitLine;
                });

                return lines;
            })
        );
    }
}
