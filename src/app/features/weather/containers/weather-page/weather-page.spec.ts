import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

import { WeatherPageComponent } from './weather-page.component';
import { WeatherService } from '../../data-access/weather.service';
import { OpenWeatherClient } from '../../../../core/api/openweather.client';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '../../../../core/api/api.tokens';

describe('WeatherPageComponent', () => {
  let component: WeatherPageComponent;
  let fixture: ComponentFixture<WeatherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        WeatherService,
        OpenWeatherClient,
        { provide: OPENWEATHER_BASE_URL, useValue: 'https://api.openweathermap.org/data/2.5' },
        { provide: OPENWEATHER_API_KEY, useValue: 'TEST_KEY' }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
