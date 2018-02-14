// ----------------importing statements for local libraries and plugins ----------------------

import { Component, OnInit,ViewChild,ElementRef,AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material';
import { LoginModel,LoginEngModel } from './login.model.component';
import { LoginService } from './login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { AppProvider } from '../providers/app';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../alerts/popup/popup.component';
import { Popup2Component } from '../alerts/popup2/popup2.component';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';
import { SecurityDialogComponent } from '../alerts/security-dialog/security-dialog.component';
import { SecurityDialog2Component } from '../alerts/security-dialog2/security-dialog2.component';
import { RecheckDetailsComponent } from '../alerts/recheck-details/recheck-details.component';
import { IsThisYouComponent } from '../alerts/is-this-you/is-this-you.component';
import { UpdateMobileNumberComponent } from '../alerts/update-mobile-number/update-mobile-number.component'
// ----------------importing statements for local libraries and plugins ends----------------------


declare var google
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit{
  // ------------local variables------------
 mobileNumber
 validationErrorMessage
 errorMessage
 loginOrUpdate
 loading=false;
 constructor(private dialog: MatDialog,private appProvider:AppProvider,private router: Router,private route:  ActivatedRoute, private loginService:LoginService,private formBuilder: FormBuilder) {
    if (!this.appProvider.current.loginOrUpdateFlag) {
      this.router.navigate(['/welcome-screen2']);
    }else{
      this.loginOrUpdate=this.appProvider.current.loginOrUpdateFlag;
    }
  }


    ngOnInit() {

    }
    // -------------invokes on new user button----------------
    onNewUser(){
     this.router.navigate(['/Signup'],{skipLocationChange:false})
    }

    // --------------invokes on login button-------------------
    onLogIn(){
      let validate = {
        mobileNumber:this.mobileNumber
      }
      if(!validate.mobileNumber){
        this.validationErrorMessage="mobile number missing"
        this.openValidationAlert(this.validationErrorMessage);
        return
      }else{
        if (this.mobileNumber.length==10){
            if(this.appProvider.current.loginOrUpdateFlag=="SignIn"){
              this.loginFunction(this.mobileNumber); 
            }else if(this.appProvider.current.loginOrUpdateFlag=="Update"){
              this.updateMobileNumber(this.mobileNumber);
            }
        }else{
          this.validationErrorMessage="incorrect mobile number";
          this.openValidationAlert(this.validationErrorMessage);
          return 0
        }
      }

    }

    // -----------------show validation messages--------------------
    openValidationAlert(msg){
      let dialogRef = this.dialog.open(ValidationBoxesComponent, {
          width: '260px',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }
    // -----------------show validation messages--------------------

    openRecheckDetails(){
      let dialogRef = this.dialog.open(RecheckDetailsComponent, {
          width: '320px'
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    // -----------------main login function--------------------

    loginFunction(mobileNumber){
      console.log("login fuction");
      this.loading=true
      this.loginService.VerifyMobile(mobileNumber).subscribe(data=>{
        console.log(data);
        this.loading=false
        if (data.msg=="This mobile number already exists in database!!") {
          this.appProvider.current.mobileNumber=this.mobileNumber;
          this.appProvider.current.toOtpPageFlag="SingIn";
          this.appProvider.current.userData=data.info;
          this.appProvider.current.otp_key=data.otp_key;
          this.router.navigate(['/otp'],{skipLocationChange:false});
        }else if(data.msg=="New User!!"){
          if (this.appProvider.current.incorrectMobileDetailCount==0) {
            this.openRecheckDetails();
          }else if(this.appProvider.current.incorrectMobileDetailCount>0){
            this.errorMessage="you are not registered"
            this.openDialog(this.errorMessage);
          }
        }
      },error=>{
          this.loading=false;
          this.errorMessage="something went wrong"
          this.openDialog(this.errorMessage);
          return 0
      })
    }

    // -----------------invokes on update mobile number--------------------

    updateMobileNumber(mobileNumber){
      this.loading=true;
      console.log("update function");
      this.appProvider.current.previousMobileNumber=this.mobileNumber;
      this.loginService.VerifyMobile(mobileNumber).subscribe(data=>{
        this.loading=false;
        if (data.msg=="This mobile number already exists in database!!"){
          this.appProvider.current.firstName=data.info.firstName;
          this.appProvider.current.lastName=data.info.lastName;
          this.appProvider.current.userData=data.info;
          this.appProvider.current.otp_key=data.otp_key;
          this.isThisYouDialog(data);
        }else{
          this.errorMessage="you are not registered"
          this.openDialog(this.errorMessage);
        }
      },error=>{
          this.loading=false;
          this.errorMessage="something went wrong"
          this.openDialog(this.errorMessage);
      })
    }

    // ---------------------open IsThisYouComponent to validate the user-----------------------
    isThisYouDialog(userData): void {
        let dialogRef = this.dialog.open(IsThisYouComponent, {
            width: '240px',
            data:{ data:userData}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="updateMobileNumber") {
              this.securityDialog();
            }if (result=="no") {
               this.errorMessage="please Signup"
              this.openDialog(this.errorMessage);
            }
          }
        });
    }

    // ---------------------open SecurityDialogComponent for security check 1-----------------------

    securityDialog(): void {
      let dialogRef = this.dialog.open(SecurityDialogComponent, {
      });
      dialogRef.afterClosed().subscribe(result => {
       if(result){
          if (result.respCode==1) {
            this.securityDialog2();
          }else if (result.respCode==0) {
            if (result.key=="state") {
              this.errorMessage="state is incorrect"
              this.openDialog(this.errorMessage);
            }
            if (result.key=="district") {
              this.errorMessage="district is incorrect"
              this.openDialog(this.errorMessage);
            }
            if (result.key=="block") {
              this.errorMessage="block is incorrect"
              this.openDialog(this.errorMessage);
            }  
          }
       }
      });
    }

    // ---------------------open SecurityDialog2Component for security check 2-----------------------

    securityDialog2(): void {
      let dialogRef = this.dialog.open(SecurityDialog2Component, {
         data:{ message:"from login"}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.respCode == 1) {
            this.openUpdateMobileDialog();
          }else{
            if(result.key=="gender"){
              this.errorMessage="gender is incorrect";
              this.openDialog(this.errorMessage);
            }
            if (result.key=="dateOfBirth") {
               this.errorMessage="dob is incorrect";
              this.openDialog(this.errorMessage);
            }
          }
        }
      });
    }

    // ------------------to reinitialize the popups if answers are incorrect----------------
    openDialog(msg): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=='block' || result=='state' || result=='district') {
              this.securityDialog();
            }else if(result=='gender'||result=='dob'){
              this.securityDialog2();
            }
          }
        });
    }

    // -------------------opens up the UpdateMobileNumberComponent dialog----------------------
    openUpdateMobileDialog(): void {
        let dialogRef = this.dialog.open(UpdateMobileNumberComponent, {
            width: '240px'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (result=="updateNewMobileNumber") {
              this.loading=true;
              this.loginService.VerifyMobile(this.appProvider.current.newMobileNumber).subscribe(data=>{
                this.loading=false
                if (data.msg=="This mobile number already exists in database!!"){
                    this.errorMessage="user already registered";
                    this.openDialog(this.errorMessage);
                }else{
                  this.appProvider.current.toOtpPageFlag="updateMobileNo";
                  this.router.navigate(["/otp"],{skipLocationChange:false})
                }
              },error=>{
                  this.loading=false;
                  this.errorMessage="something went wrong"
                  this.openDialog(this.errorMessage);
              })
            }
          }
        });
    }
}
