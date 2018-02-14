// ----------------importing statements for local libraries and plugins----------------------

import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatListModule } from '@angular/material';
// ----------------importing statements for local libraries and plugins end----------------------

@Component({
  selector: 'app-download-popup',
  templateUrl: './download-popup.component.html',
  styleUrls: ['./download-popup.component.scss']
})
export class DownloadPopupComponent implements OnInit {

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<DownloadPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    // -----------------------closes the popup after 30 sec------------------------------
  	setTimeout(() => {
        this.onClosedialog()
      }, 30000);
  }

  onClosedialog(){
  	this.dialogRef.close("navigateToPlayStore")
  }

}
