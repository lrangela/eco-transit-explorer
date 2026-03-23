// @vitest-environment jsdom
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherIconComponent } from './weather-icon.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('WeatherIconComponent', () => {
    let fixture: ComponentFixture<WeatherIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WeatherIconComponent],
            providers: [
                // Mock ImageLoader needed for NgOptimizedImage in tests if no standard loader is set, 
                // but default generic loader usually works. Let's try without first.
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(WeatherIconComponent);
    });

    it('should render an image with correct assets path', () => {
        fixture.componentRef.setInput('code', '01d');
        fixture.detectChanges();
        const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
        expect(img).toBeTruthy();
        // NgOptimizedImage transforms src, so we check if it contains the assets path
        expect(img.src).toContain('assets/icons/weather/01d.svg');
        expect(img.alt).toContain('01d');
    });

    it('should use fallback for invalid code', () => {
        fixture.componentRef.setInput('code', 'invalid-code');
        fixture.detectChanges();

        const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
        expect(img.src).toContain('assets/icons/weather/fallback.svg');
    });

    it('should apply priority attribute when set to true', () => {
        fixture.componentRef.setInput('code', '01d');
        fixture.componentRef.setInput('priority', true);
        fixture.detectChanges();

        const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
        // NgOptimizedImage adds fetchpriority="high" to the DOM element
        expect(img.getAttribute('fetchpriority')).toBe('high');
    });
});
