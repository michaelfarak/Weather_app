import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';

const CURRENT_WEATHER_URL = 'https://dataservice.accuweather.com/currentconditions/v1/';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  constructor(private http: HttpClient) { }

  getCurrentCondition = (locationKey: string) => {
    if (locationKey === ''){
      return of ([]);
    }
    return this.http
      .get(CURRENT_WEATHER_URL + locationKey, {
        params : { apikey: environment.accuWeather.apiKey }
      }).pipe(
        map(resp => resp[0]),
        catchError((err) => {
          window.alert('An error occurred' + err);
          return of ([]);
        })
      );
  }

}
