import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { WeatherService } from '../../data-access/weather.service';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { ForecastWidgetComponent } from '../../components/forecast-widget/forecast-widget.component';
import { RuntimeConfigService } from '../../../../core/config/runtime-config.service';

@Component({
  selector: 'app-weather-page',
  imports: [
    WeatherWidgetComponent,
    ForecastWidgetComponent,
  ],
  templateUrl: './weather-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .page-title {
      margin: 0 0 1.25rem;
      color: white;
      font-size: 1.875rem;
      font-weight: 700;
      text-align: center;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .config-warning {
      margin-bottom: 1rem;
      padding: 0.75rem;
      border-radius: 0.5rem;
      background: rgba(255, 255, 255, 0.88);
      color: var(--text-900);
    }

    .forecast-placeholder {
      margin-top: 1rem;
      min-height: 10rem;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
    }
  `]
})
export class WeatherPageComponent {
  public service = inject(WeatherService);
  public runtimeConfig = inject(RuntimeConfigService);

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

  weatherConfigIssue = computed(() =>
    this.runtimeConfig.validationIssues().find((issue) => issue.path === 'api.weatherApiKey') ?? null,
  );

}
