import { Cookie } from 'ng2-cookies';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpService } from './http.service';

//TODO need rewiew
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private httpService: HttpService, private userService: UserService, private router: Router) {}

  canActivate(route, state): Promise<boolean> {
    return new Promise((res, rej) => {

      if (!this.userService.user) {
        const cookies = Cookie.getAll();

        if (!cookies.stock_login) {
          this.router.navigate(['/auth']);
          return res(false);
        }

        this.userService.set({login: cookies.stock_login, password: cookies.stock_password});
      }

      return this.httpService.signIn(this.userService.user.login, this.userService.user.password)
        .subscribe((result) => {
          const accept = result.role === route.url[0].path;

          if (accept)
            this.userService.set(Object.assign(this.userService.user, result));
          else
            this.router.navigate(['/auth']);

          return res(accept);
        }, (error) => {
          return rej(error);
        });
    })
  }

  activate() {
    return new Promise((res, rej) => {

      if (!this.userService.user || !this.userService.user.login) {
        const cookies = Cookie.getAll();

        if (!cookies.stock_login)
          return false;

        this.userService.set({login: cookies.stock_login, password: cookies.stock_password});
      }

      return this.httpService.signIn(this.userService.user.login, this.userService.user.password)
        .subscribe((result) => {
          this.userService.set(Object.assign(this.userService.user, result));
          return res(true);
        }, (error) => {
          return rej(error);
        });

    })
  }
}
