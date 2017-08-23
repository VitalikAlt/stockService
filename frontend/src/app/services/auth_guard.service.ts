import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { UserService } from './user.service';
import { HttpService } from './http.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private httpService: HttpService) {}

  canActivate(route, state): boolean {
    const cookies = Cookie.getAll();

    if (!cookies.stock_login)
      return false;

    this.getRole(cookies, route.url[0].path)
      .then((res) => {
        console.log(res)
        return res
      }, (rej) => {
        console.log(rej)
        return rej
      })
  }

  getRole(cookies, route) {
    return new Promise((res, rej) => {
      this.httpService.signIn(cookies.stock_login, cookies.stock_password)
        .subscribe((result) => {
          res(result.role === route)
        }, (error) => {
          rej(error);
        })
    })
  }
}
