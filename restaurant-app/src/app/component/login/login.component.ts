import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { DetermineLocationService } from '../../service/determine-location.service';
import { GetJWTService } from '../../service/get-jwt.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidCred : string = "";

  constructor(
    private router : Router,
    private loginService : LoginService,
    private determineLocService : DetermineLocationService,
    private getJWTService: GetJWTService
  ) { }

  ngOnInit() {
    this.determineLocService.determineCity();
  }

  onSubmit(form) {
    this.invalidCred = "";
    let user = {};
    for (let attr in form.value) {
      user[attr] = form.value[attr];
    }
    if (form !== undefined) {
      this.loginService.authenticateUser(user["username"], user["password"]).subscribe((res) => {
        if (res.status === 200) {
          // user object can be accessed from res.body["user"];
          this.getJWTService.setToken(res.body["JWT"]);
          this.router.navigateByUrl('/search');
        }
      }, (err) => {
        this.invalidCred = err.error.message;
      });
    }
  }
}

