import { Injectable } from '@angular/core';
import {Favorite} from '../models/favorite';
import {StateService} from '../shared/state.service';
import {Observable} from 'rxjs';


interface FavoritesState {
  favorites: Favorite[];
  selectedFavorite: Favorite;
}

const initialState: FavoritesState = {
  favorites: [],
  selectedFavorite: undefined
};

@Injectable({
  providedIn: 'root'
})
export class FavoritesStateService extends StateService<FavoritesState>{

  selectedFavorite$: Observable<Favorite> = this.select((state => {
    return state.favorites.find((item) => item.id === state.selectedFavorite.id);
  }));

  constructor() {
    super(initialState);
  }

  selectFavorite = (favorite: Favorite) => {
    this.setState({...this.state.selectedFavorite, selectedFavorite: favorite});
  }

  addToFavorites = (favorite: Favorite) => {
    this.setState({
      favorites: [...this.state.favorites, favorite]
    });
  }

  removeFromFavorites = (favorite: Favorite, id: number) => {
    this.setState({
      favorites: [...this.state.favorites.filter(() => favorite.id !== id)]
    });
    this.setState({...this.state.selectedFavorite, selectedFavorite: undefined})
  }

  getFavoritesList = () => this.state.favorites;

  getSelectedFavorite = () => this.state.selectedFavorite;
}
