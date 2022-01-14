import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const BASE_URL = 'http://leobot.htl-leonding.ac.at:8080/api';
@Injectable({
  providedIn: 'root'
})
export class BackEndService {
  // tslint:disable-next-line:variable-name
  private _signedIn = false;
  // tslint:disable-next-line:variable-name
  private _username = '';
  // tslint:disable-next-line:variable-name
  private _password = '';
  constructor(private readonly http: HttpClient) {

  }
  public getAllConversations(): Observable<JSON> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    return this.http.get<JSON>(`${BASE_URL}/conversations`,httpOptions);
  }

  public getConversations(id): Observable<JSON> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    return this.http.get<JSON>(`${BASE_URL}/conversations` + '/' + id,httpOptions);
  }
  public signIn(username, password): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ' Basic ' + btoa( username + ':' + password)
      })
    };
    return this.http.get<string>(`${BASE_URL}/signin`,  httpOptions);
  }

  get signedIn(): boolean {
    return (localStorage.getItem('signedIn') as unknown) as boolean;
  }
  set signedIn(value: boolean) {
    localStorage.setItem('signedIn', 'true');
    this._signedIn = value;
  }

  get username(): string {
    return localStorage.getItem('username');
  }

  set username(value: string) {
    localStorage.setItem('username', value);
    this._username = value;
  }

  get password(): string {
    return localStorage.getItem('password');
  }

  set password(value: string) {
    localStorage.setItem('password', value);
    this._password = value;
  }
}
