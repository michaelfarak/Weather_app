import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Favorite} from '../../models/favorite';
import {FavoritesStateService} from '../../services/favorites-state.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Favorite[];
  temperatureMetric = 'celsius';

  @Output()
  selectFavorite: EventEmitter<Favorite> = new EventEmitter();

  constructor(private favoriteStateService: FavoritesStateService, private router: Router ) { }

  ngOnInit(): void {
    this.favorites = this.favoriteStateService.getFavoritesList();
  }

  focusFavorite = (favorite: Favorite) => {
    this.favoriteStateService.selectFavorite(favorite);
    return this.router.navigate(['/home']);
  }

  toggleMetric = () => {
    return this.temperatureMetric = (this.temperatureMetric === 'celsius') ? 'fahrenheit' : 'celsius';
  }

}
