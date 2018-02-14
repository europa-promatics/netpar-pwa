// ----------------importing statements for local libraries and plugins ----------------------

import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AppProvider } from '../providers/app';
import { LoginModel } from '../login/login.model.component';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../alerts/popup/popup.component';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';
import { ExistingUserCheckComponent } from '../alerts/existing-user-check/existing-user-check.component';
import { ActivatedRoute } from '@angular/router';
// ----------------importing statements for local libraries and plugins ends ----------------------


@Component({
  selector: 'app-registeration-step-one',
  templateUrl: './registeration-step-one.component.html',
  styleUrls: ['./registeration-step-one.component.css'],
  providers:[LoginService]
})
export class SignupComponent implements OnInit {
  // ------------------local variables--------------------------
  loginModel:LoginModel= new LoginModel();
  validationErrorMessage
  verifiedData;
  errorMessage;
  loading;
  refrralId;
  // ------------------local variables ends--------------------------

  constructor(private route: ActivatedRoute,private dialog: MatDialog,private appProvider:AppProvider,private loginService:LoginService, private router:Router,private formBuilder: FormBuilder) { 
  
  }

  ngOnInit() {

  }

  // ---------------------------------invokes on next button----------------------- 
  onNext(){
   let validate = {
      mobileNumber:this.loginModel.mobileNumber
    }
    if(!validate.mobileNumber){
      this.validationErrorMessage="mobile number missing"
      this.openValidationAlert(this.validationErrorMessage);
      return
    }
    this.mainSignUpFunction();
  }

  // --------------------------------- mainSignUpFunction invokes on next button----------------------- 

  mainSignUpFunction(){
    if (this.loginModel.mobileNumber.length==10) {
      this.loading=true
       this.loginService.VerifyMobile(this.loginModel.mobileNumber)
       .subscribe(data=>{
         this.verifiedData=data;
         if (this.verifiedData.success==true) {
           this.appProvider.current.mobileNumber=this.loginModel.mobileNumber;
           this.appProvider.current.newMobileNumber=this.loginModel.mobileNumber;
           this.appProvider.current.toOtpPageFlag="registerPage";
           this.appProvider.current.otp_key=data.otp_key;
           this.loading=false
           this.router.navigate(['/otp'],{skipLocationChange:false});
          }  
          else if (this.verifiedData.success==false) {
            this.errorMessage="user already registered";
            this.openDialog(this.errorMessage);
            this.loading=false
          }     
       },err=>{
            this.errorMessage="something went wrong"
            this.openDialog(this.errorMessage);
            this.loading=false
       })
    }else{
      this.errorMessage="incorrect mobile number"
      this.openDialog(this.errorMessage);
      return 0
    }
  }

  // --------- opens the PopupComponent----------------------------
    openDialog(msg): void {
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '240px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          
          }
        });
    }

    // -----------------------opens ExistingUserCheckComponent dailog------------------------
    onExistingUser(){
      let dialogRef = this.dialog.open(ExistingUserCheckComponent, {
          width: '290px'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
           if(result=="SignIn"){
            this.appProvider.current.loginOrUpdateFlag="SignIn" ;
            this.router.navigate(['/Login'],{skipLocationChange:false})
           }else if (result=="Update") {
             this.appProvider.current.loginOrUpdateFlag="Update";
             this.router.navigate(['/Login'],{skipLocationChange:false})
           }
        }
      });
    }

    // -----------------------opens ValidationBoxesComponent dailog------------------------
    
    openValidationAlert(msg){
        let dialogRef = this.dialog.open(ValidationBoxesComponent, {
            width: '240px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          
        });
    }

    
}
