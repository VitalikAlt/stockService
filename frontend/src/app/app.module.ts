import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from "./app-routing.module";
import { NgSpinningPreloader } from 'ng2-spinning-preloader';

import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth_guard.service';

import { AppComponent } from './app.component';

import { AuthComponent } from './components/auth/auth.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { StudentComponent } from './components/student/student.component';
import { StudentProfileComponent } from './components/student/pages/student-profile/student-profile.component';
import { StudentProgressComponent } from './components/student/pages/student-progress/student-progress.component'
import { StudentScheduleComponent } from './components/student/pages/student-schedule/student-schedule.component';

import { ManagerComponent } from './components/manager/manager.component';
import { ManagerStockComponent } from './components/manager/pages/stock/stock.component';

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

    ManagerComponent,
    ManagerStockComponent,

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
  providers: [NgSpinningPreloader, UserService, HttpService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
