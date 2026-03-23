import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => {
    if (!environment.production) {
      console.error(err);
    }
  });
