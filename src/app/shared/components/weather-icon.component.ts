import { Component, input, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export type OWMIconCode = string;

const VALID_CODES = new Set([
  '01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n',
  '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'
]);

/**
 * Componente standalone que renderiza iconos del clima usando assets locales SVG
 * y NgOptimizedImage para el mejor rendimiento (LCP).
 * 
 * Uso:
 * ```html
 * <app-weather-icon [code]="'01d'" [size]="64" [priority]="true" />
 * ```
 */
@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <img 
      [ngSrc]="iconPath()" 
      [width]="size()" 
      [height]="size()" 
      [priority]="priority()"
      [alt]="ariaLabel()"
      class="weather-icon"
    />
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .weather-icon {
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
      transition: transform 0.3s ease;
      display: block; /* Removes bottom spacing for inline images */
    }
    
    .weather-icon:hover {
      transform: scale(1.05);
    }
  `]
})
export class WeatherIconComponent {
  code = input.required<OWMIconCode>();
  size = input<number>(64);
  priority = input<boolean>(false);

  iconPath = computed(() => {
    const code = this.code();
    if (VALID_CODES.has(code)) {
      return `/assets/icons/weather/${code}.svg`;
    }
    return '/assets/icons/weather/fallback.svg';
  });

  ariaLabel = computed(() => {
    // Simple mapping for verification, could be expanded or i18n
    return `Icono de clima: ${this.code()}`;
  });
}
