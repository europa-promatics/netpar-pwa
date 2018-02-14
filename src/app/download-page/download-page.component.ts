// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppProvider } from '../providers/app';
import { PopupComponent } from '../alerts/popup/popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// ----------------importing statements for local libraries and plugins ends----------------------

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.scss']
})
export class DownloadPageComponent implements OnInit {
  // -----------local variable------------
	downloadedMedia
  
  constructor(private dialog: MatDialog,private appProvider:AppProvider,private router:Router) {
  	if (localStorage['downloadMedia']) {
        this.downloadedMedia=JSON.parse(localStorage['downloadMedia']);
        console.log(this.downloadedMedia);
    }
  }

  ngOnInit() {
  }

// ----------------invokes on images----------------------

  onImage(url){
    this.appProvider.current.viewImage=url;
    this.router.navigate(['/downloaded-image'])

  }


// ----------------invokes on remove image----------------------

  onRemoveDownload(index){
      let dialogRef = this.dialog.open(PopupComponent, {
          width: '260px',
          data:{ message:"Are you sure you want to remove Downloaded item"}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result=="yes") {
           this.downloadedMedia.splice(index,1);
           localStorage['downloadMedia']=JSON.stringify(this.downloadedMedia);
        }
      });
    }
}
