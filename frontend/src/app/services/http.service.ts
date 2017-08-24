import { Injectable } from '@angular/core';
import  { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class HttpService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: Http) { }

  private extractData (res: Response) {
    let body = res.json();
    return body || { };
  }

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

  signIn(login: string, password: string) : Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'sign_in';

    return this.http
      .post(url, JSON.stringify({login, password}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  signUp(login: string, password: string, role: string, name: string) : Observable<string>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'sign_up';

    return this.http
      .post(url, JSON.stringify({login, password, role, name, secret_key: '123'}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStock() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'stock/get';

    return this.http
      .post(url, JSON.stringify({}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getReserves(user, stockId) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'reserves/get';

    return this.http
      .post(url, JSON.stringify({login: user.login, password: user.password, stock_id: stockId}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateReserves(user, reserves) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.baseUrl + 'reserves/update';

    return this.http
      .post(url, JSON.stringify({login: user.login, password: user.password, reserves}), options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
