import { Component, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../data-access/weather.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon.component';

@Component({
    selector: 'app-weather-comparison',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, TagModule, CardModule, SkeletonModule, WeatherIconComponent],
    template: `
    <section class="p-4" aria-label="Weather Comparison">
      <h2 class="text-3xl font-bold mb-4 text-900 text-center">Multi-City Comparison</h2>
      <p class="text-center text-600 mb-5">Demonstrating RxJS wait-for-all concurrency with Zoneless Signals.</p>

      <!-- Controls -->
      <nav class="flex justify-content-center gap-2 mb-5" aria-label="City presets">
        <p-button 
          label="Capitals" 
          icon="pi pi-globe" 
          aria-label="Comparar climas de ciudades capitales: Londres, Nueva York, Tokio"
          (onClick)="setPreset('capitals')" 
          [outlined]="currentPreset() !== 'capitals'"></p-button>
        <p-button 
          label="USA" 
          icon="pi pi-flag" 
          aria-label="Comparar climas de ciudades estadounidenses: San Francisco, Chicago, Miami"
          (onClick)="setPreset('usa')" 
          [outlined]="currentPreset() !== 'usa'"></p-button>
        <p-button 
          label="Europe" 
          icon="pi pi-map" 
          aria-label="Comparar climas de ciudades europeas: París, Berlín, Madrid"
          (onClick)="setPreset('europe')" 
          [outlined]="currentPreset() !== 'europe'"></p-button>
      </nav>

      <!-- Content -->
      <p-card>
        @if (comparisonResource.isLoading()) {
            <div class="p-4" role="status" aria-live="polite">
                <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
                <span class="sr-only">Cargando datos de comparación de múltiples ciudades...</span>
            </div>
        } @else if (comparisonResource.error()) {
            <div class="p-4 text-center text-red-500">
                <i class="pi pi-exclamation-triangle text-4xl mb-2"></i>
                <p>Failed to load comparison data. One or more cities might be invalid or API rate limited.</p>
                <p-button label="Retry" icon="pi pi-refresh" (onClick)="retry()" severity="danger" styleClass="mt-2"></p-button>
            </div>
        } @else {
            <p-table [value]="comparisonResource.value() || []" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header">
                    <tr>
                        <th>City</th>
                        <th>Condition</th>
                        <th>Temperature</th>
                        <th>Status</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-item>
                    <tr>
                        <td class="font-bold text-lg">{{ item.city }}</td>
                        <td>
                            <div class="flex align-items-center gap-2">
                                <app-weather-icon 
                                  [code]="item.icon!"
                                  [size]="40"
                                  class="forecast-icon">
                                </app-weather-icon>
                                <span class="capitalize">{{ item.description }}</span>
                            </div>
                        </td>
                        <td>
                            <span class="text-xl font-mono">{{ item.tempC }}°C</span>
                        </td>
                        <td>
                             <p-tag [value]="getTempLabel(item.tempC)" [severity]="getTempSeverity(item.tempC)"></p-tag>
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="4">No data available.</td>
                    </tr>
                </ng-template>
            </p-table>
        }
      </p-card>
    </section>
  `
})
export class WeatherComparisonComponent {
    private service = inject(WeatherService);

    // State
    public currentPreset = signal<'capitals' | 'usa' | 'europe'>('capitals');
    public cities = signal<string[]>(['London', 'New York', 'Tokyo']);

    // Resource
    // Resource
    public comparisonResource = resource({
        params: () => ({ cities: this.cities() }),
        loader: async ({ params }) => {
            const cities = params.cities;
            return await this.service.getComparison(cities);
        }
    });

    // Actions
    setPreset(preset: 'capitals' | 'usa' | 'europe') {
        this.currentPreset.set(preset);
        switch (preset) {
            case 'capitals': this.cities.set(['London', 'New York', 'Tokyo']); break;
            case 'usa': this.cities.set(['San Francisco', 'Chicago', 'Miami']); break;
            case 'europe': this.cities.set(['Paris', 'Berlin', 'Madrid']); break;
        }
    }

    retry() {
        this.comparisonResource.reload();
    }

    getTempSeverity(temp: number): "success" | "info" | "warn" | "danger" | undefined {
        if (temp < 10) return 'info'; // Cold
        if (temp > 25) return 'danger'; // Hot
        return 'success'; // Moderate
    }

    getTempLabel(temp: number): string {
        if (temp < 10) return 'Cold';
        if (temp > 25) return 'Hot';
        return 'Moderate';
    }
}
