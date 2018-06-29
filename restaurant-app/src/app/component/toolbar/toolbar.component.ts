import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  private route;

  constructor(private router : Router) {
    this.route = router;
   }


  ngOnInit() {
  }

  logOut() {
    window.localStorage.removeItem("JWT");
    this.route.navigate(['/login']);
    
  }

}
