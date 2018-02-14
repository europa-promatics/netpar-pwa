// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material';
import { Router } from '@angular/router';
import { AppProvider } from '../../providers/app';
// ----------------importing statements for local libraries and plugins ends----------------------

@Component({
  selector: 'app-recheck-details',
  templateUrl: './recheck-details.component.html',
  styleUrls: ['./recheck-details.component.css']
})
export class RecheckDetailsComponent implements OnInit {

  constructor(private appProvider:AppProvider,private router:Router,private dialog: MatDialog, public dialogRef: MatDialogRef<RecheckDetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.appProvider.current.incorrectMobileDetailCount++;
  }

  // -----------------------invokes on recheck details closes the dialog box----------------
  onRecheckDetails(){
  	this.dialogRef.close();
  }

  // ------------------------invokes on new user navigates to Signup page--------------
  onNewUser(){
  	this.dialogRef.close();
  	this.router.navigate(['/Signup'],{skipLocationChange:false})
  }

}
