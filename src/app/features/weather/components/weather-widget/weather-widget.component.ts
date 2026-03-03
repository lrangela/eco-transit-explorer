import { Component, input, output, computed, signal, effect } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { WeatherModel } from '../../models/weather.model';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon.component';


@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [DatePipe, DecimalPipe, FormsModule, CardModule, ButtonModule, InputTextModule, SkeletonModule, WeatherIconComponent],
  template: `
    <section class="weather-widget animate-fadeIn" aria-label="Current Weather">
      <div class="glass-card p-4">
        <!-- Floating Search Bar -->
        <div class="search-container mb-4">
          <div class="floating-search" data-testid="search-input-container">
            <i class="pi pi-search search-icon" aria-hidden="true"></i>
            <input 
              pInputText 
              type="text" 
              class="search-input" 
              data-testid="search-input"
              placeholder="Search city..." 
              aria-label="Buscar ciudad por nombre"
              aria-describedby="search-hint"
              [ngModel]="cityInput()"
              (ngModelChange)="onInputChange($event)"
              (keydown.enter)="onSearch()" />
            <span id="search-hint" class="sr-only">Ingresa el nombre de una ciudad y presiona Enter para buscar</span>
            <button 
              pButton
              class="search-button"
              data-testid="search-button"
              icon="pi pi-arrow-right" 
              aria-label="Buscar clima de la ciudad"
              [disabled]="!cityInput()"
              (click)="onSearch()">
            </button>
          </div>
        </div>

        <!-- State: Idle (No Value & Not Loading) -->
        @if (isIdle()) {
          <div class="text-center p-5 animate-fadeIn">
            <div class="mb-4">
              <i class="pi pi-cloud text-6xl text-white opacity-80"></i>
            </div>
            <p class="text-xl text-white font-light">Enter a city to see the weather</p>
          </div>
        }

        <!-- State: Loading -->
        @if (isLoading()) {
          <div class="flex flex-column align-items-center p-4" data-testid="loading-state">
            <p-skeleton width="100%" height="10rem" class="mb-3"></p-skeleton>
            <p-skeleton width="70%" height="4rem" class="mb-2"></p-skeleton>
            <div class="flex gap-3 mt-4 w-full">
              <p-skeleton width="33%" height="6rem"></p-skeleton>
              <p-skeleton width="33%" height="6rem"></p-skeleton>
              <p-skeleton width="33%" height="6rem"></p-skeleton>
            </div>
             <span class="sr-only">Cargando datos del clima...</span>
          </div>
        }

        <!-- State: Error -->
        @if (error()) {
           <div class="text-center p-4 animate-fadeIn" role="alert" data-testid="error-message">
            <div class="glass-card-strong p-4 border-red-500 border-1">
              <i class="pi pi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
              <p class="text-white text-lg mb-2">Error loading weather</p>
              <p class="text-white opacity-80 mb-4">{{ errorMessage() }}</p>
              <button 
                pButton 
                label="Retry" 
                icon="pi pi-refresh"
                class="p-button-outlined p-button-secondary text-white"
                (click)="onRetry()">
              </button>
            </div>
          </div>
        }

        <!-- State: Success (Data Display) -->
        @if (weather(); as w) {
          <article class="weather-content animate-fadeIn" data-testid="weather-card">
            
            <div class="current-weather">
              <h2 class="city-name">{{ w.city }}</h2>
              <p class="current-date">{{ w.fetchedAt | date:'fullDate' }}</p>

              <div class="weather-main">
                <div class="weather-icon-wrapper">
                   <!-- Usamos NgOptimizedImage via nuestro componente wrapper -->
                   @if (w.icon) {
                     <app-weather-icon 
                        [code]="w.icon" 
                        [size]="120" 
                        [priority]="true" />
                   }
                </div>
                
                <div class="temp-container">
                  <span class="temperature" data-testid="current-temperature">{{ w.tempC | number:'1.0-0' }}°</span>
                </div>
              </div>

               <p class="weather-description" data-testid="weather-description">{{ w.description }}</p>

              <div class="weather-details-grid glass-card-strong">
                <div class="detail-item">
                  <i class="pi pi-percentage"></i>
                  <span class="detail-label">Humidity</span>
                  <span class="detail-value">{{ w.humidity }}%</span>
                </div>
                <div class="detail-item">
                  <i class="pi pi-send"></i> <!-- Wind icon -->
                  <span class="detail-label">Wind</span>
                  <span class="detail-value">{{ w.windSpeed }} m/s</span>
                </div>
                 <div class="detail-item">
                  <i class="pi pi-eye"></i>
                  <span class="detail-label">Visibility</span>
                  <span class="detail-value">{{ w.visibility / 1000 }} km</span>
                </div>
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styleUrl: './weather-widget.component.scss'
})
export class WeatherWidgetComponent {
  // Inputs from Resource
  weather = input<WeatherModel | undefined>(undefined);
  isLoading = input<boolean>(false);
  error = input<unknown>(undefined);

  // Outputs
  search = output<string>();
  retry = output<void>();

  // Signal para el input (permite reactivity)
  cityInput = signal<string>('');
  private timeoutId: number | null = null;

  // Computed state helpers
  isIdle = computed(() => !this.weather() && !this.isLoading() && !this.error());

  errorMessage = computed(() => {
    const err = this.error() as any;
    if (!err) return '';
    return err.message || 'Unknown error occurred';
  });

  constructor() {
    // Effect con debounce: busca automáticamente 500ms después de que el usuario deja de escribir
    effect(() => {
      const city = this.cityInput();

      // Limpiar timeout anterior
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
      }

      // Si el input está vacío, no hacer nada
      if (!city.trim()) return;

      // Debounce de 500ms
      this.timeoutId = window.setTimeout(() => {
        console.log(`[WeatherWidget] Auto-search después de debounce: "${city}"`);
        this.search.emit(city.trim());
      }, 500);
    });
  }

  /**
   * Maneja cambios en el input (para actualizar el signal)
   */
  onInputChange(value: string): void {
    this.cityInput.set(value);
  }

  /**
   * Búsqueda manual (cuando se presiona Enter o botón)
   */
  onSearch() {
    const city = this.cityInput();
    console.log('[WeatherWidget] Manual search called with:', city);

    // Limpiar el debounce en curso
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (city.trim()) {
      this.search.emit(city.trim());
    }
  }

  onRetry() {
    this.retry.emit();
  }
}

