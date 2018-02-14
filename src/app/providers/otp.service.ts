import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../environments/environment.prod'
import 'rxjs/Rx';

@Injectable()
export class OtpService {
   errorMessage
  constructor(private http:Http,private dialog: MatDialog) { }


  sendOtp(mobileNumber,otp,otp_Key){
      let body={
          phone:mobileNumber,
          otp:otp
      }
      let api=environment.endPoint;
      return this.http.post(api+"SendOtp/"+otp_Key,body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
  }


  // getOtp(mobileNumber):  Observable<any> {
  //       let api =  "https://2factor.in/API/V1/c9b948e1-8bb7-11e7-94da-0200cd936042/SMS/+91"+mobileNumber+"/AUTOGEN";
  //       return this.http.get(api)
  //       .map(response => {
  //           return response;
  //       }).catch(error => {
  //           if (error) {
  //               this.errorMessage="something went wrong";
  //               this.openDialog(this.errorMessage);
  //           }
  //           return error;
  //       });
  //   }

    // verifyOtp(sessionId,otp):  Observable<any>{
    //     let api = "https://2factor.in/API/V1/c9b948e1-8bb7-11e7-94da-0200cd936042/SMS/VERIFY/"+sessionId+"/"+otp;
    //     return this.http.get(api)
    //     .map(response => {
    //         return response;
    //     }).catch(error => {
    //         if (error.status == 400) {
    //             // alert('error');
    //             this.errorMessage="Invalid otp";
    //             this.openDialog(this.errorMessage);
    //             return error
    //         }
    //     });
    // }


}
