import { Injectable } from '@angular/core'

@Injectable()
export class UserService {

  private _user: any;

  set(v) {
    this._user = v;
  }

  get user() {
    return this._user;
  }
}
