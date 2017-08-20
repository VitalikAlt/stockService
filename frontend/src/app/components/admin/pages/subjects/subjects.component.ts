import { Component, OnInit, EventEmitter } from '@angular/core';
import {MaterializeAction} from "angular2-materialize";

@Component({
  selector: 'app-admin-subjects',
  templateUrl: 'subjects.component.html',
  styleUrls: ['subjects.component.css']
})
export class AdminSubjectsComponent implements OnInit {

  public addDisciplineModal = new EventEmitter<string|MaterializeAction>();
  public editSubjectModal = new EventEmitter<string|MaterializeAction>();
  public deleteSubjectModal = new EventEmitter<string|MaterializeAction>();

  public disciplineName: string = '';
  public teacherSearch: string = '';
  public selectedItem: any;

  public groupCourseSearch: string = '';
  public groupSquadSearch: string = '';
  public groupAssignedSearch: boolean = false;

  public sort = ['name', false];

  public subjects = [
    {
      name: "дисциплина 2",
      teacher: "Жуков В. А."
    }, {
      name: "дисциплина 1",
      teacher: "Куков В. А."
    }, {
      name: "дисциплина 3",
      teacher: "Луков В. А."
    }
  ];

  public teachers = [
    {
      name: "Жуков В. А."
    }, {
      name: "Куков В. А."
    }, {
      name: "Луков В. А."
    },{
      name: "Жуков В. А."
    }, {
      name: "Куков В. А."
    }, {
      name: "Луков В. А."
    },{
      name: "Жуков В. А."
    }, {
      name: "Куков В. А."
    }, {
      name: "Луков В. А."
    },{
      name: "Жуков В. А."
    }, {
      name: "Куков В. А."
    }, {
      name: "Луков В. А."
    }
  ];

  public groups = [
    {
      course: 1,
      squad: 1,
      count: 1,
      assigned: false
    }, {
      course: 2,
      squad: 2,
      count: 2,
      assigned: true
    }, {
      course: 3,
      squad: 3,
      count: 3,
      assigned: false
    }, {
      course: 1,
      squad: 3,
      count: 3,
      assigned: true
    }, {
      course: 13,
      squad: 23,
      count: 34,
      assigned: true
    }
  ];

  public name_search: string = '';
  public teacher_search: string = '';

  constructor() { }

  ngOnInit() {
  }

  createSubject() {
    this.subjects.push({
      name: this.disciplineName,
      teacher: this.teacherSearch
    })
  }

  deleteSubject() {
    this.subjects.splice(this.subjects.indexOf(this.selectedItem), 1);
  }

  openModalDisciplineAdd() {
    this.addDisciplineModal.emit({action:"modal",params:['open']});
  }

  openModalSubjectDelete() {
    this.deleteSubjectModal.emit({action:"modal",params:['open']});
  }

  openModalSubjectEdit() {
    this.editSubjectModal.emit({action:"modal",params:['open']});
  }

  closeModalDisciplineAdd() {
    this.addDisciplineModal.emit({action:"modal",params:['close']});
  }

  closeModalSubjectDelete() {
    this.deleteSubjectModal.emit({action:"modal",params:['close']});
  }

  closeModalSubjectEdit() {
    this.editSubjectModal.emit({action:"modal",params:['close']});
  }

  subjectsByFilter() {
    const subjects = this.subjects.filter((el) => {
      return String(el.name).indexOf(this.name_search) !== -1 &&
        String(el.teacher).indexOf(this.teacher_search) !== -1
    });

    return subjects.sort((a, b) => {
      if (a[`${this.sort[0]}`] > b[`${this.sort[0]}`]) {
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

  teachersByFilter() {
    return this.teachers.filter((el) => {
      return String(el.name).indexOf(this.teacherSearch) !== -1
    });
  }

  groupsByFilter() {
    return this.groups.filter((el) => {
      return String(el.course).indexOf(this.groupCourseSearch) !== -1 &&
          String(el.squad).indexOf(this.groupSquadSearch) !== -1 &&
          el.assigned === this.groupAssignedSearch
    });
  }
}
