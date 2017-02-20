import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AttendancesService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }


  getImportedLogs() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/admin/imported-logs`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getProcessLogs() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/admin/process-logs`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getInitialLogs() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/admin/initial-logs`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  doProcessSummary(start, end) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/admin/process-summary`, {start: start, end: end})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  doProcess(y, m) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/admin/process`, { y: y, m: m})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  initial(y, m) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/admin/initial`, { y: y, m: m})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }
}
