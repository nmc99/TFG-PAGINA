import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthServicesService } from './auth-services.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private authservice: AuthServicesService) { }

  intercept(req, next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authservice.getToken()}`
      }
    })
    return next.handle(tokenizeReq)
  }

}