import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {Md5} from 'ts-md5/dist/md5';
import {Cookie} from 'ng2-cookies';
import {UserService} from '../../services/user.service';
import {AuthGuard} from '../../services/auth_guard.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public login: string;
  public password: string;
  public incorrectInput: boolean;
  public remember: boolean = false;

  constructor(private router: Router, private httpService: HttpService,
              private userService: UserService, private authGuard: AuthGuard) {
  }

  async ngOnInit() {
    this.incorrectInput = false;
    (await this.authGuard.activate()) ? this.route(this.userService.user) : null;
  }

  enter() {
    const password = Md5.hashStr(this.password).toString();
    this.httpService.signIn(this.login, password)
      .subscribe((result) => {
        this.route({login: this.login, password, role: result.role, name: result.name});
      }, (error) => {
        this.incorrectInput = true;
      })


    // let user: User = this.users.find(user => user.login == this.login && user.password == this.password);
    // if (user !== undefined){
    //   switch (this.login)
    //   {
    //     case "teacher": this.router.navigate(['/teacher']); break;
    //     case "admin" : this.router.navigate(['/admin']); break;
    //     case "student" : console.log('redirecting to student'); this.router.navigate(['/student', user.id]); break;
    //     default: this.incorrectInput = true; break;
    //   }
    // }
    // else this.incorrectInput = true;
  }

  route(user) {
    switch (user.role) {
      case 'manager':
        this.saveUserData(user);
        this.router.navigate(['/manager']);
        break;
      default:
        this.incorrectInput = true;
        break;
    }
  }

  saveUserData(user) {
    this.userService.set(user);

    if (!this.remember)
      return;

    Cookie.set('stock_login', user.login);
    Cookie.set('stock_password', user.password);
    Cookie.set('stock_role', user.role);
    Cookie.set('stock_name', user.name);
  }
}
