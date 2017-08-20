import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from "./app-routing.module";
import { NgSpinningPreloader } from 'ng2-spinning-preloader';

import { AppComponent } from './app.component';
import { UserService } from './user.service';

import { AuthComponent } from './components/auth/auth.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { StudentComponent } from './components/student/student.component';
import { StudentProfileComponent } from './components/student/pages/student-profile/student-profile.component';
import { StudentProgressComponent } from './components/student/pages/student-progress/student-progress.component'
import { StudentScheduleComponent } from './components/student/pages/student-schedule/student-schedule.component';

import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherProfileComponent } from './components/teacher/pages/profile/profile.component';
import { TeacherJournalComponent } from './components/teacher/pages/journal/journal.component';
import { TeacherScheduleComponent } from './components/teacher/pages/schedule/schedule.component';
import { TeacherReportsComponent } from './components/teacher/pages/reports/reports.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminGroupsComponent } from './components/admin/pages/groups/groups.component';
import { AdminListsComponent } from './components/admin/pages/lists/lists.component';
import { AdminSubjectsComponent } from './components/admin/pages/subjects/subjects.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PageNotFoundComponent,

    StudentComponent,
    StudentProfileComponent,
    StudentProgressComponent,
    StudentScheduleComponent,

    TeacherComponent,
    TeacherProfileComponent,
    TeacherJournalComponent,
    TeacherScheduleComponent,
    TeacherReportsComponent,

    AdminComponent,
    AdminGroupsComponent,
    AdminListsComponent,
    AdminSubjectsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule
  ],
  providers: [NgSpinningPreloader, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
