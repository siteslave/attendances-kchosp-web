import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from "../environments/environment";
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { ClarityModule } from 'clarity-angular';
import { NgUploaderModule } from 'ngx-uploader';
import { MyDatePickerTHModule } from 'mydatepicker-th';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UsersModule,
    AdminModule,
    LoginModule,
    NgUploaderModule,
    ClarityModule.forRoot(),
    MyDatePickerTHModule
  ],
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
