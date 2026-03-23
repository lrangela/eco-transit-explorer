import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RuntimeConfigService } from '../config/runtime-config.service';

@Injectable({
  providedIn: 'root',
})
export class AppLoggerService {
  private readonly runtimeConfig = inject(RuntimeConfigService);

  debug(message: string, context?: unknown): void {
    if (!this.shouldLog()) {
      return;
    }

    console.debug(message, context);
  }

  warn(message: string, context?: unknown): void {
    if (!this.shouldLog()) {
      return;
    }

    console.warn(message, context);
  }

  error(message: string, context?: unknown): void {
    if (!this.shouldLog()) {
      return;
    }

    console.error(message, context);
  }

  private shouldLog(): boolean {
    return !environment.production && this.runtimeConfig.isConsoleLoggingEnabled();
  }
}
