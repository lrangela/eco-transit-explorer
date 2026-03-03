import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/weather/containers/weather-page/weather-page.component').then(m => m.WeatherPageComponent)
    },
    {
        path: 'compare',
        loadComponent: () => import('./features/weather/containers/weather-comparison/weather-comparison.component').then(m => m.WeatherComparisonComponent)
    },
    {
        path: 'transit',
        loadComponent: () => import('./features/transit/components/transit-dashboard/transit-dashboard.component').then(m => m.TransitDashboardComponent)
    },
    {
        // Wildcard route: SIEMPRE debe ser la última ruta
        // Captura todas las rutas que no coinciden con las anteriores
        path: '**',
        loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];

