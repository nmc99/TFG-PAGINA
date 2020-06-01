import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

 

  private URL: String = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  // Metodo que manda usuario para registrarse en la base de datos
  registrarse(user) {
    return this.http.post<any>(this.URL + '/user/register', user);
  }

  // Metodo que recibe token y se guardara en una cookie
  login(user) {
    return this.http.post<any>(this.URL + '/user/login', user);
  }

  // Metodo que borra la cookie con el token
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  // Metodo que comprueba si el usuario esta logeado
  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Metodo que recoge el token
  getToken() {
    return localStorage.getItem('token');
  }

  // Metodo que devuelve todos los datos del usuario de la base de datos
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.URL + '/user/profile');
  }

  updateCurrentUser() {
    this.getCurrentUser().subscribe(
      res => localStorage.setItem('currentUser', JSON.stringify({ username: res.username, summoners: res.summoners, email: res.email }))
    )
  }

  // Metodo para actualizar al usuario en la base de datos
  updateSummoners(summoners: Object) {
    return this.http.post(this.URL + '/user/user/updateSummoners/', summoners);
  }
  getSummoners() {
    return this.http.get(this.URL + '/user/getSummoners');
  }
}
