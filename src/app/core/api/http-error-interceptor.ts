import { inject } from '@angular/core';
import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { mapHttpError } from '../error/error-mapper';
import { NotFoundError, RateLimitedError, UnauthorizedError, UpstreamError } from '../error/domain-errors';

export const SKIP_ERROR_TOAST = new HttpContextToken<boolean>(() => false);

function buildErrorToast(mappedError: unknown): {
  severity: 'error' | 'warn';
  summary: string;
  detail: string;
  life: number;
} {
  if (mappedError instanceof NotFoundError) {
    return {
      severity: 'error',
      summary: 'Not Found',
      detail: 'The requested city or resource could not be found.',
      life: 5000,
    };
  }

  if (mappedError instanceof RateLimitedError) {
    return {
      severity: 'warn',
      summary: 'Rate Limit Reached',
      detail: `Please wait ${mappedError.retryAfterSeconds} seconds before retrying.`,
      life: 5000,
    };
  }

  if (mappedError instanceof UnauthorizedError) {
    return {
      severity: 'error',
      summary: 'Unauthorized',
      detail: mappedError.message,
      life: 5000,
    };
  }

  if (mappedError instanceof UpstreamError && mappedError.status === 503) {
    return {
      severity: 'warn',
      summary: 'Service Unavailable',
      detail: 'The upstream service is temporarily unavailable. Please try again shortly.',
      life: 5000,
    };
  }

  return {
    severity: 'error',
    summary: 'Error',
    detail: mappedError instanceof Error ? mappedError.message : 'An unexpected error occurred.',
    life: 5000,
  };
}

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: unknown) => {
      const mappedError = mapHttpError(error);
      if (!req.context.get(SKIP_ERROR_TOAST)) {
        messageService.add(buildErrorToast(mappedError));
      }
      return throwError(() => mappedError);
    })
  );
};
