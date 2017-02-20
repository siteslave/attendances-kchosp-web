import { Component, OnInit, Inject } from '@angular/core';
import { AttendancesService } from '../attendances.service';
@Component({
  selector: 'app-attendances-page',
  templateUrl: './attendances-page.component.html',
  styleUrls: ['./attendances-page.component.css']
})
export class AttendancesPageComponent implements OnInit {

  works: Array<any> = [];
  startDate: string;
  endDate: string;
  processing = false;

  token: string;
  constructor(
    private attendancesService: AttendancesService,
    @Inject('API_URL') private url: string
  ) {
    this.token = sessionStorage.getItem('token');
   } 

  ngOnInit() {
  }

  doProcess() {
    this.processing = true;
    this.attendancesService.doProcessSummary(this.startDate, this.endDate)
      .then((results: any) => {
        this.processing = false;
        this.works = results.rows;
      }, err => {
        this.processing = false;
      });
  }

  print(employeeCode) {
    if (this.startDate && this.endDate) {
      const url = `${this.url}/admin/print/${employeeCode}/${this.startDate}/${this.endDate}?token=${this.token}`;
      window.open(url, '_blank');
    }
  }

  excelExport() {
    if (this.startDate && this.endDate) {
      const url = `${this.url}/admin/export-excel/${this.startDate}/${this.endDate}?token=${this.token}`;
      window.open(url, '_blank');
    }
  }

}
