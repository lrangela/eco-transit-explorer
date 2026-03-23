import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppLoggerService } from '../logging/app-logger.service';
import { NetworkError, RateLimitedError, UnknownError } from '../error/domain-errors';

/**
 * Retries the observable execution with exponential backoff for NetworkErrors
 * and respects 'Retry-After' logic for RateLimitedErrors.
 */
export function safeRetry<T>(maxRetries: number = 2) {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            retry({
                count: maxRetries,
                delay: (error, retryCount) => {
                    if (error instanceof RateLimitedError) {
                        const waitTimeMs = (error.retryAfterSeconds || 1) * 1000;
                        return timer(waitTimeMs);
                    }
                    if (error instanceof NetworkError) {
                        // Exponential backoff: 500ms, 1000ms, 2000ms...
                        const waitTimeMs = 500 * Math.pow(2, retryCount - 1);
                        return timer(waitTimeMs);
                    }
                    // Don't retry for other errors (e.g., 404, 401)
                    return throwError(() => error);
                }
            })
        );
    };
}

/**
 * Catches errors and ensures they are wrapped in Domain classes.
 * logs parameters for debugging.
 */
export function handleDomainError<T>(debugContext: string, logger: AppLoggerService) {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            catchError(err => {
                logger.error(`[${debugContext}] Stream Error`, err);
                if (err instanceof NetworkError || err instanceof RateLimitedError || err instanceof UnknownError) {
                    return throwError(() => err);
                }
                return throwError(() => new UnknownError('An unexpected error occurred', err));
            })
        );
    };
}
