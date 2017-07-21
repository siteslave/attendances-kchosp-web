import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { AttendancesService } from '../attendances.service';
import { IMyOptions, IMyDayLabels } from 'mydatepicker-th';
import * as moment from 'moment';

import { AlertService } from "../alert.service";
@Component({
  selector: 'app-attendances-page',
  templateUrl: './attendances-page.component.html',
  styleUrls: ['./attendances-page.component.css']
})
export class AttendancesPageComponent implements OnInit {

  works: Array<any> = [];
  startDate: any;
  endDate: any;
  processing = false;

  token: string;

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    showClearDateBtn: false,
    editableDateField: false
    // editableMonthAndYear: false
  };

  constructor(
    private attendancesService: AttendancesService,
    @Inject('API_URL') private url: string,
    private changeDetectorRef: ChangeDetectorRef,
    private alertService: AlertService
  ) {
    this.token = sessionStorage.getItem('token');
    this.startDate = { date: { year: moment().get('year'), month: moment().get('month') + 1, day: moment().get('date') } };
    this.endDate = { date: { year: moment().get('year'), month: moment().get('month') + 1, day: moment().get('date') } };
  }

  ngOnInit() {
  }

  doProcess() {
    this.processing = true;
    const _start = moment(this.startDate.jsdate).format('YYYY-MM-DD');
    const _end = moment(this.endDate.jsdate).format('YYYY-MM-DD');
    this.attendancesService.doProcessSummary(_start, _end)
      .then((results: any) => {
        this.processing = false;
        if (results.ok) {
          this.works = results.rows;
          this.alertService.success();
          this.changeDetectorRef.detectChanges();
        } else {
          this.alertService.error(JSON.stringify(results.error));
        }
      }, err => {
        this.alertService.serverError();
        this.processing = false;
      });
  }

  print(employeeCode) {
    if (this.startDate && this.endDate) {
      const _start = moment(this.startDate.jsdate).format('YYYY-MM-DD');
      const _end = moment(this.endDate.jsdate).format('YYYY-MM-DD');
      const url = `${this.url}/admin/print/${employeeCode}/${_start}/${_end}?token=${this.token}`;
      window.open(url, '_blank');
    }
  }

  excelExport() {
    if (this.startDate && this.endDate) {
      const _start = moment(this.startDate.jsdate).format('YYYY-MM-DD');
      const _end = moment(this.endDate.jsdate).format('YYYY-MM-DD');
      const url = `${this.url}/admin/export-excel/${_start}/${_end}?token=${this.token}`;
      window.open(url, '_blank');
    }
  }

}
