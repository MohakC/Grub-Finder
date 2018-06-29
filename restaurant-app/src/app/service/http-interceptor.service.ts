import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { GetJWTService } from './get-jwt.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private getJWTService: GetJWTService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    if (this.getJWTService.getToken()) {
      request = request.clone({
        setHeaders : {
          'Authorization':  this.getJWTService.getToken()
        }
      });
    }

    return next.handle(request);
  }
}
