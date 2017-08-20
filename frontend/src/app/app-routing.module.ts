import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

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

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  { path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  },
  {
    path: 'student/:id', component: StudentComponent,
    children:
      [
        { path: '', redirectTo: 'profile', pathMatch: "full"},
        { path: 'profile', component: StudentProfileComponent},
        { path: 'progress', component: StudentProgressComponent},
        { path: 'schedule', component: StudentScheduleComponent},
      ]
  },
  { path: 'teacher', component : TeacherComponent,
    children:
      [
        { path: '', redirectTo: 'profile', pathMatch: "full"},
        { path: 'profile', component: TeacherProfileComponent},
        { path: 'journal', component: TeacherJournalComponent},
        { path: 'schedule', component: TeacherScheduleComponent},
        { path: 'reports', component: TeacherReportsComponent}
      ]
  },
  { path: 'admin', component: AdminComponent,
    children:
      [
        { path: '', redirectTo: 'lists', pathMatch: "full"},
        { path: 'lists', component: AdminListsComponent},
        { path: 'groups', component: AdminGroupsComponent},
        { path: 'subjects', component: AdminSubjectsComponent},
      ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule(
  {
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
  }
)

export class AppRoutingModule {}
