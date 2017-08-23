import { Component, OnInit} from '@angular/core';
import  { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Cookie } from 'ng2-cookies';
import { UserService } from '../../services/user.service';

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

  constructor(private router: Router, private httpService: HttpService, private userService: UserService){ }

  ngOnInit() {
    this.incorrectInput = false;
  }

  enter () {
    const password = Md5.hashStr(this.password).toString();
    this.httpService.signIn(this.login, password)
      .subscribe((result) => {
        switch (result.role) {
          case 'manager':
            this.router.navigate(['/manager']);
            this.saveUserData(this.login, password, result.role, result.name);
            break;
          default: this.incorrectInput = true; break;
        }
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

  saveUserData(login, password, role, name) {
    this.userService.set({login, password, role, name});

    if (!this.remember)
      return;

    Cookie.set('stock_login', login);
    Cookie.set('stock_password', password);
    Cookie.set('stock_role', role);
    Cookie.set('stock_name', name);
  }
}
