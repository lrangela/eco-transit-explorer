import { ChangeDetectionStrategy, Component, inject, linkedSignal, effect, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransitService } from '../../data-access/transit.service';
import { WeatherService } from '../../../weather/data-access/weather.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { NgOptimizedImage } from '@angular/common'; // Import CommonModule and NgOptimizedImage
import { TransitType, TransitStatus } from '../../models/transit.model';

@Component({
  selector: 'app-transit-dashboard',
  imports: [FormsModule, SelectButtonModule, TagModule, CardModule, SkeletonModule, ButtonModule, NgOptimizedImage, PaginatorModule], // Added PaginatorModule
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="p-4" aria-label="Transit Dashboard">
      <header class="flex flex-column gap-2 mb-4">
        <div class="flex justify-content-between align-items-center">
            <h2 class="text-3xl font-bold text-900 m-0 flex align-items-center gap-2">
                Transit Status 
                <span class="text-sm bg-red-500 text-white px-2 py-1 border-round animate-pulse">LIVE</span>
            </h2>
            <button pButton icon="pi pi-refresh" (click)="service.reload()" [loading]="service.transitResource.isLoading()" label="Refresh" class="p-button-rounded p-button-text"></button>
        </div>
        
        <div class="flex align-items-center gap-4 text-600">
            <!-- City Info -->
            <div class="flex align-items-center gap-2">
                <i class="pi pi-map-marker text-xl text-primary"></i>
                <span class="text-xl font-medium">{{ service.currentCity() }}</span>
            </div>

            <!-- Weather Info (Lightweight) -->
            @if (weatherService.weatherResource.value(); as weather) {
                <div class="flex align-items-center gap-2 weather-chip pl-3 border-left-2 border-300">
                    <div class="flex align-items-center relative" style="width: 32px; height: 32px;">
                       @if(weather.icon) {
                            <img [ngSrc]="'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png'" 
                                 width="32" height="32" 
                                 alt="Weather"
                                 priority>
                       }
                    </div>
                    <span class="text-xl font-bold text-900">{{ weather.tempC }}°C</span>
                    <span class="text-sm capitalize hidden sm:inline">{{ weather.description }}</span>
                </div>
            }
        </div>
      </header>

      <!-- Filters -->
      <nav class="flex justify-content-center mb-5" aria-label="Filter transit by type">
        <p-selectButton 
          [options]="filterOptions" 
          optionLabel="label" 
          optionValue="value"
          [(ngModel)]="currentFilter"
          (ngModelChange)="onFilterChange($event)">
        </p-selectButton>
      </nav>

      <!-- Loading State -->
      @if (service.transitResource.isLoading()) {
        <div class="grid">
          @for (i of [1,2,3,4]; track i) {
            <div class="col-12 md:col-6 lg:col-4">
              <p-skeleton height="7rem" styleClass="mb-2"></p-skeleton>
            </div>
          }
        </div>
      } 
      
      <!-- List -->
      @else {
        <div class="grid">
            @for (line of paginatedLines(); track line.id) {
                <article class="col-12 md:col-6 lg:col-4">
                    <p-card styleClass="transit-card h-full surface-card shadow-2">
                        <div class="flex justify-content-between align-items-start mb-3">
                            <div class="flex align-items-center gap-2">
                                <i [class]="getTypeIcon(line.type)" class="text-xl"></i>
                                <span class="font-bold text-xl">{{ line.name }}</span>
                            </div>
                            <p-tag [value]="line.status" [severity]="getStatusSeverity(line.status)"></p-tag>
                        </div>
                        
                        <div class="flex justify-content-between align-items-end">
                             <div class="text-600">
                                <span class="block text-sm">Destination</span>
                                <span class="font-semibold">{{ line.destination }}</span>
                                <div class="mt-2 flex gap-1">
                                    <p-tag [value]="line.dataSource" severity="secondary" styleClass="text-xs"></p-tag>
                                    @if(line.agencyId) {
                                        <p-tag [value]="line.agencyId" severity="info" styleClass="text-xs"></p-tag>
                                    }
                                </div>
                             </div>
                             
                             <div class="text-right">
                                @if (line.status === 'CLOSED') {
                                    <span class="text-red-500 font-bold">CLOSED</span>
                                } @else {
                                    <span class="text-sm text-500">Arrives in</span>
                                    <div class="text-2xl font-bold text-primary">{{ line.nextArrival }} min</div>
                                }
                             </div>
                        </div>
                    </p-card>
                </article>
            } @empty {
                <div class="col-12 text-center py-5">
                    <p class="text-xl text-500">No transit lines found for this filter.</p>
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
                    [rowsPerPageOptions]="[6, 12, 24]">
                </p-paginator>
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
    /* Grid Helpers since we might not have full PrimeFlex */
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
  public service = inject(TransitService);
  public weatherService = inject(WeatherService);

  // Pagination State
  first = signal(0);
  rows = signal(12);

  // LinkedSignal for bidirectional sync with service filter
  currentFilter = linkedSignal(() => this.service.filter());

  // Derived state for pagination
  paginatedLines = computed(() => {
    const lines = this.service.filteredLines();
    const start = this.first();
    const end = start + this.rows();
    return lines.slice(start, end);
  });

  filterOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Bike', value: 'BIKE' }
  ];

  constructor() {
    // Sync Transit City -> Weather Service
    effect(() => {
      const city = this.service.currentCity();
      // Avoid "Unknown City" or empty string triggering bad API calls
      if (city && city !== 'Unknown City') {
        this.weatherService.search(city);
      }
    });
  }

  onFilterChange(value: 'ALL' | TransitType) {
    this.service.setFilter(value);
    // Reset pagination to first page when filter changes
    this.first.set(0);
  }

  onPageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);
  }

  getStatusSeverity(status: TransitStatus): "success" | "warn" | "danger" | "info" | "secondary" | "contrast" | undefined {
    switch (status) {
      case 'ON_TIME': return 'success';
      case 'DELAYED': return 'warn';
      case 'CLOSED': return 'danger';
      default: return 'info';
    }
  }

  getTypeIcon(type: TransitType): string {
    switch (type) {
      case 'BIKE': return 'pi pi-compass';
      default: return 'pi pi-map-marker';
    }
  }
}
