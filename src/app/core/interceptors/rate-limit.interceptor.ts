import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

/**
 * Interceptor para manejar errores de Rate Limiting (429) y Service Unavailable (503).
 * Muestra un mensaje amigable al usuario cuando se alcanza el límite de la API gratuita.
 */
export const rateLimitInterceptor: HttpInterceptorFn = (req, next) => {
    const messageService = inject(MessageService);

    return next(req).pipe(
        catchError((error: unknown) => {
            if (error instanceof HttpErrorResponse) {
                // 429: Too Many Requests
                // 503: Service Unavailable (a veces usado por APIs cuando están saturadas/bloqueadas)
                if (error.status === 429 || error.status === 503) {
                    messageService.add({
                        severity: 'warn',
                        summary: 'Límite de API alcanzado',
                        detail: 'El límite de la API gratuita se ha alcanzado. Por favor, intenta de nuevo en un minuto.',
                        life: 5000,
                        icon: 'pi pi-exclamation-triangle'
                    });
                }
            }
            // Re-throw the error so downstream handlers (or other interceptors) can also process it if needed
            return throwError(() => error);
        })
    );
};
