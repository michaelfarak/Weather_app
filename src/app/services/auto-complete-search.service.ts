import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';


const AUTOCOMPLETE_URL = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';

@Injectable({
  providedIn: 'root'
})

export class AutoCompleteSearchService {
  private data = [];
  regex = /^[a-z]+$/i;

  constructor(private http: HttpClient) { }

  search = (term: string) => {
    if (term === '' || !this.regex.test(term)) {
      window.alert('Error in searching city name, please try english letters only')
      return of([]);
    }

    return this.http
      .get(AUTOCOMPLETE_URL, {params: {
          apikey: environment.accuWeather.apiKey,
          q: term
        }}).pipe(
        map(response => {
          for (const i in response){
            if (response[i]){
              this.data.push({name : response[i].LocalizedName, key: response[i].Key});
            }
          }
          return this.data;
        }),
        catchError(() => {
          window.alert('An error occurred');
          return of([]);
        })
      );
  }
}
