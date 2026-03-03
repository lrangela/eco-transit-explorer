import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ForecastList } from '../../models/forecast.model';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon.component';

@Component({
  selector: 'app-forecast-widget',
  standalone: true,
  imports: [DatePipe, CardModule, SkeletonModule, WeatherIconComponent],
  template: `
    <section class="forecast-widget animate-slideUp" aria-label="5-Day Forecast">
      <div class="glass-card p-4">
        <h3 class="forecast-header">5-Day Forecast</h3>
        
         @if (isLoading()) {
            <div role="status" aria-live="polite" class="forecast-grid">
               @for (i of [1,2,3,4,5]; track i) {
                 <div class="forecast-card glass-card-strong">
                    <p-skeleton width="60%" height="1.5rem" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="80%" shape="circle" size="4rem" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="50%" height="2rem"></p-skeleton>
                 </div>
               }
               <span class="sr-only">Cargando pronóstico extendido de 5 días...</span>
            </div>
         } @else {
             @if (!forecasts() || forecasts()?.length === 0) {
                <div class="text-center p-4">
                    <span class="text-white" style="opacity: 0.8;">No forecast data available.</span>
                </div>
            } @else {
               <div class="forecast-grid">
                  @for (day of forecasts(); track day.date) {
                    <article class="forecast-card glass-card-strong" data-testid="forecast-card">
                       <div class="forecast-day">{{ day.date | date:'EEE' }}</div>
                       <div class="forecast-date">{{ day.date | date:'dd/MM' }}</div>
                       <app-weather-icon 
                         [code]="day.icon!"
                         [size]="64"
                         class="forecast-icon">
                       </app-weather-icon>
                       <div class="forecast-temps">
                          <span class="temp-max">{{ day.tempMax }}°</span>
                          <span class="temp-min">{{ day.tempMin }}°</span>
                       </div>
                    </article>
                  }
               </div>
            }
        }
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      margin-top: 1.5rem;
    }

    .forecast-header {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 1.5rem 0;
      text-align: center;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
    }

    .forecast-card {
      padding: 1.25rem;
      text-align: center;
      cursor: pointer;
      position: relative;
    }

    .forecast-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--glass-shadow-hover);
    }

    .forecast-card-skeleton {
      min-height: 8rem;
    }

    .forecast-day {
      font-weight: 700;
      font-size: 1.1rem;
      color: white;
      margin-bottom: 0.25rem;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }

    .forecast-date {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 0.75rem;
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }

    .forecast-icon {
      width: 64px;
      height: 64px;
      margin: 0.5rem auto;
      filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.4));
    }

    .forecast-temps {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-top: 0.75rem;
    }

    .temp-max {
      font-weight: 700;
      font-size: 1.5rem;
      color: white;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    .temp-min {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.85);
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }

    /* Mobile: Horizontal Scroll */
    @media (max-width: 768px) {
      .forecast-grid {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        gap: 0.75rem;
        padding-bottom: 0.5rem;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
      }

      .forecast-card {
        flex: 0 0 140px;
        scroll-snap-align: start;
      }

      /* Hide scrollbar but keep functionality */
      .forecast-grid::-webkit-scrollbar {
        height: 4px;
      }

      .forecast-grid::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
      }

      .forecast-grid::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
      }
    }
  `]
})
export class ForecastWidgetComponent {
  forecasts = input.required<ForecastList | undefined>();
  isLoading = input<boolean>(false);
}
