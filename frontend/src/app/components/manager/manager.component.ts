import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manager',
  templateUrl: 'manager.component.html',
  styleUrls: ['manager.component.css']
})
export class ManagerComponent implements OnInit {

  public name: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.name = this.userService.user.name;
  }
}
