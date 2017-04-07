import { Injectable } from '@angular/core';
import { default as swal, SweetAlertType, SweetAlertOptions } from 'sweetalert2';

@Injectable()
export class AlertService {

  constructor() { }

 error(text?: string) {

    const option: SweetAlertOptions = {
      title: 'เกิดข้อผิดพลาด',
      text: text || 'เกิดข้อผิดพลาด',
      type: 'error',
      confirmButtonText: 'ตกลง'
    };
    swal(option);

  }

  success(title?: string, text?: string) {

    const option: SweetAlertOptions = {
      title: title || 'ดำเนินการเสร็จเรียบร้อย',
      text: text || '',
      type: 'success',
      confirmButtonText: 'ตกลง'
    };
    swal(option);

  }

  serverError() {

    const option: SweetAlertOptions = {
      title: 'เกิดข้อผิดพลาด',
      text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      type: 'error',
      confirmButtonText: 'ตกลง'
    };
    swal(option);

  }

  confirm(text?: string, title?: string ) {
    const option: SweetAlertOptions = {
      title: title || 'Are you sure?',
      text: text || 'คุณต้องการดำเนินการนี้ ใช่หรือไม่?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ดำเนินการ!',
      cancelButtonText: 'ยกเลิก'
    };
     return swal(option);
  }

}
