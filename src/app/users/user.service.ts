import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  getWorkAllow() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/users/work-allow`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getWorkDetail(ym: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/users/work-detail`, { ym: ym })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  saveWork(ym: string, works: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/users/work-save`, { ym: ym, works: works })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getWorkSummary(ym: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/users/work-summary`, { ym: ym })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  changePassword(password: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/users/changepass`, { password: password })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
