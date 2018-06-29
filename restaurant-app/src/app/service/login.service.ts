import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Config } from 'protractor/built/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  authenticateUser(username, password): Observable<HttpResponse<Config>>{
    return this.http.post('http://localhost:3000/api/v1/users/login', {"username" : username, "password" : password},
    { observe: 'response' });
  }
}
