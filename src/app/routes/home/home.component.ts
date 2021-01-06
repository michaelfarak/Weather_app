import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AutoCompleteSearchService} from '../../services/auto-complete-search.service';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {CurrentWeatherService} from '../../services/current-weather.service';
import {ForecastWeatherService} from '../../services/forecast-weather.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FavoritesStateService} from '../../services/favorites-state.service';
import {Favorite} from '../../models/favorite';

export interface CardData {
  state: 'default' | 'flipped' | 'matched';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [AutoCompleteSearchService],
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cardFlip', [
      state(
        'default',
        style({
          transform: 'none'
        })
      ),
      state(
        'flipped',
        style({
          transform: 'rotateY(180deg)'
        })
      ),
      state(
        'matched',
        style({
          visibility: 'false',
          transform: 'scale(0.05)',
          opacity: 0
        })
      ),
      transition('default => flipped', [animate('400ms')]),
      transition('flipped => default', [animate('400ms')]),
      transition('* => matched', [animate('400ms')])
    ])
  ]
})


export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,
              private searchService: AutoCompleteSearchService,
              private currentWeatherService: CurrentWeatherService,
              private foreCastWeatherService: ForecastWeatherService,
              private favoriteStateService: FavoritesStateService,
  ) { }


  data: CardData = {
    state: 'default'
  };

  isCardFlipped = false;
  model: any;
  searching = false;
  searchFailed = false;
  selectedLocation;
  currentLocation: string;
  citiesKey = [];
  locationKey: string;
  defaultLocation = 'Tel Aviv';
  defaultLocationKey = '215854'; // Tel Aviv location key
  latestId = 0;
  selectedFavorite: Favorite;
  temperatureMetric = 'fahrenheit';
  isAddedToFavorites = false;
  currentWeather;
  forecastWeather;

  ngOnInit(): void {
    this.isAddedToFavorites = false;
    this.selectedFavorite = this.favoriteStateService.getSelectedFavorite();
    if (!this.selectedFavorite) {
      this.locationKey = this.defaultLocationKey;
      this.currentLocation = this.defaultLocation;
    } else {
      this.currentLocation = this.selectedFavorite.name;
      this.locationKey = this.selectedFavorite.locationKey;
      this.isAddedToFavorites = true;
    }
    this.getCurrentWeather(this.locationKey);
    this.getForecastWeather(this.locationKey);
  }



  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.searchService.search(term).pipe(
          map(selectedCity => {
            this.searchFailed = false;
            const citiesArray = [];
            this.selectedLocation = selectedCity;
            for (const i in this.selectedLocation){
              if (this.selectedLocation[i]){
                citiesArray.push(this.selectedLocation[i].name);
                this.citiesKey.push(this.selectedLocation[i].key);
              }
            }
            return citiesArray;
          }),
          catchError(() => {
            this.searchFailed = true;
            window.alert('An error occured');
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  clickedLocation = location => {
    this.currentLocation = location.item;
    const locationObject = this.selectedLocation.find(cityObject  => cityObject.name === this.currentLocation);
    this.locationKey = locationObject.key;
    this.getCurrentWeather(this.locationKey);
    this.getForecastWeather(this.locationKey);
  }

  getCurrentWeather = locationKey => {
    this.currentWeatherService.getCurrentCondition(locationKey)
      .subscribe(val => this.currentWeather = val);
  }

  getForecastWeather = locationKey => {
    this.foreCastWeatherService.getCurrentCondition(locationKey)
      .subscribe(val => this.forecastWeather = val);
  }


  cardClicked = () => {
    if (this.data.state === 'default') {
      this.data.state = 'flipped';
    } else {
      this.data.state = 'default';
    }
    this.isCardFlipped = !this.isCardFlipped;
  }

  addCityToFavorites = () => {
    const favorite: Favorite = {
      id: this.latestId,
      name: this.currentLocation,
      locationKey: this.locationKey,
      currentWeather : {
        weatherText : this.currentWeather.WeatherText,
        temperature: this.currentWeather.Temperature.Metric.Value
      }
    };
    if (this.containsFavorite(favorite)) {
      this.isAddedToFavorites = false;
      return this.favoriteStateService.removeFromFavorites(favorite, favorite.id);
    }
    favorite.id = this.incrementId();
    this.isAddedToFavorites = true;
    return this.favoriteStateService.addToFavorites(favorite);
  }

  incrementId = () => {
    this.latestId = (!this.latestId) ? 1 : ++this.latestId;
    return this.latestId;
  }

  toggleTemperatureMetric = () => {
    this.temperatureMetric = (this.temperatureMetric === 'celsius') ? 'fahrenheit' : 'celsius';
  }

  containsFavorite = (favorite: Favorite) => {
    const favorites = this.favoriteStateService.getFavoritesList();
    let isFavorite: boolean;
    favorites.forEach((fav) => {
      isFavorite = fav.locationKey === favorite.locationKey;
    });
    return isFavorite;
  }
}
