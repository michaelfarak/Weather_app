import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

const FORECAST_WEATHER_URL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'

@Injectable({
  providedIn: 'root'
})
export class ForecastWeatherService {

  constructor(private http: HttpClient) { }

  getCurrentCondition = (locationKey: string) => {
    if (locationKey === ''){
      return of ([]);
    }
    return this.http
      .get(FORECAST_WEATHER_URL + locationKey, {
        params : { apikey: environment.accuWeather.apiKey }
      }).pipe(
        tap(resp => resp),
        catchError(() => {
          window.alert('An error occurred');
          return of([]);
        })
      );
  }
}
