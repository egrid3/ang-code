import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
// import { map } from 'rxjs/operators'; -- not needed with rxjs-compat

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private httpClient: HttpClient) { }

  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:3034/users/register', user, {headers:headers});
  }
  authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:3034/users/authenticate', user, {headers:headers});
  }
  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders({
    Authorization: this.authToken,
    'Content-Type': 'application/json'
  });
    return this.httpClient.get('http://localhost:3034/users/profile', {headers:headers});
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
