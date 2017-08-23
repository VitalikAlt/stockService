import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../../services/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-manager',
  templateUrl: 'manager.component.html',
  styleUrls: ['manager.component.css']
})
export class ManagerComponent implements OnInit {

  public name: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.name = this.userService.user.name;
  }

  deleteAllCookies() {
    this.userService.set({});
    Cookie.deleteAll('/');
    this.router.navigate(['/auth']);
  }
}
