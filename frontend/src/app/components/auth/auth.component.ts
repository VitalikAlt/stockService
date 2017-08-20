import { Component, OnInit} from '@angular/core';
import  { Router } from '@angular/router';
import { User } from '../../user'
import {UserService } from '../../user.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [UserService]
})
export class AuthComponent implements OnInit {

  private users: User[];
  private login: string;
  private password: string;
  private incorrectInput: boolean;

  constructor(private router: Router,private userService: UserService){ }

  ngOnInit() {

    this.incorrectInput = false;
    this.userService.getUsers().then(users => this.users = users)

  }

  enter () {

    let user: User = this.users.find(user => user.login == this.login && user.password == this.password);
    if (user !== undefined){
      switch (this.login)
      {
        case "teacher": this.router.navigate(['/teacher']); break;
        case "admin" : this.router.navigate(['/admin']); break;
        case "student" : console.log('redirecting to student'); this.router.navigate(['/student', user.id]); break;
        default: this.incorrectInput = true; break;
      }
    }
    else this.incorrectInput = true;

  }
}
