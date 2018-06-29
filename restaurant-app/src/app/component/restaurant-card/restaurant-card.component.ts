import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../../model/restuarant';
import { FavoritesService } from '../../service/favorites.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})

export class RestaurantCardComponent implements OnInit {
  @Input() data: Restaurant;
  @Input() route: string;
  @Output() toFav = new EventEmitter();
  @Output() toFavDelete = new EventEmitter();
  @Output() toReview = new EventEmitter();
  @Output() toRevDelete = new EventEmitter();
  showTextArea : boolean = false;

  constructor(private favoritesService: FavoritesService
    ) { }

  ngOnInit() {
  }

  addToFavorites() { 
    this.toFav.emit(this.data.res_id);
  }

  removeFromFavorites() {
    this.toFavDelete.emit(this.data.res_id);
  }

  showReviewBox() {
    this.showTextArea = true;
  }

  addReview(text) {
    if (text !== "") {
      this.toReview.emit({"res_id" : this.data.res_id, "review" : text});
    } 
    this.showTextArea = false;
  }

  deleteReview(text) {
    this.toRevDelete.emit({"res_id" : this.data.res_id, "review" : text});
  }
}
