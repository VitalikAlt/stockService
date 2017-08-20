import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: 'student-profile.component.html',
  styleUrls: ['student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  name: string = "Родион";
  surname: string = "Косов";
  fatherName: string = "Олегович";
  troop: number = 7;
  course: number = 3;

  constructor() { }

  ngOnInit() {
  }

}
