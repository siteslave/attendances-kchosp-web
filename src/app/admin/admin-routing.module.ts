import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AttendancesPageComponent } from './attendances-page/attendances-page.component';
import { ProcessPageComponent } from './process-page/process-page.component';
import { ImportPageComponent } from './import-page/import-page.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'attendances', pathMatch: 'full' },
      { path: 'attendances', component: AttendancesPageComponent, pathMatch: 'full' },
      { path: 'process', component: ProcessPageComponent, pathMatch: 'full' },
      { path: 'import', component: ImportPageComponent, pathMatch: 'full' },
      { path: 'initial', component: InitialPageComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
