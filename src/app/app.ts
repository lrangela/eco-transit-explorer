import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MenuItem, SharedModule } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, SharedModule, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('eco-transit-explorer');
  protected readonly currentYear = signal(new Date().getFullYear());

  items: MenuItem[] = [
    { label: 'Weather', icon: 'pi pi-fw pi-cloud', routerLink: '/' },
    { label: 'Comparison', icon: 'pi pi-fw pi-list', routerLink: '/compare' },
    { label: 'Transit', icon: 'pi pi-fw pi-directions', routerLink: '/transit' }
  ];
}
