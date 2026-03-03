export interface DomainError {
    name: string;
    message: string;
    status?: number;
    retryAfterSeconds?: number;
}

export class AppError implements DomainError {
    name = 'AppError';
    constructor(public message: string, public status?: number) { }
}

export class UnauthorizedError extends AppError {
    override name = 'UnauthorizedError';
    constructor(message = 'Unauthorized access. Please check your API key.') {
        super(message, 401);
    }
}

export class NotFoundError extends AppError {
    override name = 'NotFoundError';
    constructor(resource: string) {
        super(`${resource} not found.`, 404);
    }
}

export class RateLimitedError extends AppError {
    override name = 'RateLimitedError';
    constructor(public retryAfterSeconds = 60) {
        super(`Too many requests. Please try again in ${retryAfterSeconds} seconds.`, 429);
    }
}

export class NetworkError extends AppError {
    override name = 'NetworkError';
    constructor(message = 'Network unavailable. Please check your connection.') {
        super(message, 0);
    }
}


export class UpstreamError extends AppError {
    override name = 'UpstreamError';
    constructor(message = 'External service error. Please try again later.', status?: number) {
        super(message, status);
    }
}

export class UnknownError extends AppError {
    override name = 'UnknownError';
    constructor(message = 'An unexpected error occurred', public cause?: unknown) {
        super(message);
    }
}
