import { Component, OnInit, Inject } from '@angular/core';

import { UserService } from '../user.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  ym: string;
  works: Array<any> = [];
  workDates: Array<any> = [];
  loading = false;
  token: string;

  constructor(
    private userService: UserService,
    @Inject('API_URL') private url: string
  ) {
    this.works = [];
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    this.userService.getWorkAllow()
      .then((response: any) => {
        this.works = response.rows;
      });
  }

  clearWorks() {
    this.workDates = [];
  }

  getWorkSummary() {
    this.loading = true;
    this.workDates = [];
    if (this.ym) {
      this.userService.getWorkSummary(this.ym)
        .then((response: any) => {
          if (response.ok) {
            this.workDates = response.rows;
          } else {
            console.log(response.message);
          }
          this.loading = false;
        }, error => {
          this.loading = false;
          console.log(error);
        });
    }
  }

  print() {
    console.log(this.ym);
    const url = `${this.url}/users/print/${this.ym}?token=${this.token}`;
    window.open(url, '_blank');
  }

}
