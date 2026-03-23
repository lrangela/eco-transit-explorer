import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './core/api/http-error-interceptor';
import { RuntimeConfigService } from './core/config/runtime-config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => inject(RuntimeConfigService).load()),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService,
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    )
  ]
};
