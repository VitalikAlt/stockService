import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-progress',
  templateUrl: 'student-progress.component.html',
  styleUrls: ['student-progress.component.css']
})
export class StudentProgressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  averageMark: number = 3.7;
  missedCount: number = 5;
  visitedCount: number = 5;
  missedPercent: number = this.missedCount/(this.missedCount + this.visitedCount)* 100;
}
