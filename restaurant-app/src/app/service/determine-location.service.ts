import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Restaurant } from '../model/restuarant';

@Injectable({
  providedIn: 'root'
})
export class DetermineLocationService {
  ipStackKey = "53b5871fb0f276020e628c1a56631ff6";
  restaurants = [];

  constructor(private http: HttpClient) { }

  determineCity(){
    this.http.get(`http://api.ipstack.com/check?access_key=${this.ipStackKey}`).subscribe((data) => {
      let city = data["city"];
      if (city) {
        this.http.get(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, 
        {headers : {"user-key" : "3f0106768425b7d4fd1495430f9952ac"}}).subscribe((data1) => {
          console.log(data1);
          let id = data1["location_suggestions"][0]["id"];
          if (id) {
            this.http.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${id}&entity_type=city`, 
            {headers : {"user-key" : "3f0106768425b7d4fd1495430f9952ac"}}).subscribe((data2) => {
              this.createCards(data2);
            });
          }
        });
      }
    });
  }

  createCards(data) {
    let zomato_data = data["restaurants"];
    let restaurants = [];
    zomato_data.forEach((e) => {
      let data = {};
      data["res_id"] = e["restaurant"]["id"];
      data["name"] = e["restaurant"]["name"];
      data["location"] = e["restaurant"]["location"]["city"];
      data["average_cost_for_two"] = e["restaurant"]["average_cost_for_two"];
      data["currency"] = e["restaurant"]["currency"];
      data["cuisines"] = e["restaurant"]["cuisines"];
      data["thumb"] = e["restaurant"]["thumb"];
      this.restaurants.push(data);
    });
  }

  // {headers: {'Authorization' : window.localStorage.getItem("JWT")}}
  getInitialCards() {
    this.http.post('http://localhost:3000/api/v1/restaurants/initial', {"restaurants": this.restaurants}).subscribe((data) => {
        if (data["message"] === "Already added to DB") {
          console.log("here");
        } else {
          console.log("here2"); 
        }
    });
    return this.restaurants;
    
  }
}
