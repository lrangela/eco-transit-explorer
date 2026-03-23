import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RuntimeConfigService } from '../config/runtime-config.service';
import { RuntimeFeatureKey } from '../config/runtime-config.types';

export function featureFlagGuard(feature: RuntimeFeatureKey): CanMatchFn {
  return () => {
    const runtimeConfig = inject(RuntimeConfigService);
    if (runtimeConfig.isFeatureEnabled(feature)) {
      return true;
    }

    return inject(Router).createUrlTree(['/']);
  };
}
