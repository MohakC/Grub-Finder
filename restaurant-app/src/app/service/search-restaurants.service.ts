import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../model/restuarant';

@Injectable({
  providedIn: 'root'
})
export class SearchRestaurantsService {

  constructor(private http : HttpClient) { 
  }

  getSearchData(city, cuisine) {
    return this.http.post('http://localhost:3000/api/v1/restaurants', {"city" : city, "cuisine" : cuisine});
  }

  getData(city, cuisine){
    return this.http.get(`http://localhost:3000/api/v1/restaurants/${city}/${cuisine}`);
  }
  
}
