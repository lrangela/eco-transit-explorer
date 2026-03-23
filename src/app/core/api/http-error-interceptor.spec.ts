import { TestBed } from '@angular/core/testing';
import { HttpContext, HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { firstValueFrom, of, throwError } from 'rxjs';

import { httpErrorInterceptor, SKIP_ERROR_TOAST } from './http-error-interceptor';

describe('httpErrorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => httpErrorInterceptor(req, next));
  const messageService = {
    add: vi.fn(),
  };

  beforeEach(() => {
    messageService.add.mockReset();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MessageService,
          useValue: messageService,
        },
      ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show a rate-limit notification for 429 responses', async () => {
    const request = new HttpRequest('GET', '/api/weather/current');
    const next = () =>
      throwError(() => new HttpErrorResponse({ status: 429, statusText: 'Too Many Requests' }));

    await expect(firstValueFrom(interceptor(request, next))).rejects.toBeTruthy();
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'warn',
        summary: 'Rate Limit Reached',
      }),
    );
  });

  it('should show a service unavailable notification for 503 responses', async () => {
    const request = new HttpRequest('GET', '/api/weather/current');
    const next = () =>
      throwError(() => new HttpErrorResponse({ status: 503, statusText: 'Service Unavailable' }));

    await expect(firstValueFrom(interceptor(request, next))).rejects.toBeTruthy();
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({
        severity: 'warn',
        summary: 'Service Unavailable',
      }),
    );
  });

  it('should pass successful responses through unchanged', async () => {
    const request = new HttpRequest('GET', '/api/weather/current');
    const response = new HttpResponse({ status: 200, body: { ok: true } });
    const next = () => of(response);

    const event = await firstValueFrom(interceptor(request, next));
    expect(event).toBe(response);
    expect(messageService.add).not.toHaveBeenCalled();
  });

  it('should skip toast notifications when the request context disables them', async () => {
    const request = new HttpRequest(
      'GET',
      'https://api.openweathermap.org/data/2.5/weather',
      undefined,
      { context: new HttpContext().set(SKIP_ERROR_TOAST, true) },
    );
    const next = () =>
      throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' }));

    await expect(firstValueFrom(interceptor(request, next))).rejects.toBeTruthy();
    expect(messageService.add).not.toHaveBeenCalled();
  });
});
