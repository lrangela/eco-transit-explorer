import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';
import { RuntimeConfigService } from './core/config/runtime-config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly runtimeConfig = inject(RuntimeConfigService);

  protected readonly title = signal('eco-transit-explorer');
  protected readonly currentYear = signal(new Date().getFullYear());

  readonly items = computed<MenuItem[]>(() => {
    const items: MenuItem[] = [
      { label: 'Weather', icon: 'pi pi-fw pi-cloud', routerLink: '/' },
    ];

    if (this.runtimeConfig.isFeatureEnabled('comparison')) {
      items.push({ label: 'Comparison', icon: 'pi pi-fw pi-list', routerLink: '/compare' });
    }

    if (this.runtimeConfig.isFeatureEnabled('transit')) {
      items.push({ label: 'Bikes', icon: 'pi pi-fw pi-directions', routerLink: '/transit' });
    }

    return items;
  });
}
