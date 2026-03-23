import { ChangeDetectionStrategy, Component, computed, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WeatherService } from '../../data-access/weather.service';
import { WeatherComparisonResultsComponent } from './weather-comparison-results.component';

@Component({
  selector: 'app-weather-comparison',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    WeatherComparisonResultsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="p-4" aria-label="Weather Comparison">
      <h2 class="text-3xl font-bold mb-4 text-900 text-center">Multi-City Comparison</h2>
      <p class="text-center text-600 mb-3">
        Compare current conditions across up to three cities. This keeps the feature within the lightweight request limits of the weather API.
      </p>

      <div class="flex flex-column gap-2 mb-4" data-testid="comparison-form">
        <label for="comparison-cities" class="font-medium text-700">Cities to compare</label>
        <div class="comparison-form-row">
          <input
            id="comparison-cities"
            pInputText
            class="comparison-input"
            [formControl]="cityInput"
            [maxlength]="maxInputLength"
            data-testid="comparison-input"
            placeholder="London, New York, Tokyo"
            aria-describedby="comparison-hint"
          />
          <p-button
            label="Compare"
            icon="pi pi-search"
            (onClick)="applyCustomCities()"
            [disabled]="comparisonResource.isLoading()"
            data-testid="comparison-apply"
          ></p-button>
        </div>
        <small id="comparison-hint" class="text-600">Use up to 3 cities separated by commas.</small>
        @if (inputError()) {
          <small class="text-red-500" data-testid="comparison-input-error">{{ inputError() }}</small>
        }
      </div>

      <nav class="comparison-presets" aria-label="City presets">
        <p-button
          label="Capitals"
          icon="pi pi-globe"
          aria-label="Compare capital cities: London, New York, Tokyo"
          (onClick)="setPreset('capitals')"
          [outlined]="currentPreset() !== 'capitals'"
        ></p-button>
        <p-button
          label="USA"
          icon="pi pi-flag"
          aria-label="Compare United States cities: San Francisco, Chicago, Miami"
          (onClick)="setPreset('usa')"
          [outlined]="currentPreset() !== 'usa'"
        ></p-button>
        <p-button
          label="Europe"
          icon="pi pi-map"
          aria-label="Compare European cities: Paris, Berlin, Madrid"
          (onClick)="setPreset('europe')"
          [outlined]="currentPreset() !== 'europe'"
        ></p-button>
      </nav>

      @defer (on idle) {
        <app-weather-comparison-results
          [cities]="cities()"
          [items]="comparisonItems()"
          [failedCities]="failedCities()"
          [isLoading]="comparisonResource.isLoading()"
          [hasOnlyFailures]="hasOnlyFailures()"
          (retryRequested)="retry()"
        />
      } @placeholder {
        <section class="comparison-placeholder" aria-hidden="true"></section>
      }
    </section>
  `,
  styles: [`
    .comparison-form-row {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .comparison-input {
      width: 100%;
    }

    .comparison-presets {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1.25rem;
    }

    .comparison-placeholder {
      min-height: 18rem;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
    }

    @media (min-width: 768px) {
      .comparison-form-row {
        flex-direction: row;
      }
    }
  `],
})
export class WeatherComparisonComponent {
  private readonly service = inject(WeatherService);
  private static readonly maxCities = 3;
  readonly maxInputLength = 60;

  readonly currentPreset = signal<'capitals' | 'usa' | 'europe' | 'custom'>('capitals');
  readonly cities = signal<string[]>(['London', 'New York', 'Tokyo']);
  readonly inputError = signal<string | null>(null);
  readonly cityInput = new FormControl('London, New York, Tokyo', { nonNullable: true });

  readonly comparisonResource = resource({
    params: () => ({ cities: this.cities() }),
    loader: async ({ params }) => this.service.getComparison(params.cities),
  });

  readonly failedCities = computed(() => this.comparisonResource.value()?.failedCities ?? []);
  readonly comparisonItems = computed(() => this.comparisonResource.value()?.items ?? []);
  readonly hasOnlyFailures = computed(() => {
    const value = this.comparisonResource.value();
    return !!value && value.items.length === 0 && value.failedCities.length > 0;
  });

  setPreset(preset: 'capitals' | 'usa' | 'europe'): void {
    this.currentPreset.set(preset);
    this.inputError.set(null);

    switch (preset) {
      case 'capitals':
        this.setCities(['London', 'New York', 'Tokyo']);
        break;
      case 'usa':
        this.setCities(['San Francisco', 'Chicago', 'Miami']);
        break;
      case 'europe':
        this.setCities(['Paris', 'Berlin', 'Madrid']);
        break;
    }
  }

  applyCustomCities(): void {
    const parsedCities = this.parseCities(this.cityInput.getRawValue());
    if (parsedCities.length === 0) {
      this.inputError.set('Enter at least one valid city name.');
      return;
    }

    if (parsedCities.length > WeatherComparisonComponent.maxCities) {
      this.inputError.set('You can compare up to 3 cities at a time to stay within API limits.');
      return;
    }

    this.currentPreset.set('custom');
    this.inputError.set(null);
    this.setCities(parsedCities);
  }

  retry(): void {
    this.comparisonResource.reload();
  }

  private setCities(cities: string[]): void {
    this.cities.set(cities);
    this.cityInput.setValue(cities.join(', '), { emitEvent: false });
  }

  private parseCities(rawValue: string): string[] {
    return Array.from(
      new Set(
        rawValue
          .split(',')
          .map((city) => city.trim())
          .filter((city) => city.length >= 2),
      ),
    );
  }
}
