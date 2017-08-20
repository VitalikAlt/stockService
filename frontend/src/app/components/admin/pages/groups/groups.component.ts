import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'app-admin-groups',
  templateUrl: 'groups.component.html',
  styleUrls: ['groups.component.css']
})
export class AdminGroupsComponent implements OnInit {

  public modalCurseUp = new EventEmitter<string|MaterializeAction>();

  public course_search : string = '';
  public squad_search : string = '';
  public count_search : string = '';

  public sort = ['course', false];

  public groups = [
    {
      course: 1,
      squad: 1,
      count: 1
    }, {
      course: 2,
      squad: 2,
      count: 2
    }, {
      course: 3,
      squad: 3,
      count: 3
    }, {
      course: 1,
      squad: 3,
      count: 3
    }, {
      course: 13,
      squad: 23,
      count: 34
    }
  ];

  constructor() { }

  ngOnInit() {

  }

  upCourse() {
    for( let i = 0; i < this.groups.length; i++) {
      this.groups[i]['course'] = Number(this.groups[i]['course']) + 1;
    }
  }

  openModalCurseUp() {
    this.modalCurseUp.emit({action:"modal",params:['open']});
  }

  closeModalCurseUp() {
    this.modalCurseUp.emit({action:"modal",params:['close']});
  }

  groupsByFilter() {
    const groups = this.groups.filter((el) => {
      return String(el.course).indexOf(this.course_search) !== -1 &&
        String(el.squad).indexOf(this.squad_search) !== -1 &&
        String(el.count).indexOf(this.count_search) !== -1
    });

    return groups.sort((a, b) => {
      if (Number(a[`${this.sort[0]}`]) > Number(b[`${this.sort[0]}`])) {
        return (this.sort[1])? -1 : 1;
      } else {
        return (this.sort[1])? 1 : -1;
      }
    })
  }

  changeSort(type) {
    if (this.sort[0] === type) {
      this.sort[1] = !this.sort[1];
    } else {
      this.sort[1] = false;
    }

    this.sort[0] = type;
  }
}
