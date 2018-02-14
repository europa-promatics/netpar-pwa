// ----------------importing statements for local libraries and plugins ----------------------
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../alerts/popup/popup.component';
import { Popup2Component } from '../alerts/popup2/popup2.component'
import { SecurityDialogComponent } from '../alerts/security-dialog/security-dialog.component';
import { SecurityDialog2Component } from '../alerts/security-dialog2/security-dialog2.component';
import { Params, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { OtpService } from '../providers/otp.service';
import { AppProvider } from '../providers/app';
import { UpdateMobileService } from '../providers/update-mobile.service';
import { UpdateMobileNo } from './updateMobileNo.model.component';
import { MessagingService } from "../messaging.service";
import { AngularFireDatabase } from 'angularfire2/database';
// ----------------importing statements for local libraries and plugins ends----------------------



@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
  providers:[OtpService,UpdateMobileService,MessagingService]
})

export class OtpComponent implements OnInit {
  // ---------------local variables-------------------
  updateMobileNo:UpdateMobileNo=new UpdateMobileNo()
  data;
  loginModel;
  mobileNo;
  optResponse;
  validateResponse;
  sessionId;
  errorMessage;
  otp=null;
  value1;
  value2;
  value3;
  value4;
  value5;
  value6;
  generatedOtp;
  otp_key=this.appProvider.current.otp_key
  message;
 
  	constructor(private db: AngularFireDatabase,
                private updateMobileService:UpdateMobileService,
                private appProvider:AppProvider,
                private router: Router,
                private dialog: MatDialog,
                private route:  ActivatedRoute,
                private otpService:OtpService,
                private msgService: MessagingService) {
      if (!this.appProvider.current.toOtpPageFlag) {
        this.router.navigate(['/welcome-screen2'])
      }
    }

    // ----------------invokes on intialization of page------------------------
  	ngOnInit() {
      if (this.appProvider.current.toOtpPageFlag=="updateMobileNo") {
        this.mobileNo=this.appProvider.current.newMobileNumber;
      }else{
        this.mobileNo=this.appProvider.current.mobileNumber;
      }
       if (this.mobileNo) {
          this.onSendOtp(this.mobileNo,this.appProvider.current.otp_key);
       }
  	}

    // ------------------invokes the PopupComponent dailog----------------
    openDialog(msg): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result=="update mobile") {
            this.securityDialog();
          }
          else if (result=="updated successfuly") {
           this.router.navigate(['/Home'],{skipLocationChange:false})
          }
          else if(result=="ResendOtp"){
              this.onSendOtp(this.mobileNo,this.appProvider.current.otp_key);
          } 
        });
    }

    // ------------------invokes the Popup2Component dailog----------------

     openDialog2(msg): void {
        let dialogRef = this.dialog.open(Popup2Component, {
            width: '400px', 
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result.success==true) {
              this.errorMessage="mobile number updated"
              this.openDialog(this.errorMessage);
            }
          }
  
        });
    }

    // -----------------------------------invokes the SecurityDialogComponent dailog-----------------------
    securityDialog(): void {
        let dialogRef = this.dialog.open(SecurityDialogComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
           if (result.respCode==1) {
            this.openDialog2("hi");
          }else if (result.respCode==0) {
            this.errorMessage="entered detail does not match"
            this.openDialog(this.errorMessage);
          }
        });
    }

    // -----------------------------------invokes the SecurityDialog2Component dailog-----------------------
    
    securityDialog2(): void {
        let dialogRef = this.dialog.open(SecurityDialog2Component, {
          data:{ message:"fromUpdate"}
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }

 // ----------works on input fields of otp screen------------------------------- 
	setfocus(cState,back,forword){
    if(cState==1){
      if(this.value1.length==0){

      }else if(this.value1.length>0){
        forword.focus();
      }
    }
    if(cState==2){
      if(this.value2.length==0){
        back.focus();
      }else if(this.value2.length>0){
        forword.focus();
      }
    }
    if(cState==3){
      if(this.value3.length==0){
        back.focus();
      }else if(this.value3.length>0){
        forword.focus();
      }
    }
    if(cState==4){
      if(this.value4.length==0){
        back.focus();
      }else if(this.value4.length>0){
        forword.focus();
      }
    }
    if(cState==5){
      if(this.value5.length==0){
        back.focus();
      }else if(this.value5.length>0){
        forword.focus();
      }
    }
     if(cState==6){
      if(this.value6.length==0){
        back.focus();
      }else if(this.value6.length>0){
        this.otp=this.value1+this.value2+this.value3+this.value4+this.value5+this.value6;
      }
    }
	}

  // ------------------invokes on sending otp-------------------
  onSendOtp(mobileNo,otp_p){
    this.generatedOtp=Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
    this.otpService.sendOtp(mobileNo,this.generatedOtp,otp_p).subscribe(data=>{
      if (data.Status == "Success") {
       this.appProvider.current.otp=data.otp;
       console.log("otp saved"+ data.otp);
      }
    },err=>{
      this.errorMessage="incorrect mobile number";
      this.openDialog(this.errorMessage);  
    })
  }

  // ----------------validates the otp matched or not----------------
  onValidateOtp(){
    if(this.otp == this.appProvider.current.otp){
        this.msgService.getPermission();
        this.msgService.receiveMessage();
        this.message = this.msgService.currentMessage;
        // alert(JSON.stringify(this.db.object('fcmTokens/')));
        if (this.appProvider.current.toOtpPageFlag=="registerPage") {
          this.router.navigate(["/register"],{skipLocationChange:false});
        }
        if (this.appProvider.current.toOtpPageFlag=="SingIn") {
          localStorage.setItem('isLoggedin', 'true');
          localStorage['userInfo']=JSON.stringify(this.appProvider.current.userData);
          localStorage['profileImage']=this.appProvider.current.userData.userImage;
          localStorage['mobileNumber']=this.appProvider.current.userData.mobileNumber;
          localStorage['userArticalView']=this.appProvider.current.userData.userArticalView;
          this.router.navigate(["/Home"],{skipLocationChange:false});
           // alert(localStorage.getItem('token'))
            this.updateMobileService.registerDeviceForNotification(this.appProvider.current.userData._id,localStorage.getItem('token')).subscribe(data=>{
              console.log(data);
            },err=>{
              console.log(err);
            })
          
        }
        else if(this.appProvider.current.toOtpPageFlag=="updateMobileNo"){
          this.onUpdate();
        }
    }else{
      this.errorMessage="Invalid otp";
      this.openDialog(this.errorMessage);
    }
  }

  // ----------------------------invokes on update button---------------------
  onUpdate(){
    this.updateMobileNo.mobileNumberNew=this.mobileNo;
    this.updateMobileNo.mobileNumber=this.appProvider.current.previousMobileNumber;
    this.updateMobileService.updateMobileNumber(this.updateMobileNo).subscribe(data=>{
       localStorage['userInfo']=JSON.stringify(data.info);
       localStorage.setItem('isLoggedin', 'true');
       localStorage['profileImage']=this.appProvider.current.userData.userImage
       localStorage['mobileNumber']=this.appProvider.current.userData.mobileNumber;
       localStorage['userArticalView']=this.appProvider.current.userData.userArticalView;
       this.router.navigate(['/Home'],{skipLocationChange:false})
    },error=>{

    })
  }
}
