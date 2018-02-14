// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material';
import { AppProvider } from '../../providers/app';
import { Router } from '@angular/router';
// ----------------importing statements for local libraries and plugins end----------------------
@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {
	userData
  constructor(private router:Router,private appProvider:AppProvider,private dialog: MatDialog, public dialogRef: MatDialogRef<ShareDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { 
  	if (localStorage['userInfo']) {
  		// code...
 		this.userData=JSON.parse(localStorage['userInfo']);
  	}
  }

  ngOnInit() {
  }

}
