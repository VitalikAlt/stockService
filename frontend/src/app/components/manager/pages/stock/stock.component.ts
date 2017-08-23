import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  name: string = "Родион";
  surname: string = "Косов";
  fatherName: string = "Олегович";
  troop: number = 7;
  course: number = 3;

  constructor() { }

  ngOnInit() {
  }

}
