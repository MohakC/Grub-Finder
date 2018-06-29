import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

  addFavorite(res_id){
    return this.http.post('http://localhost:3000/api/v1/restaurants/favorites', {"res_id" : res_id});
  }

  getFavorites() {
    return this.http.get('http://localhost:3000/api/v1/restaurants/favorites');
  }

  deleteFavorite(res_id) {
    return this.http.delete(`http://localhost:3000/api/v1/restaurants/favorites/${res_id}`);
  }
}
