import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.css']
})
export class WorkPageComponent implements OnInit {
  ym: string;
  works: Array<any> = [];
  workDates: Array<any> = [];
  loading = false;
  serviceDates = [];
  originalSevices = [];
  selectedService = [];
  totalWeekend = 0;
  openConfirm = false;
  isSaving = false;
  errorMessage: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getWorkAllow()
      .then((response: any) => {
        this.works = response.rows;
      });
  }

  toggleSelect(date, type) {
    const idx = _.findIndex(this.selectedService, { work_date: date, work_type: type });
    console.log(date, type, idx)
    if (idx > -1) {
      this.selectedService.splice(idx, 1);
    } else {
      const _idx = _.findIndex(this.workDates, { work_date: date, work_type: type });
      if (_idx > -1) {
        this.selectedService.push({ work_date: date, work_type: type, is_process: this.workDates[_idx].is_process });
      } else {
        this.selectedService.push({ work_date: date, work_type: type, is_process: 'N' });
      }
    }
    // console.log(this.selectedService);
  }

  checkDisabled(date, type): boolean {
    const idx = _.findIndex(this.workDates, { work_date: date, is_process: 'Y' });
    if (idx > -1) {
      return true;
    } else {
      return false;
    }
  }

  checkSelected(date, type): boolean {
    const idx = _.findIndex(this.workDates, { work_date: date, work_type: type });
    if (idx > -1) {
      return true;
    } else {
      return false;
    }
  }

  save() {
    this.openConfirm = true;
  }

  doSave() {
    this.isSaving = true;
    this.userService.saveWork(this.ym, this.selectedService)
      .then((response: any) => {
        if (response.ok) {
          this.openConfirm = false;
        } else {
          this.errorMessage = 'ไม่สามารถบันทึกข้อมูลได้';
          console.log(response.message);
        }
        this.isSaving = false;
        console.log(response);
      })
      .catch(err => {
        this.errorMessage = 'ไม่สามารถบันทึกข้อมูลได้';
        console.log(err);
        this.isSaving = false;
      });
  }

  clearWorks() {
    this.selectedService = [];
    this.serviceDates = [];
  }

  getWorkDetail() {
    this.loading = true;

    // console.log(this.serviceDates);
    this.selectedService = [];
    this.serviceDates = [];
    this.workDates = [];
    this.totalWeekend = 0;
    this.userService.getWorkDetail(this.ym)
      .then((response: any) => {

        this.workDates = response.rows;

        const _startDate = +moment(this.ym, 'YYYY-MM').startOf('month').format('DD');
        const _endDate = +moment(this.ym, 'YYYY-MM').endOf('month').format('DD');
        const serviceDate = `${this.ym}-01`;

        for (let x = 0; x <= _endDate - 1; x++) {
          const obj: any = {};
          obj.work_date = moment(serviceDate, 'YYYY-MM-DD').add(x, 'days').format('YYYY-MM-DD');
          obj.date = moment(serviceDate, 'YYYY-MM-DD').add(x, 'days').format('D');
          obj.weekday = +moment(serviceDate, 'YYYY-MM-DD').add(x, 'days').format('d');
          if (obj.weekday === 0 || obj.weekday === 6) {
            this.totalWeekend++;
          }
          let work = _.filter(this.workDates, { work_date: obj.work_date });
          work.forEach(v => {
            this.selectedService.push({ work_date: v.work_date, work_type: v.work_type, is_process: v.is_process });
          });

          this.serviceDates.push(obj);
        }

        this.loading = false;
      }).catch(err => {
        this.loading = false;
      });
  }
}
