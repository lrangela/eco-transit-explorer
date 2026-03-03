import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from './core/api/api.tokens';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './core/api/http-error-interceptor';
import { rateLimitInterceptor } from './core/interceptors/rate-limit.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService,
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([rateLimitInterceptor, httpErrorInterceptor])
    ),
    { provide: OPENWEATHER_BASE_URL, useValue: environment.openWeather.baseUrl },
    { provide: OPENWEATHER_API_KEY, useValue: environment.openWeather.apiKey }
  ]
};
