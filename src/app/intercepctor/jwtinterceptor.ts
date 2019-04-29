import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class Jwtinterceptor implements HttpInterceptor{
  constructor(private loginService: LoginServiceService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
