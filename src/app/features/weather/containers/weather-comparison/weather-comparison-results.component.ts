import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon.component';
import { WeatherModel } from '../../models/weather.model';

@Component({
  selector: 'app-weather-comparison-results',
  imports: [CommonModule, ButtonModule, CardModule, SkeletonModule, TableModule, TagModule, WeatherIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-card>
      @if (isLoading()) {
        <div class="p-4" role="status" aria-live="polite">
          <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
          <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
          <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
          <span class="sr-only">Loading city comparison data...</span>
        </div>
      } @else if (hasOnlyFailures()) {
        <div class="p-4 text-center text-red-500" data-testid="comparison-error">
          <i class="pi pi-exclamation-triangle text-4xl mb-2"></i>
          <p>Comparison data could not be loaded for the selected cities.</p>
          <p-button label="Retry" icon="pi pi-refresh" (onClick)="retryRequested.emit()" severity="danger" styleClass="mt-2"></p-button>
        </div>
      } @else {
        @if (failedCities().length > 0) {
          <div class="mb-3 p-3 border-round surface-100 text-700" data-testid="comparison-warning">
            Weather data is currently unavailable for: {{ failedCities().join(', ') }}.
          </div>
        }

        <div class="mb-3 text-600 text-sm">
          Comparing: <strong>{{ cities().join(', ') }}</strong>
        </div>

        <p-table [value]="items()" [tableStyle]="{ 'min-width': '50rem' }">
          <ng-template pTemplate="header">
            <tr>
              <th>City</th>
              <th>Condition</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Wind</th>
              <th>Status</th>
            </tr>
          </ng-template>

          <ng-template pTemplate="body" let-item>
            <tr>
              <td class="font-bold text-lg">{{ item.city }}</td>
              <td>
                <div class="flex align-items-center gap-2">
                  <app-weather-icon [code]="item.icon!" [size]="40" class="forecast-icon"></app-weather-icon>
                  <span class="capitalize">{{ item.description }}</span>
                </div>
              </td>
              <td>
                <span class="text-xl font-mono">{{ item.tempC }}°C</span>
              </td>
              <td>{{ item.humidity }}%</td>
              <td>{{ item.windSpeed }} m/s</td>
              <td>
                <p-tag [value]="getTempLabel(item.tempC)" [severity]="getTempSeverity(item.tempC)"></p-tag>
              </td>
            </tr>
          </ng-template>

          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="6">No comparison data available for the selected cities.</td>
            </tr>
          </ng-template>
        </p-table>
      }
    </p-card>
  `,
})
export class WeatherComparisonResultsComponent {
  readonly cities = input.required<string[]>();
  readonly items = input.required<WeatherModel[]>();
  readonly failedCities = input.required<string[]>();
  readonly isLoading = input<boolean>(false);
  readonly hasOnlyFailures = input<boolean>(false);
  readonly retryRequested = output<void>();

  getTempSeverity(temp: number): 'success' | 'info' | 'warn' | 'danger' | undefined {
    if (temp < 10) {
      return 'info';
    }

    if (temp > 25) {
      return 'danger';
    }

    return 'success';
  }

  getTempLabel(temp: number): string {
    if (temp < 10) {
      return 'Cold';
    }

    if (temp > 25) {
      return 'Hot';
    }

    return 'Moderate';
  }
}
