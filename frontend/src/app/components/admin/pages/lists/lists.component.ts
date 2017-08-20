import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-lists',
  templateUrl: 'lists.component.html',
  styleUrls: ['lists.component.css']
})
export class AdminListsComponent implements OnInit {

  name: string = "Родион";
  surname: string = "Косов";
  fatherName: string = "Олегович";
  troop: number = 7;
  course: number = 3;

  public state: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log(this.state)
  }
}
