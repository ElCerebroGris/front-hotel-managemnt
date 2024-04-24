import { GeneralConstants } from './../constants/GeneralConstants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare global {
  interface Window {
    round_success_noti: (text: string) => void;
  }
  interface Window {
    round_error_noti: (text: string) => void;
  }
  interface Window {
    round_warning_noti: (text: string) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  baseUrl = 'https://api.useombala.ao/v1/';

  headers?: {
    responseType: 'json';
    'Content-Type': 'application/json-patch+json; charset=utf-8';
  };

  constructor(private http: HttpClient) {}

  postter(url: string, data: any): Observable<any> {
    return this.http.post(this.baseUrl + url, data, {
      headers: this.headers,
    });
  }

  putter(url: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + url, data, {
      headers: this.headers,
    });
  }

  patcher(url: string, body: any): Observable<any> {
    return this.http.patch(this.baseUrl + url, body, this.headers);
  }

  getter(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url);
  }

  delleter(url: string): Observable<any> {
    return this.http.delete(this.baseUrl + url, this.headers);
  }

  callNotification(
    type: string,
    text: string = 'Operação realizada com sucesso'
  ) {
    switch (type) {
      case 'success':
        if (typeof window.round_success_noti === 'function') {
          window.round_success_noti(text);
        }
        break;
      case 'error':
        if (typeof window.round_error_noti === 'function') {
          window.round_error_noti(text);
        }
        break;
        case 'warn':
        if (typeof window.round_warning_noti === 'function') {
          window.round_warning_noti(text);
        }
        break;
    }
  }
}
