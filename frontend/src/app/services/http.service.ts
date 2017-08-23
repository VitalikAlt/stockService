import { Injectable } from '@angular/core';
import  { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class HttpService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) { }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private extractData (res: Response) {
    let body = res.json();
    return body || { };
  }

  makeFileRequest(files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", this.baseUrl+'upload', true);
      xhr.send(formData);
    });
  }

  signIn(login : string, password : string) : Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'signIn';

    return this.http
      .post(url, JSON.stringify({login, password}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  signUp(login : string, password : string) : Observable<string>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'signUp';

    return this.http
      .post(url, JSON.stringify({login, password}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  savePhoto(login : string, password : string, photoData) : Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'savePhoto';
    photoData.login = login;
    photoData.password = password;

    return this.http
      .post(url, JSON.stringify(photoData), options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
