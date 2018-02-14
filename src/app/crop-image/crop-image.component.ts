// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit,ViewContainerRef,ViewChild } from '@angular/core';
import { NgxCroppieComponent } from 'ngx-croppie';
import { CroppieOptions } from 'croppie';
import { AppProvider } from '../providers/app'
import { Router } from '@angular/router';
// ----------------importing statements for local libraries and plugins ends----------------------

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit {

  // ------------------local varibales-----------------------
	@ViewChild('ngxCroppie') ngxCroppie: NgxCroppieComponent;

	widthPx = '320';
	heightPx = '320';
	imageUrl 
	currentImage: string;
	croppieImage: string;


  	showsecondary:number=0;
	constructor(private router:Router,private appProvider:AppProvider) {
		this.imageUrl=this.appProvider.current.profilImagePath;
	}
	count:number=1

  	ngOnInit() {
  		this.currentImage = this.imageUrl;
	    this.croppieImage = this.imageUrl;
  	}
  	// ---------------appends the image-------------------
  	addAppend(){
  		this.showsecondary=this.showsecondary+1;
  	}
  
  	// ---------------removes the image-------------------

  	removeAppend(){
  	  //this.showsecondary=!this.showsecondary	
  	}

  	public get imageToDisplay() {
	    if (this.currentImage) { return this.currentImage; }
	    if (this.imageUrl) { return this.imageUrl; }
	    return `http://placehold.it/${this.widthPx}x${this.heightPx}`;
	}

	public get croppieOptions(): CroppieOptions {
	    const opts: CroppieOptions = {};
	    opts.viewport = {
	      	width: parseInt(this.widthPx, 10),
	      	height: parseInt(this.heightPx, 10)
	    };
	    opts.boundary = {
	      	width: parseInt(this.widthPx, 10),
	      	height: parseInt(this.heightPx, 10)
	    };
	    opts.enforceBoundary = true;
	    return opts;
	}

	// --------------invokes on image change----
	ngOnChanges(changes: any) {
	    if (this.croppieImage) { return; }
	    if (!changes.imageUrl) { return; }
	    if (!changes.imageUrl.previousValue && changes.imageUrl.currentValue) {
	      this.croppieImage = changes.imageUrl.currentValue;
	    }
	}

	// modalOpened() {
	//   if (this.croppieImage) {
	//     console.log('binding image to croppie');
	//     this.ngxCroppie.bind();
	//   }
	// }


	newImageResultFromCroppie(img: string) {
	    this.croppieImage = img;
	}
	// ----------------------invokes on save button-------------------

	saveImageFromCroppie() {
	    this.appProvider.current.cropedImage = this.croppieImage;
	    this.router.navigate(['/account'],{skipLocationChange:false})
	}
	// ----------------------invokes on cancel button-------------------

	cancelCroppieEdit() {
	    this.croppieImage = this.currentImage;
	    this.appProvider.current.cropedImage = "";
	    this.router.navigate(['/account'],{skipLocationChange:false})
	}

	// ----------------------diaplays the image-------------------
	imageUploadEvent(evt: any) {
	    if (!evt.target) { return; }
	    if (!evt.target.files) { return; }
	    if (evt.target.files.length !== 1) { return; }
	    const file = evt.target.files[0];
	    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') { return; }
	    const fr = new FileReader();
	    fr.onloadend = (loadEvent) => {
	      this.croppieImage = fr.result;
	    };
	    fr.readAsDataURL(file);
	}

}
