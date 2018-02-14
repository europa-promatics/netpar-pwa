// ----------------importing statements for local libraries and plugins----------------------

import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';//used by close button 
import { UserContibutionModel } from './add-contribution.model.component';
import { AppProvider } from '../providers/app';
import { DomSanitizer } from '@angular/platform-browser';// used for making safe urls
import { AddContributionService } from './add-contribution.service';//imports the services to be used for media upload 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';// used to create dialogs with popup components
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';// used 
import { PopupComponent } from '../alerts/popup/popup.component';
import { TranslationService } from '../providers/translation.service'
import { Router } from '@angular/router';
import { FetchSectionsService } from '../providers/fetch-sections.service';
// ----------------importing statements for local libraries and plugins ends----------------------


// global variable
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-add-contribution',
  templateUrl: './add-contribution.component.html',
  styleUrls: ['./add-contribution.component.css'],
  providers:[TranslationService,AddContributionService,FetchSectionsService]
})
export class AddContributionComponent implements OnInit {
    // -------------local variables------------------------
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    userInfo:any;
    userContibutionModel: UserContibutionModel = new UserContibutionModel ();
    firstName:any
    lastName:any
    mobileNumber:any
    language:any
    sectionData:any;
    categories:any;
    subCategories:any;
    uploadedImage:any;
    newUploadFiles:any;
    length:any;
    uploadFile:any;
    sectionId:any;
    mediaToUpload=[];
    slides = [];
    validationErrorMessage:any;;
    currentInputTag:any;
    currentString:any;
    sendString:any;
    outputStringArrayLength:any;
    currentActiveIndex:any;
    inputStringLength:any;
    outputStringLength:any;
    caretPos:any;
    selectedValue:any;
    postButton:boolean=true;
    sectionNameDisable:boolean=false;
    categoryNameDisable:boolean=false;
    subCategoryNameDisable:boolean=false;
    languageDisable:boolean=false;
    TitleDisable:boolean=false;
    descriptionDisable:boolean=false;
    imagesDisable:boolean=false;
    suggestedDataForTransliteration
    loading;
    constructor(private fetchSectionsService:FetchSectionsService,private router:Router,private translationService:TranslationService,private elementRefrence:ElementRef,private dialog: MatDialog,private addContributionService:AddContributionService,private domSanitizer:DomSanitizer,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      this.location = location;
      this.sidebarVisible = false;

      // ---------------------- if user data is missing 'll direct to welcome-screen page ----------- 
      if(localStorage['userInfo']){
        this.userInfo=JSON.parse(localStorage['userInfo'])
        this.firstName=this.userInfo.firstName;
        this.lastName=this.userInfo.lastName;
        this.mobileNumber=this.userInfo.mobileNumber;
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
      if (localStorage['selectedLanguage']) {
        this.language=localStorage['selectedLanguage']
      }
    }


  	ngOnInit() {
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.fetchSectionData()//invokes the fetchSectionData function
  	}


    // ----------------------------used for removing side navbar--------------------------
  	navRemove(){
  		if (localStorage['menuOpen']=='true') {
	  		const body = document.getElementsByTagName('body')[0];
	      this.toggleButton.classList.remove('toggled');
	      this.sidebarVisible = false;
	      body.classList.remove('nav-open');
  		}
  	}

    // ----------------------------used for selecting the section--------------------------
    onSection(section){
      console.log(section)
      this.categories=section.section_categories;
    }

    // ----------------------------used for selecting the category--------------------------

    onCategory(category){
      console.log(category)
      this.subCategories=category.section_subcategories;
    }

    // ----------------------------used for selecting the subcategory--------------------------

    onSubcategory(subCategory){
        console.log(subCategory)
        this.userContibutionModel.sectionId=subCategory.sectionId;
        this.userContibutionModel.categoryId=subCategory.categoryId;
        this.userContibutionModel.subCategoryId=subCategory._id;
    }

    slideConfig = {"slidesToShow": 4, "slidesToScroll": 2};


    // --------------------used to add the media---------------
    addSlide(mediaUrl,mediaType) {
      this.slides.push({url: mediaUrl,type:mediaType})
    }

    // -----------------------used for removing the attached media-----------------
    removeSlide(index) {
      // this.slides.length = this.slides.length - 1;
      let dialogRef = this.dialog.open(PopupComponent, {
          width: '240px',
          data:{ message:"are you sure you want to remove attached media"}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result=='yes') {
          this.slides.splice(index,1);
          if (this.mediaToUpload) {
            this.mediaToUpload.splice(index,1);
          }
        }
      });
      
    }

