// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// ----------------importing statements for local libraries and plugins ends----------------------

@Component({
  selector: 'app-validation-boxes',
  templateUrl: './validation-boxes.component.html',
  styleUrls: ['./validation-boxes.component.css']
})
export class ValidationBoxesComponent implements OnInit {
  // ---------local variables--
	errorMessage
  // ---------local variables ends--
  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ValidationBoxesComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  	this.errorMessage=this.data.message;
  }


  onClosed(){
   this.dialogRef.close(); 
  }

}
