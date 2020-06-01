import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServicesService } from './auth-services.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authservice: AuthServicesService, private router: Router) { }

  // Metodo que comprueba en el componente si esta logeado o no
  canActivate(): boolean {
    if (this.authservice.loggedIn()) {
      return true;
    }
    console.log("No estas logeado")
    this.router.navigate(['/auth/login']);
  }

}
