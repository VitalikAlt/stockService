import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { User } from '../../user';
// import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.css']
})
export class StudentComponent implements OnInit {

  private user: any;

  constructor(
    private activeRoute: ActivatedRoute,
    // private userService: UserService
  ) { }

  ngOnInit() {
    this.activeRoute.params
      .switchMap((params: Params) => params['id'])
      .subscribe(user => this.user = user)
  }

  printRouterLink

}
