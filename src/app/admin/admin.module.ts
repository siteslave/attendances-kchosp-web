import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { NgUploaderModule } from 'ngx-uploader';
import { MyDatePickerTHModule } from 'mydatepicker-th';

import { ClarityModule } from 'clarity-angular';
import { MainPageComponent } from './main-page/main-page.component';
import { ProcessPageComponent } from './process-page/process-page.component';
import { AttendancesPageComponent } from './attendances-page/attendances-page.component';
import { ImportPageComponent } from './import-page/import-page.component';
import { InitialPageComponent } from './initial-page/initial-page.component';

import { AttendancesService } from './attendances.service';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth-guard.service';
import { AlertService } from './alert.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ClarityModule,
    NgUploaderModule,
    FormsModule,
    AuthModule,
    MyDatePickerTHModule
  ],
  declarations: [
    AdminComponent,
    MainPageComponent,
    ProcessPageComponent,
    AttendancesPageComponent,
    ImportPageComponent,
    InitialPageComponent
  ],
  providers: [AttendancesService, AlertService, AuthGuard]
})
export class AdminModule { }
