import { Utilizador } from '../models/utilizador';
import { GeneralConstants } from './../constants/GeneralConstants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  empty,
  Observable,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://api-hotel-managemnt.onrender.com/';
  headers?: {
    responseType: 'json';
    'Content-Type': 'application/json';
  };

  private isUserLoged = new BehaviorSubject<boolean>(false);
  private available_sms = new BehaviorSubject<string>('0');
  showMenu = new EventEmitter<boolean>();
  showSMS = new EventEmitter<string>();
  showMenuLateral = new EventEmitter<boolean>();
  flag = false;

  constructor(private http: HttpClient, private router: Router) {}

  postter(url: string, data: any): Observable<any> {
    return this.http
      .post(this.baseUrl + url, data, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  verifyUserLoged() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERID_KEY);
  }

  verifyUserAdmin() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.ROLE_KEY) == 'admin';
  }

  setToken(usuario: Utilizador) {
    localStorage.setItem(GeneralConstants.USER_AUTH.TOKEN_KEY, usuario.token!);
    this.isUserLoged.next(true);
    this.showMenu.emit(true);
    this.showMenuLateral.emit(this.flag);
  }

  setLogin(usuario: Utilizador) {
    localStorage.setItem(GeneralConstants.USER_AUTH.USERID_KEY, usuario.uuid!);
    localStorage.setItem(GeneralConstants.USER_AUTH.TOKEN_KEY, usuario.token!);
    localStorage.setItem(
      GeneralConstants.USER_AUTH.API_TOKEN_KEY,
      usuario.api_token!
    );
    localStorage.setItem(
      GeneralConstants.USER_AUTH.SMS_KEY,
      usuario.available_sms!
    );
    localStorage.setItem(
      GeneralConstants.USER_AUTH.USEREMAIL_KEY,
      usuario.email_or_phone_number!
    );
    localStorage.setItem(
      GeneralConstants.USER_AUTH.USERNAME_KEY,
      usuario.username!
    );
    localStorage.setItem(GeneralConstants.USER_AUTH.ROLE_KEY, usuario.role!);
    this.showSMS.emit(usuario.available_sms!);
    this.isUserLoged.next(true);
    this.showMenu.emit(true);
    if (usuario.role == 'admin') this.showMenuLateral.emit(true);
  }

  logout() {
    localStorage.removeItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERID_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.USEREMAIL_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.TIPOUSER_KEY);
    localStorage.removeItem(GeneralConstants.USER_AUTH.ROLE_KEY);
    this.isUserLoged.next(false);
    this.showMenu.emit(false);
    this.showMenuLateral.emit(false);
    this.router.navigate(['/login']);
  }

  getUserName() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERNAME_KEY);
  }

  getUserId() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.USERID_KEY);
  }

  getToken() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.TOKEN_KEY);
  }

  getAPIToken() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.API_TOKEN_KEY);
  }

  getSMS() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.SMS_KEY);
  }

  setSMS(credit: string) {
    return localStorage.setItem(GeneralConstants.USER_AUTH.SMS_KEY, credit);
  }

  getAreaId() {
    return localStorage.getItem(GeneralConstants.USER_AUTH.AREAUSER_KEY);
  }

  getter(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url);
  }

  updateCredit() {
    this.getter('credits').subscribe(
      (res) => {
        this.available_sms.next(res.available_sms);
        this.setSMS(res.available_sms);
        this.showSMS.emit(res.available_sms + '');
      },
      (error) => {}
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
