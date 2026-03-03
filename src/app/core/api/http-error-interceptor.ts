import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { mapHttpError } from '../error/error-mapper';
import { NotFoundError, RateLimitedError, UnauthorizedError } from '../error/domain-errors';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: unknown) => {
      const mappedError = mapHttpError(error);

      // Notification Logic
      if (mappedError instanceof NotFoundError) {
        messageService.add({
          severity: 'error',
          summary: 'Not Found',
          detail: 'The requested city or resource could not be found.',
          life: 5000
        });
      } else if (mappedError instanceof RateLimitedError) {
        messageService.add({
          severity: 'warn',
          summary: 'Too Many Requests',
          detail: `Please wait ${mappedError.retryAfterSeconds} seconds before retrying.`,
          life: 5000
        });
      } else if (mappedError instanceof UnauthorizedError) {
        messageService.add({
          severity: 'error',
          summary: 'Unauthorized',
          detail: 'Please check your API key or login credentials.',
          life: 5000
        });
      } else {
        // Generic catch-all
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: mappedError.message || 'An unexpected error occurred.',
          life: 5000
        });
      }

      // We throw the mapped error so the consumer (Service/Resource) receives a clean DomainError
      return throwError(() => mappedError);
    })
  );
};