  // -------------------used to upload the media in contribution ----------------------
    onUploadImage(event,type){
      if(type=='image'){
        let tmppath = URL.createObjectURL(event.target.files[0]);
        this.uploadedImage=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
        this.addSlide(this.uploadedImage,type)
      }else if(type=='audio'){
        let url = "./assets/img/volume.png";
        this.addSlide(url,type)
      }else if (type=='video') {
        let tmppath = URL.createObjectURL(event.target.files[0]);
        this.uploadedImage=this.domSanitizer.bypassSecurityTrustResourceUrl(tmppath);
        this.addSlide(this.uploadedImage,type)
      }else if (type=='doc') {
        let url ="./assets/img/document.png";
        this.addSlide(url,type)
      }
      let files = [].slice.call(event.target.files);
      this.newUploadFiles=files;
      console.log(this.newUploadFiles[0])
      this.length = this.newUploadFiles.length;
      this.onUploadImg(type)
    }

    // -------------------used to upload the media in contribution ---------------------- 
    onUploadImg(type){
      this.postButton=false;
      for (var i = 0; i < this.length; i++) {
          let formData: FormData = new FormData();
          console.log(this.newUploadFiles[i])
          this.uploadFile = this.newUploadFiles[i];
          formData.append('photos', this.uploadFile);
          this.addContributionService.uploadMedia(formData,type).subscribe(response=>{
            console.log(response);
            if(response.success==true){
                 this.mediaToUpload.push({url:response.filepath,type:response.type,size:response.size});
                 this.userContibutionModel.media=this.mediaToUpload;
                 this.postButton=true;
            }
          },error=>{
            console.log(error);
          })
      }
    }

    // ------------------ used to santize the url-------------------------
    safeUrl(url){
      let a=this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    }

// -----used by post button check required details and if missing call the openValidationAlert() else calls uploadContribution()----
     onPost(){
       let validate = {
          section:this.userContibutionModel.sectionName,
          category:this.userContibutionModel.categoryName,
          subcategory:this.userContibutionModel.subCategoryName,
          language:this.userContibutionModel.language,
          title:this.userContibutionModel.title,
          description:this.userContibutionModel.description,
        }
        if(!validate.section){
          this.validationErrorMessage="section missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.category) {
          this.validationErrorMessage="category missing";
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.subcategory) {
          this.validationErrorMessage="subcategory missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.language) {
          this.validationErrorMessage="language missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.title) {
          this.validationErrorMessage="title missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }else if (!validate.description) {
          this.validationErrorMessage="description missing"
          this.openValidationAlert(this.validationErrorMessage);
          return
        }
        this.userContibutionModel.userId=this.userInfo._id;
        this.userContibutionModel.userName=this.firstName+" "+this.lastName;
        this.userContibutionModel.mobile=this.mobileNumber;
        this.userContibutionModel.dateOfCreation=new Date();
        this.userContibutionModel.userImage=localStorage['profileImage'];
        this.uploadContribution();
     }

    // ----------------------------used to upload the contribution to the server--------------------
     uploadContribution(){
       this.addContributionService.uploadContribution(this.userContibutionModel).subscribe(result=>{
         this.openDialog('contribution submitted successfully');
       },error=>{
          console.log(error);
       })
     }

