import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TransitService } from '../../data-access/transit.service';
import { WeatherService } from '../../../weather/data-access/weather.service';
import { BikeAvailabilityStatus, MobilityMode } from '../../models/transit.model';

@Component({
  selector: 'app-transit-dashboard',
  imports: [TagModule, CardModule, SkeletonModule, ButtonModule, NgOptimizedImage, PaginatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="p-4" aria-label="Bike Availability Dashboard">
      <header class="flex flex-column gap-2 mb-4">
        <div class="flex justify-content-between align-items-center">
          <h2 class="text-3xl font-bold text-900 m-0">BiciMAD Station Availability</h2>
          <button
            pButton
            icon="pi pi-refresh"
            (click)="service.reload()"
            [loading]="service.transitResource.isLoading()"
            label="Refresh"
            class="p-button-rounded p-button-text"
          ></button>
        </div>

        <p class="text-600 m-0" data-testid="transit-scope-note">
          Live bike-sharing station feed from CityBikes. This module shows bike and dock availability, not bus or metro arrival times.
        </p>

        <div class="flex align-items-center gap-4 text-600">
          <div class="flex align-items-center gap-2">
            <i class="pi pi-map-marker text-xl text-primary"></i>
            <span class="text-xl font-medium">{{ service.currentCity() || 'Network city unavailable' }}</span>
          </div>

          @if (weatherService.weatherResource.value(); as weather) {
            <div class="flex align-items-center gap-2 weather-chip pl-3 border-left-2 border-300">
              <div class="flex align-items-center relative" style="width: 32px; height: 32px;">
                @if (weather.icon) {
                  <img
                    [ngSrc]="'assets/icons/weather/' + weather.icon + '.svg'"
                    width="32"
                    height="32"
                    alt="Weather"
                    priority
                  />
                }
              </div>
              <span class="text-xl font-bold text-900">{{ weather.tempC }}°C</span>
              <span class="text-sm capitalize hidden sm:inline">{{ weather.description }}</span>
            </div>
          }
        </div>
      </header>

      @if (service.transitResource.isLoading()) {
        <div class="grid">
          @for (i of [1, 2, 3, 4]; track i) {
            <div class="col-12 md:col-6 lg:col-4">
              <p-skeleton height="7rem" styleClass="mb-2"></p-skeleton>
            </div>
          }
        </div>
      } @else if (service.lastError()) {
        <div class="text-center py-5" data-testid="transit-error">
          <p class="text-xl text-red-500 mb-3">{{ service.lastError() }}</p>
          <p class="text-600 mb-4">The public bike-station feed could not be refreshed.</p>
          <button pButton label="Retry" icon="pi pi-refresh" (click)="service.reload()"></button>
        </div>
      } @else {
        <div class="grid">
          @for (line of paginatedLines(); track line.id) {
            <article class="col-12 md:col-6 lg:col-4">
              <p-card styleClass="transit-card h-full surface-card shadow-2">
                <div class="flex justify-content-between align-items-start mb-3">
                  <div class="flex align-items-center gap-2">
                    <i [class]="getTypeIcon(line.mode)" class="text-xl"></i>
                    <span class="font-bold text-xl">{{ line.stationName }}</span>
                  </div>
                  <p-tag [value]="line.status" [severity]="getStatusSeverity(line.status)"></p-tag>
                </div>

                <div class="flex justify-content-between align-items-end">
                  <div class="text-600">
                    <span class="block text-sm">City</span>
                    <span class="font-semibold">{{ line.city }}</span>
                    <div class="mt-2 flex gap-1">
                      <p-tag [value]="line.operatorLabel" severity="secondary" styleClass="text-xs"></p-tag>
                      <p-tag [value]="line.operatorId" severity="info" styleClass="text-xs"></p-tag>
                    </div>
                  </div>

                  <div class="text-right">
                    <span class="text-sm text-500">Bikes available</span>
                    <div class="text-2xl font-bold text-primary">{{ line.availableBikes }}</div>
                    <span class="block text-sm text-500 mt-1">Docks free: {{ line.availableDocks }}</span>
                  </div>
                </div>
              </p-card>
            </article>
          } @empty {
            <div class="col-12 text-center py-5" data-testid="transit-empty">
              <p class="text-xl text-500">No bike-station availability is available from the current public feed.</p>
            </div>
          }
        </div>

        @if (service.filteredLines().length > 0) {
          <div class="mt-4">
            <p-paginator
              (onPageChange)="onPageChange($event)"
              [first]="first()"
              [rows]="rows()"
              [totalRecords]="service.filteredLines().length"
              [rowsPerPageOptions]="[6, 12, 24]"
            ></p-paginator>
          </div>
        }
      }
    </section>
  `,
  styles: [`
    :host { display: block; }
    .transit-card {
      border-left: 5px solid var(--primary-color);
    }
    .grid { display: flex; flex-wrap: wrap; margin-left: -0.5rem; margin-right: -0.5rem; }
    .col-12 { box-sizing: border-box; flex: 0 0 auto; padding: 0.5rem; width: 100%; }
    @media (min-width: 768px) {
      .md\\:col-6 { width: 50%; }
    }
    @media (min-width: 992px) {
      .lg\\:col-4 { width: 33.3333%; }
    }
  `]
})
export class TransitDashboardComponent {
  readonly service = inject(TransitService);
  readonly weatherService = inject(WeatherService);

  readonly first = signal(0);
  readonly rows = signal(12);

  readonly paginatedLines = computed(() => {
    const lines = this.service.filteredLines();
    const start = this.first();
    const end = start + this.rows();
    return lines.slice(start, end);
  });

  constructor() {
    effect(() => {
      const city = this.service.currentCity();
      if (city) {
        this.weatherService.search(city);
      }
    });
  }

  onPageChange(event: { first?: number; rows?: number }): void {
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? this.rows());
  }

  getStatusSeverity(status: BikeAvailabilityStatus): 'success' | 'warn' | 'danger' | 'info' | 'secondary' | 'contrast' | undefined {
    switch (status) {
      case 'AVAILABLE':
        return 'success';
      case 'LIMITED':
        return 'warn';
      case 'EMPTY':
        return 'danger';
      case 'OFFLINE':
        return 'secondary';
      default:
        return 'info';
    }
  }

  getTypeIcon(type: MobilityMode): string {
    switch (type) {
      case 'BIKE':
        return 'pi pi-compass';
      default:
        return 'pi pi-map-marker';
    }
  }
}
