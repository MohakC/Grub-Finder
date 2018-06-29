import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private router : Router, private authService : AuthService) { }

  canActivate() : boolean{
    const token = localStorage.getItem('JWT');
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return false;
    } 
    return true;
  }
}
