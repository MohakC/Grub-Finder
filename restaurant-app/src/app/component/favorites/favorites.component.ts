import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../service/favorites.service';
import { ReviewService } from '../../service/review.service';
import { Restaurant } from '../../model/restuarant';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites : Restaurant[];
  route: string = "fav";

  constructor(private favoritesService : FavoritesService,
    private reviewService : ReviewService) { }

  ngOnInit() {
    this.favoritesService.getFavorites().subscribe((data) => {
      this.favorites = data["restaurants"];
    })
  };

  deleteFavorite(res_id) {
    this.favoritesService.deleteFavorite(res_id).subscribe((message) => {
      this.favoritesService.getFavorites().subscribe((data) => {
        this.favorites = data["restaurants"];
      });
    });
  }

  toReview(obj) {
    this.reviewService.addReview(obj["res_id"], obj["review"]).subscribe((message) => {
      this.favoritesService.getFavorites().subscribe((data) => {
        this.favorites = data["restaurants"];
      });
    });
  }

  deleteReview(obj) {
    this.reviewService.deleteReview(obj["res_id"], obj["review"]).subscribe((message) => {
      this.favoritesService.getFavorites().subscribe((data) => {
        this.favorites = data["restaurants"];
      });
    });
  }
}
