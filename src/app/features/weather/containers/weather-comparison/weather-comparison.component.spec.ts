import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WeatherComparisonComponent } from './weather-comparison.component';
import { WeatherService } from '../../data-access/weather.service';

describe('WeatherComparisonComponent', () => {
  let fixture: ComponentFixture<WeatherComparisonComponent>;
  const getComparison = vi.fn();

  beforeEach(async () => {
    getComparison.mockResolvedValue({
      items: [],
      failedCities: ['London', 'Paris'],
    });

    await TestBed.configureTestingModule({
      imports: [WeatherComparisonComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getComparison,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComparisonComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should render the fallback error state when all requests fail', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[data-testid="comparison-error"]')).toBeTruthy();
  });

  it('should apply custom cities within the API limit', () => {
    const component = fixture.componentInstance;

    component.cityInput.setValue('Lima, Bogota, Quito');
    component.applyCustomCities();

    expect(component.cities()).toEqual(['Lima', 'Bogota', 'Quito']);
    expect(component.inputError()).toBeNull();
  });

  it('should reject more than three cities', () => {
    const component = fixture.componentInstance;

    component.cityInput.setValue('Lima, Bogota, Quito, Santiago');
    component.applyCustomCities();

    expect(component.inputError()).toContain('up to 3 cities');
  });
});
