// ----------------importing statements for local libraries and plugins ----------------------

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppProvider } from '../providers/app';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExistingUserCheckComponent } from '../alerts/existing-user-check/existing-user-check.component';
// ----------------importing statements for local libraries and plugins ends----------------------


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog,private appProvider:AppProvider,private router: Router,private location: Location) { }

  ngOnInit() {
  }

  // ----------------on back button------------------
  onBack(){
  	this.location.back();
  }
  // -------------------on signin button---------------
  onSignIn(){
    this.appProvider.current.fromPageFlag="login";
   	this.router.navigate(['/Login'],{skipLocationChange:false});
  }
  // -------------------on signup button---------------

  onSignUp(){
    this.appProvider.current.fromPageFlag="signup";
  	this.router.navigate(['/Signup'],{skipLocationChange:false})
  }
  // -------------------opens the popup dailog---------------

  openDialog(): void {
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

}
