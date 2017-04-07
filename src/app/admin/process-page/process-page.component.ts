import { Component, OnInit } from '@angular/core';
import { AttendancesService } from '../attendances.service';
import { AlertService } from "../alert.service";
@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.css']
})
export class ProcessPageComponent implements OnInit {

  processMonth: any;
  processYear: any;
  isProcessing = false;

  processLogs: Array<any> = [];
  
  constructor(
    private attendancesService: AttendancesService,
    private alertService: AlertService
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
        this.isProcessing = false;
        if (results.ok) {
          this.alertService.success('ประมวลผลเสร็จสิ้น', `ประมวลผลทั้งสิ้น ${results.total.toFixed()} รายการ`);
          this.getProcessLogs();
        } else {
          this.alertService.error(JSON.stringify(results.error));
        }
      });
  }

}
