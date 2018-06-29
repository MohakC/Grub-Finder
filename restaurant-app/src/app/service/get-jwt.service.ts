import { Injectable } from '@angular/core';

@Injectable()

export class GetJWTService {

  constructor() { }

  setToken(token) {
    window.localStorage.setItem("JWT", token);
  }
  
  getToken() {
    return window.localStorage.getItem("JWT");
  }
}
