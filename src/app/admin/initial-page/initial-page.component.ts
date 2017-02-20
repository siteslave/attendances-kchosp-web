import { Component, OnInit } from '@angular/core';
import { AttendancesService } from '../attendances.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent implements OnInit {
  isProcessing = false;
  isSuccess = false;
  isError = false;
  total = 0;

  processYear: string;
  processMonth: string;

  initialsLogs: Array<any> = [];

  constructor(private attendancesService: AttendancesService) { }

  ngOnInit() {
    this.getInitialLogs();
  }

  getInitialLogs() {
    this.initialsLogs = [];
    this.attendancesService.getInitialLogs()
      .then((results: any) => {
        this.initialsLogs = results.rows;
      });
  }

  doInitial() {
    this.isProcessing = true;
    this.attendancesService.initial(this.processYear, this.processMonth)
      .then((results: any) => {
        this.isProcessing = false;
        if (results.ok) {
          this.isError = false;
          this.isSuccess = true;
          this.total = results.total;
          this.getInitialLogs();
        } else {
          this.isError = true;
          this.isSuccess = false;
        }

        const that = this;

        setTimeout(function() {
          that.isError = false;
          that.isSuccess = false;
        }, 5000);
      });
  }
}
