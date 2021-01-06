import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Herolo';

  links = [
    {
      title: 'Home',
      urlLink: '/home'
    },
    {
      title: 'Favorites',
      urlLink: '/favorites'
    }
  ];
  constructor(public route: ActivatedRoute){}

}
