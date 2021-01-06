import { TestBed } from '@angular/core/testing';

import { ForecastWeatherService } from './forecast-weather.service';

describe('ForecastWeatherService', () => {
  let service: ForecastWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
