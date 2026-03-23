import { HttpErrorResponse } from '@angular/common/http';
import {
    AppError,
    DomainError,
    NetworkError,
    NotFoundError,
    RateLimitedError,
    UnauthorizedError,
    UpstreamError
} from './domain-errors';

export function mapHttpError(err: unknown): DomainError {
    if (err instanceof AppError) {
        return err;
    }

    if (err instanceof HttpErrorResponse) {
        switch (err.status) {
            case 401:
                return new UnauthorizedError();
            case 404:
                return new NotFoundError('Resource');
            case 429:
                const retryAfter = err.headers ? parseInt(err.headers.get('Retry-After') || '60', 10) : 60;
                return new RateLimitedError(retryAfter);
            case 0:
                return new NetworkError();
            default:
                if (err.status >= 500) {
                    return new UpstreamError(err.message, err.status);
                }
                return new UpstreamError(`Unexpected error: ${err.message}`, err.status);
        }
    }

    return new UpstreamError(err instanceof Error ? err.message : 'Unknown error');
}
