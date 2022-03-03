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
  getNLU(): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        responseType: 'text',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    const url = 'http://leobot.htl-leonding.ac.at:8080/api/file/nlu.yml';
    return this.http.get(url, {responseType: 'text'});
  }
  putNLU(value: any): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    const url = 'http://leobot.htl-leonding.ac.at:8080/api/file/nlu.yml';
    this.http.put(url, value, httpOptions).subscribe();
  }
  getStories(): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        responseType: 'text',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    const url = 'http://leobot.htl-leonding.ac.at:8080/api/file/stories.yml';
    return this.http.get(url, {responseType: 'text'});
  }
  putStories(value: any): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    const url = 'http://leobot.htl-leonding.ac.at:8080/api/file/stories.yml';
    this.http.put(url, value, httpOptions).subscribe();
  }
  getRules(): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        responseType: 'text',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    const url = 'http://leobot.htl-leonding.ac.at:8080/api/file/rules.yml';
    return this.http.get(url, {responseType: 'text'});
  }
  putRules(value: any): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    const url = 'http://leobot.htl-leonding.ac.at:8080/api/file/rules.yml';
    this.http.put(url, value, httpOptions).subscribe();
  }
  getDomain(): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        responseType: 'text',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    const url = 'http://leobot.htl-leonding.ac.at:8080/api/file/domain.yml';
    return this.http.get(url, {responseType: 'text'});
  }
  putDomain(value: any): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'text/plain',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    const url = 'http://leobot.htl-leonding.ac.at:8080/api/file/domain.yml';
    this.http.put(url, value, httpOptions).subscribe();
  }
  public getAllConversations(): Observable<JSON> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    return this.http.get<JSON>(`${BASE_URL}/conversations`, httpOptions);
  }

  public getFeedbacks(): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${BASE_URL}/feedback`);
  }
  public getConversations(id): Observable<JSON> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ' Basic ' + btoa( this.username + ':' + this.password)
      })
    };
    return this.http.get<JSON>(`${BASE_URL}/conversations` + '/' + id, httpOptions);
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
export interface Feedback{
  name: string;
  rating: number;
  text: string;
}
