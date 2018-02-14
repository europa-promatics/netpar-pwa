
// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material';
import { AppProvider } from '../../providers/app';
import { Router } from '@angular/router';
// ----------------importing statements for local libraries and plugins end----------------------

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  message;
  count;
  constructor(private router:Router,private appProvider:AppProvider,private dialog: MatDialog, public dialogRef: MatDialogRef<PopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.messages();
  }


// ---------------will invokes on  dialog close -----------------------
  onClosed(){
    if (this.count) {
      this.dialogRef.close(this.count);
    }else{
      this.dialogRef.close();
    }
  	
  }

// ---------------will count the number of times user inputs the wrong mobile number -----------------------

  messages(){
    this.message=this.data.message;
    if (this.message == "incorrect mobile number") {
       this.appProvider.current.incorrectMobileDetailCount++    
      if (this.appProvider.current.incorrectMobileDetailCount>2) {
        this.count=this.appProvider.current.incorrectMobileDetailCount
      }
    }
  }

  //-----------------------invokes on update mobile----------------------
  onUpdate(){
    this.dialogRef.close("update mobile");
  }

  //-----------------------invokes on thanks button after successfully updating mobile number----------------------

  onUpdatedSuccessfuly(){
    this.dialogRef.close("updated successfuly");
  }


  // --------------------invokes on signup button leads to signup page----------------------
  onSignup(){
    this.dialogRef.close("Signup");
    this.router.navigate(['/Signup'],{skipLocationChange:false})
  }

  // ----------------------invokes on resend button--------------------
  onResend(){
    this.dialogRef.close("ResendOtp");
  }

  // ----------------------invokes on download button--------------------
  onDownload(){
    this.dialogRef.close("yes");
  }

  // --------------invokes if user enters wrong answers -----------------
  onWrongSecurityAnswers(key){
     this.dialogRef.close(key);
  }

  // -----------------invokes on logout button---------------------
  onLogout(){
    this.dialogRef.close("logOut");
  }

  // ----------------------invokes on remove media buttons---------------

  onRemove(){
    this.dialogRef.close("yes");
  }

  // ----------------------invokes on remove view your post buttons---------------

  onViewPost(){
    this.dialogRef.close("viewPost");
  }

  // --------------------invokes on continue browsing button------------------------

  onContinueBrowsing(){
    this.dialogRef.close("continueBrowsing");
  }

  // ----------------------invokes on 1 more post---------------
  onPostOneMore(){
    this.dialogRef.close("postOneMore");
  }
}
