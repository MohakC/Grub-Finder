import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  addReview(res_id, review) {
    return this.http.post('http://localhost:3000/api/v1/restaurants/reviews', {"res_id" : res_id, "review" : review});
  }

  deleteReview(res_id, review) {
    return this.http.put('http://localhost:3000/api/v1/restaurants/reviews', {"res_id" : res_id, "review" : review});
  }

}
