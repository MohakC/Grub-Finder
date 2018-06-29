import { Component, OnInit } from '@angular/core';
import { SearchRestaurantsService } from '../../service/search-restaurants.service';
import { Restaurant } from '../../model/restuarant';
import { DetermineLocationService } from '../../service/determine-location.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  cards : Restaurant[];
  
  constructor(private searchRestaurantsService: SearchRestaurantsService, private determineLocService : DetermineLocationService
  ) { }

  ngOnInit() {
    this.cards = this.determineLocService.getInitialCards();
  }

  onSearch(form) {
    this.cards = [];
    if (form === undefined || form.value["City"] === "" || form.value["Cuisine"] === ""
          || this.testOnlyAlphabetChar(form.value["City"]) || this.testOnlyAlphabetChar(form.value["Cuisine"])) {
    } else {
      let query = {};
      for (let attr in form.value) {
        query[attr] = form.value[attr];
      }
      this.searchRestaurantsService.getData(query["City"], query["Cuisine"]).subscribe((data) => {
        console.log(data);
        if(data["data"].length < 10) {
          this.searchRestaurantsService.getSearchData(query["City"], query["Cuisine"]).subscribe((mess) => {
            this.searchRestaurantsService.getData(query["City"], query["Cuisine"]).subscribe((data) => {
              this.cards = data['data'];
            });
          });
        } else {
          this.cards = data['data'];
        }
      });
    }
  }

  testOnlyAlphabetChar(value) {
    return !(/^[A-Za-z]+$/.test(value)) && value.length !== 0;
  }
}
