import { Component, OnInit } from '@angular/core';
import { AttendancesService } from '../attendances.service';

@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.css']
})
export class ProcessPageComponent implements OnInit {

  processMonth: any;
  processYear: any;
  isProcessing = false;
  total = 0;

  isSuccess = false;
  isError = false;

  processLogs: Array<any> = [];
  
  constructor(
    private attendancesService: AttendancesService
  ) { }

  ngOnInit() {
    this.getProcessLogs();
  }

  getProcessLogs() {
    this.processLogs = [];
    this.attendancesService.getProcessLogs()
      .then((results: any) => {
        this.processLogs = results.rows;
      });
  }

  doProcess() {
    this.isProcessing = true;
    this.attendancesService.doProcess(this.processYear, this.processMonth)
      .then((results: any) => {
        console.log(results);
        this.isProcessing = false;
        if (results.ok) {
          this.isSuccess = true;
          this.isError = false;
          this.total = results.total;
          this.getProcessLogs();
        } else {
          this.isError = true;
          this.isSuccess = false;
          this.total = 0;
        }

        const that = this;

        setTimeout(function () {
          that.isError = false;
          that.isSuccess = false;
          that.total = 0;
        }, 5000);
      });
  }

}
