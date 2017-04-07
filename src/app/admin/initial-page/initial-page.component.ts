import { Component, OnInit } from '@angular/core';
import { AttendancesService } from '../attendances.service';
import { AlertService } from "../alert.service";
@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent implements OnInit {
  isProcessing = false;
  total = 0;

  processYear: string;
  processMonth: string;

  initialsLogs: Array<any> = [];

  constructor(
    private attendancesService: AttendancesService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getInitialLogs();
  }

  getInitialLogs() {
    this.initialsLogs = [];
    this.attendancesService.getInitialLogs()
      .then((results: any) => {
        if (results.ok) {
          this.initialsLogs = results.rows;
        } else {
          this.alertService.error(JSON.stringify(results.error));
        }
      })
      .catch(() => {
        this.alertService.serverError();
      });
  }

  doInitial() {
    this.isProcessing = true;
    this.attendancesService.initial(this.processYear, this.processMonth)
      .then((results: any) => {
        this.isProcessing = false;
        if (results.ok) {
          this.alertService.success('ผลการนำเข้าข้อมูล', 'นำเข้าทั้งหมด ' + results.total + ' รายการ');
          this.getInitialLogs();
        } else {
          this.alertService.error(JSON.stringify(results.error));
        }
      })
      .catch(() => {
        this.alertService.serverError();
      });
  }
}
