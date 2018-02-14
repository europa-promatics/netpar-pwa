import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatListModule} from '@angular/material';

@Component({
  selector: 'app-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.css']
})
export class LanguageDialogComponent implements OnInit {

  	constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<LanguageDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any) { }

  	ngOnInit() {
  	}

  	onClosed(){
	  	this.dialogRef.close();
  	}

}
