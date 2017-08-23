import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './services/auth_guard.service';

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
  { path: 'manager', component : ManagerComponent,
    children: [
        { path: '', redirectTo: 'stock', pathMatch: "full"},
        { path: 'stock', component: ManagerStockComponent}
    ],
    canActivate: [ AuthGuard ]
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
