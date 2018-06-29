import { Component, OnInit, Input} from '@angular/core';
import { SearchRestaurantsService } from '../../service/search-restaurants.service';
import { Restaurant } from '../../model/restuarant';
import { FavoritesService} from '../../service/favorites.service';
import { MatSnackBar } from '@angular/material';


@Component({
  
  selector: 'app-cards-view',
  templateUrl: './cards-view.component.html',
  styleUrls: ['./cards-view.component.css']
})
export class CardsViewComponent implements OnInit {
  route: string = "search";
  @Input() cards: Restaurant[];

  constructor(private favoritesService: FavoritesService, public favoriteBar: MatSnackBar) { }

  ngOnInit() {
  }

  addFav(res_id) {
    this.favoritesService.addFavorite(res_id).subscribe((message) => {
      this.favoriteBar.open(message["message"],"" ,{duration: 700});
    });
  }
}
