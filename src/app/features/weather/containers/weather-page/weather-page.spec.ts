import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { WeatherPageComponent } from './weather-page.component';
import { WeatherService } from '../../data-access/weather.service';

describe('WeatherPageComponent', () => {
  let component: WeatherPageComponent;
  let fixture: ComponentFixture<WeatherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherPageComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            weatherResource: { value: signal(null), isLoading: signal(false), error: signal(null) },
            forecastResource: { value: signal(null), isLoading: signal(false), error: signal(null) },
            lastError: signal(null),
            search: () => undefined,
            retry: () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
