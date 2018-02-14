import { Component, OnInit } from '@angular/core';
import { AppProvider } from '../providers/app'
@Component({
  selector: 'app-downloaded-image',
  templateUrl: './downloaded-image.component.html',
  styleUrls: ['./downloaded-image.component.scss']
})
export class DownloadedImageComponent implements OnInit {
	url
  constructor(private appProvider:AppProvider) { 
  	if (this.appProvider.current.viewImage) {
  		// alert(this.appProvider.current.viewImage)
  		this.url=this.appProvider.current.viewImage;
  	}
  }

  ngOnInit() {
  }

}
