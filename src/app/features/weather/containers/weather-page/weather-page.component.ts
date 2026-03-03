import { Component, inject, computed } from '@angular/core';
import { WeatherService } from '../../data-access/weather.service';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { ForecastWidgetComponent } from '../../components/forecast-widget/forecast-widget.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [
    WeatherWidgetComponent,
    ForecastWidgetComponent,
    SkeletonModule,
    TabsModule,
    SharedModule
  ],
  templateUrl: './weather-page.component.html',
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  `]
})
export class WeatherPageComponent {
  public service = inject(WeatherService);

  /**
   * Computed signal that maps weather description to background gradient class
   */
  weatherBackgroundClass = computed(() => {
    const weather = this.service.weatherResource.value();
    if (!weather) return 'weather-bg-default';

    const desc = weather.description?.toLowerCase() || '';
    if (desc.includes('clear') || desc.includes('sun')) return 'weather-bg-clear';
    if (desc.includes('rain') || desc.includes('drizzle')) return 'weather-bg-rain';
    if (desc.includes('cloud')) return 'weather-bg-clouds';
    if (desc.includes('snow')) return 'weather-bg-snow';
    return 'weather-bg-default';
  });

}
