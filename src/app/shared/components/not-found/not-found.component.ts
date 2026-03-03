import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

/**
 * Componente para página 404 (No Encontrada)
 * 
 * Se muestra cuando el usuario navega a una ruta que no existe.
 * Configurado en app.routes.ts como wildcard route ('**').
 * 
 * Features:
 * - Diseño consistente con PrimeNG
 * - Botón para regresar a Home
 * - Icon de PrimeIcons
 */
@Component({
    selector: 'app-not-found',
    imports: [ButtonModule, CardModule],
    template: `
        <div class="flex align-items-center justify-content-center min-h-screen p-4">
            <p-card styleClass="surface-card shadow-2 border-round-lg max-w-30rem w-full">
                <div class="text-center">
                    <!-- Icon de advertencia -->
                    <i class="pi pi-exclamation-triangle text-6xl text-yellow-500 mb-4 block"></i>
                    
                    <!-- Título 404 -->
                    <h1 class="text-7xl font-bold text-primary mb-2">404</h1>
                    
                    <!-- Subtítulo -->
                    <p class="text-2xl text-color-secondary font-semibold mb-3">
                        Página no encontrada
                    </p>
                    
                    <!-- Descripción -->
                    <p class="text-color-secondary mb-5 line-height-3">
                        Lo sentimos, la ruta que buscas no existe en esta aplicación.
                        Puede que hayas escrito mal la URL o que la página haya sido movida.
                    </p>
                    
                    <!-- Botón de navegación a Home -->
                    <p-button 
                        label="Volver al Inicio" 
                        icon="pi pi-home" 
                        (onClick)="goHome()"
                        severity="primary"
                        size="large"
                    />
                </div>
            </p-card>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            min-height: 100vh;
            background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
        }
    `]
})
export class NotFoundComponent {
    private router = inject(Router);

    /**
     * Navega a la ruta principal (Home)
     */
    goHome(): void {
        this.router.navigate(['/']);
    }
}