    // ------------------------used to open the validation popups when details are missing-----------------
     openValidationAlert(msg){
      let dialogRef = this.dialog.open(ValidationBoxesComponent, {
          width: '260px',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    // ------------------------used to open the dialog on successfully posting the contibution-----------------
    openDialog(msg): void {
      let dialogRef = this.dialog.open(PopupComponent, {
          width: '360px',
          panelClass: 'for_width',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
           if (result=="viewPost") {
             this.disableForm()
           }else if (result=="continueBrowsing") {
             this.router.navigate(['/Home'])
           }else if (result=="postOneMore") {
             this.resetForm();
           }
        }
      });
    }

    // --------------------used to reset the contribution form-------------------- 

    resetForm(){
      this.userContibutionModel.title='';
      this.userContibutionModel.sectionName='';
      this.userContibutionModel.categoryName='';
      this.userContibutionModel.subCategoryName='';
      this.userContibutionModel.description='';
      this.userContibutionModel.media='';
      this.userContibutionModel.language='';
      this.slides=[]
    }

    // --------------------used to disable the contribution form-------------------- 
    disableForm(){
      this.sectionNameDisable=true;
      this.categoryNameDisable=true;
      this.subCategoryNameDisable=true;
      this.languageDisable=true;
      this.TitleDisable=true;
      this.descriptionDisable=true;
      this.imagesDisable=true;
      this.postButton=false;
    }


 // ------------------------------------functions used by transliteration ------------------------
    onTransliteration(value,event,tag){
      var myEl=event.target
      this.currentInputTag=tag
      this.elementRefrence=event
      let post =this.getCaretPos(event)
      this.currentString=value
      let subValue=value.substring(0, post)
      let localValue=subValue.split(' ')
      let length=localValue.length
      let letstring=localValue[length-1]
      let replcedstring=letstring.match(/[a-zA-Z]+/g);
      let stringForSend
      if (replcedstring) {
        stringForSend=replcedstring[0]
      }
      if (!stringForSend) {
        return 
      }
      else if(stringForSend=='') {
        return 
      }
      else if (/^[a-zA-Z]+$/.test(stringForSend)) {
        this.sendString=stringForSend.toString()
        this.translationService.onGetSuggetiion(stringForSend)
        .subscribe(data => {     
          this.appProvider.current.suggestedString=data;
          this.suggestedDataForTransliteration=this.appProvider.current.suggestedString
          this.outputStringArrayLength=this.appProvider.current.suggestedString.length
          this.currentActiveIndex=-1;
          this.inputStringLength=this.sendString.length
        },error=>{       
        })
      }
    }

    selectString(state){
      this.currentString=this.currentString.toString()
      this.outputStringLength=state.length
      let replaceWith=state+' '
      let output=this.currentString.replace(this.sendString ,replaceWith)
      if ( this.currentInputTag=='title') {
        this.userContibutionModel.title=output
      }else if(this.currentInputTag=='description'){
        this.userContibutionModel.description=output
      }
      //this.addCategoryRequest.categoryName=output
      let sumIndex=(this.caretPos+this.outputStringLength)-this.inputStringLength
      this.appProvider.current.suggestedString=[]
    }

    onKeyUp(event){
      console.log(event.keyCode )
      if(event.keyCode==32){
        this.currentString=this.currentString.toString()
        if (this.appProvider.current.suggestedString.length>0) {
            if (this.currentActiveIndex==-1 || this.currentActiveIndex==0) {
             let replaceWith=this.appProvider.current.suggestedString[0]
             let output=this.currentString.replace(this.sendString ,replaceWith)
                 if ( this.currentInputTag=='title') {
                   this.userContibutionModel.title=output
                 }else if(this.currentInputTag=='description'){
                   this.userContibutionModel.description=output
                 }
              this.appProvider.current.suggestedString=[]
            }else{
             let replaceWith=this.appProvider.current.suggestedString[this.currentActiveIndex]
             let output=this.currentString.replace(this.sendString ,replaceWith)
             if ( this.currentInputTag=='title') {
                this.userContibutionModel.title=output
             }else if(this.currentInputTag=='desciprtion'){
               this.userContibutionModel.description=output
             }
            //this.addCategoryRequest.categoryName=output
             this.appProvider.current.suggestedString=[]
            }
        }
      }else if (this.selectedValue && event.keyCode==13) {
       this.currentString=this.currentString.toString()
       if (this.outputStringArrayLength>0) {
            let replaceWith=this.selectedValue+' '
            let output=this.currentString.replace(this.sendString ,replaceWith)
            if ( this.currentInputTag=='title') {
               this.userContibutionModel.title=output
             }else if(this.currentInputTag=='desciprtion'){
               this.userContibutionModel.description=output
             }
            //this.addCategoryRequest.categoryName=output
            this.appProvider.current.suggestedString=[]
        }
      }else if (event.keyCode==38) {
         if (this.currentActiveIndex==-1 || this.currentActiveIndex==0) {
           this.currentActiveIndex=this.outputStringArrayLength-1
         }else{
           this.currentActiveIndex=this.currentActiveIndex-1
         }
      }else if (event.keyCode==40) {
         if (this.currentActiveIndex==this.currentActiveIndex-1) {
           this.currentActiveIndex=0
         }else{
           this.currentActiveIndex=this.currentActiveIndex+1
         }
      }
    }

    onSuugestionkeyup(state){
      this.selectedValue=state
    }

    getCaretPos(oField) {
      if (oField.selectionStart || oField.selectionStart == '0') {
        this.caretPos = oField.selectionStart;
        return this.caretPos
      }
    }

    clearSuggstion(){
      this.appProvider.current.suggestedString=[]
    }
 // ------------------------------------functions used by transliteration end ------------------------


  // --------------used to fetch section data for selecting section,category,subcategory------------------
  fetchSectionData(){
    this.loading=true;
    this.fetchSectionsService.fetchSections().subscribe(data=>{
      if (data.success==true) {
       this.sectionData=data.FinalArray;
       this.loading=false;
      }
    },err=>{
      this.loading=false;
    })
  }

  // -------------used by close button----------------------
  onCloseButton(){
    this.router.navigate(['/Home'])
  }


}