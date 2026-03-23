import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { TransitDashboardComponent } from './transit-dashboard.component';
import { TransitService } from '../../data-access/transit.service';
import { WeatherService } from '../../../weather/data-access/weather.service';

describe('TransitDashboardComponent', () => {
  let fixture: ComponentFixture<TransitDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransitDashboardComponent],
      providers: [
        {
          provide: TransitService,
          useValue: {
            transitResource: { value: signal([]), isLoading: signal(false) },
            filteredLines: signal([]),
            currentCity: signal('Madrid'),
            lastError: signal('Bike network data is temporarily unavailable.'),
            reload: () => undefined,
          },
        },
        {
          provide: WeatherService,
          useValue: {
            weatherResource: { value: signal(null) },
            search: () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransitDashboardComponent);
    fixture.detectChanges();
  });

  it('should render an explicit error state instead of an empty state', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[data-testid="transit-error"]')).toBeTruthy();
    expect(element.querySelector('[data-testid="transit-scope-note"]')).toBeTruthy();
  });
});
