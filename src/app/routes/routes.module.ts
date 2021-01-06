import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {TemperatureConverterPipe} from '../shared/temperature-converter.pipe';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'favorites',
    component: FavoritesComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [HomeComponent, FavoritesComponent, TemperatureConverterPipe],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    MatSlideToggleModule
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
