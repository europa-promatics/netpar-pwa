// ----------------importing statements for local libraries and plugins ----------------------

import { Component, OnInit, ElementRef,ViewChild,AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AllPostsService } from '../providers/allPost.service';
import { AppProvider } from '../providers/app';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UpdateprofileService } from './updateprofile.service';
import { UpdateProfileModel,UpdateMobileModel } from './updateprofile.model.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupComponent } from '../alerts/popup/popup.component';
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component';
import { ScrollToService,ScrollToConfigOptions} from '@nicky-lenaers/ngx-scroll-to';
import { AnalyticsService } from '../providers/analytics.service'
// ----------------importing statements for local libraries and plugins end----------------------


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers:[AllPostsService,UpdateprofileService,AnalyticsService]
})
export class MyProfileComponent implements OnInit,AfterViewInit {
  // ---------------local variables---------------------
   @ViewChild('target') target: ElementRef;
   	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    userId;
    savedPosts;
    userInfo;
    base64textString;
    editMobileNumber=false;
    editgender=false;
    editAddress=false;
    editDob=false;
    days;
    months;
    years;
    dateValue;
    totalYears=100;
    profilePicture;
    updateProfileModel: UpdateProfileModel = new UpdateProfileModel ();
    updateMobileModel:UpdateMobileModel=new UpdateMobileModel ();
    mm;
    month;
    dd;
    yy;
    errorMessage;
    myContributions;
    validationErrorMessage;
    stateData;
    districtData;
    blockData;
    downloadedMedia;
    destination;
    imageAvailable;
    loading;
  // ---------------local variables end---------------------

  // -----------------intializes the user info if not present navigates to start screen-------------------
    constructor(private analyticsService:AnalyticsService,private scrollToService:ScrollToService,private dialog: MatDialog,private updateprofileService:UpdateprofileService,private domSanitizer:DomSanitizer,private router:Router,private appProvider:AppProvider,private allPostsService:AllPostsService,location: Location,  private element: ElementRef) {
      if (localStorage['userInfo']) {
        this.userInfo=JSON.parse(localStorage['userInfo'])
        this.userId=this.userInfo._id;
      	this.location = location;
        this.sidebarVisible = false;
        this.getSavedPost();
        this.updateProfileModel.state=this.userInfo.stateRegional
        this.updateProfileModel.district=this.userInfo.districtRegional
        this.updateProfileModel.dateOfBirth=this.userInfo.dateOfBirth
        this.updateProfileModel.gender=this.userInfo.gender
        this.updateProfileModel.block=this.userInfo.blockRegional;
        if (this.appProvider.current.cropedImage) {
          // code...
          this.imageAvailable=this.appProvider.current.cropedImage
        }
        this.updateMobileModel.mobileNumberNew=localStorage['mobileNumber'];
      }else{
        this.router.navigate(['/welcome-screen2'])
      }

      if (localStorage['downloadMedia']) {
        this.downloadedMedia=JSON.parse(localStorage['downloadMedia']);
        console.log(this.downloadedMedia);
      }

      if(localStorage['profileImage']){
        this.profilePicture=localStorage['profileImage'];
      }else{
         this.profilePicture="./assets/img/noImage1.jpg"
      }

    }

    // -------------------initializes on the load of page-----------------
  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.uploadImage();//invokes uploadImage()
      this.savedContributions();//invokes savedContributions()
      this.getDays();//invokes getDays()
      this.getMonths();//invokes getMonths()
      this.getYears();//invokes getYears()
      this.getStateData();//invokes getStateData()

  	}

    // -----------------intializes after the html loads--------------------
    ngAfterViewInit(){
      if (this.appProvider.current.landingArea=="friends") {
        console.log("landingArea")
        this.scrolling()
        this.appProvider.current.landingArea="";
      }else if(this.appProvider.current.landingArea=="downloadSection"){
        console.log("landingArea")
        this.scrollToDownload();
        this.appProvider.current.landingArea="";
      }
      // this.scrollToDownload()
    }

    // -------------------------removes the navbar------------------------
  	navRemove(){
  		/*alert('home')*/
  		if (localStorage['menuOpen']=='true') {
	  		const body = document.getElementsByTagName('body')[0];
	        this.toggleButton.classList.remove('toggled');
	        this.sidebarVisible = false;
	        body.classList.remove('nav-open');
  			//localStorage['menuOpen']=='false'
  		}
  	}

    // ---------------------------fetches saved articles-----------------------

    getSavedPost(){
      this.allPostsService.getSavedPosts(this.userId).subscribe(data=>{
        if (data.success==true) {
          this.savedPosts=data.saved_articles;
        }
      },err=>{

      })
    }

    // ---------------------------sets the colour for styling-----------------------

    colorClass(i){
      if (i%7==0) {
        return "color-red";
      }
      else if (i%7==1) {
        return "color-orange";
      }
      else if (i%7==2) {
        return "color-yellow";
      }
       else if (i%7==3) {
        return "color-blue";
      }
       else if (i%7==4) {
        return "color-green";
      }
       else if (i%7==5) {
        return "color-purple";
      }
       else if (i%7==6) {
        return "color-pink";
      }
    }

  // ----------------------navigates to the atricle details page (story)-----------------------
  onSaved(articleData){
    this.appProvider.current.articleDetails=articleData;
    this.router.navigate(["/Story/"+articleData.slug],{skipLocationChange:false});
  }

  // ----------------------on select image-------------------------
  selectImage(evt){
      if (!evt.target) {
            return;
        }
        if (!evt.target.files) {
            return;
        }
        if (evt.target.files.length !== 1) {
            return;
        }
        const file = evt.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
            return;
        }
        const fr = new FileReader();
        fr.onloadend = (loadEvent) => {
            this.appProvider.current.profilImagePath = fr.result;
             this.router.navigate(['/crop-image'],{skipLocationChange:false})
        };
        fr.readAsDataURL(file);
  }


  // -------------------uploads the profile image-------------------------
  imageUploadForGridOneIndexEvent(evt: any,) {
      if (!evt.target) {
          return;
      }
      if (!evt.target.files) {
          return;
      }
      if (evt.target.files.length !== 1) {
          return;
      }
      const file = evt.target.files[0];
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
          return;
      }
      const fr = new FileReader();
      fr.onloadend = (loadEvent) => {
        this.appProvider.current.profilImagePath = fr.result;
      };
      fr.readAsDataURL(file);
   }

  // -------------------uploads the profile image-------------------------
   
   uploadImage(){
     if (this.appProvider.current.cropedImage) {
       this.loading=true;
        this.updateprofileService.updateProfilePicture(this.appProvider.current.cropedImage,this.userId).subscribe(response=>{
           console.log(response);
           this.loading=false;
           if (response.success==true) {
             localStorage['profileImage']=response.url;
             this.profilePicture=localStorage['profileImage']
             this.appProvider.current.cropedImage="";
           }
        },err=>{
          this.loading=false;
        })
     }
   }

   // ----------------------------on editing  user details---------------------
   edit(field){
     console.log(field)
     if (field=='mobileNumber') {
        this.editMobileNumber=true;
        this.editgender=false
        this.editAddress=false
        this.editDob=false
     }
     if (field=='gender') {
       this.editgender=true
       this.editMobileNumber=false;
       this.editAddress=false
        this.editDob=false
     }
     if (field=='address') {
        this.editAddress=true
        this.editMobileNumber=false;
        this.editgender=false
        this.editDob=false

     }
     if (field=='dob') {
        this.editDob=true
        this.editAddress=false
        this.editMobileNumber=false;
        this.editgender=false
     }
   }

   // ----------------------------on editing  user details---------------------

   onSend(field){
       if (field=='mobileNumber'){
        this.editMobileNumber=false;
        this.verifyMobile();
       }
      if (field=='gender'){
         this.editgender=false;
         this.updateProfile();
      }
      if (field=='address'){
        this.editAddress=false
          this.updateProfile();
      }
      if (field=='dob'){
        switch (this.mm) {
            case "Dec":
              this.month='12'
            break;
            case "Nov":
              this.month='11'
            break;
            case "Oct":
              this.month='10'
            break;
            case "Sep":
              this.month='09'
            break;
            case "Aug":
              this.month='08'
            break;
            case "Jul":
              this.month='07'
            break;
            case "Jun":
              this.month='06'
            break;
            case "May":
              this.month='05'
            break;
            case "Apr":
              this.month='04'
            break;
            case "Mar":
              this.month='03'
            break;
            case "Feb":
              this.month='02'
            break;
            case "Jan":
              this.month='01'
            break;
            default:
              break;
          }
        if (!this.dd || !this.mm || !this.yy) {
          this.updateProfileModel.dateOfBirth=this.userInfo.dateOfBirth
        }else{
          this.updateProfileModel.dateOfBirth=this.dd+"-"+this.month+"-"+this.yy;
        }

        this.editDob=false
        this.updateProfile();
      }
   }

    // ----------------------------calender------------------
    getDays(){
        this.days = [];
        for(var i=1;i<=31;i++){
              if(i<=9){
                this.dateValue = '0' + i;
              } else {
                 this.dateValue = i;
              }
              this.days.push({value:this.dateValue});
        }
        // alert (JSON.stringify(this.days));
        return this.days;
    }

    getMonths(){
      var monthNames = ["Jan", "Feb", "Mar" , "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.months = [];
      for(var i=1;i<=12;i++){
        this.months.push({name: monthNames[i - 1]});
      }
        // alert(JSON.stringify(this.months))
        return this.months;
    }


    getYears(){
      var currentYear = new Date().getFullYear();
      this.years=[];
      for (var i = currentYear; i > currentYear - this.totalYears; i--) {
          this.years.push({year: [i - 1]});
      }
      return this.years;
    }

    // ----------------invokes on updating profile-------------------
    updateProfile(){
      this.updateprofileService.updateProfile(this.updateProfileModel,this.userId).subscribe(response=>{
        console.log(response);
        this.userInfo.blockRegional=this.updateProfileModel.blockRegional
        this.userInfo.districtRegional=this.updateProfileModel.districtRegional
        this.userInfo.stateRegional=this.updateProfileModel.stateRegional
        localStorage['userInfo']=JSON.stringify(response.info);
        this.ngOnInit();
      },error=>{
        console.log(error);
      })
    }

    // -------------------invokes on update mobile number-------------------
    updateMobileNumber(){
      this.updateMobileModel.mobileNumber=localStorage['mobileNumber']
      this.updateprofileService.updateMobileNumber(this.updateMobileModel).subscribe(data=>{
        console.log(data);
        localStorage['mobileNumber']=this.updateMobileModel.mobileNumberNew;
      },error=>{
        console.log(error);
      })
    }

    // --------------------------verify's the mobile number--------------
    verifyMobile(){
      if(this.updateMobileModel.mobileNumberNew.length<10){
         this.validationErrorMessage="incorrect mobile number";
          this.openValidationAlert(this.validationErrorMessage);
          this.updateMobileModel.mobileNumberNew=localStorage['mobileNumber'];
        return
      }else{
        this.updateprofileService.VerifyMobile(this.updateMobileModel.mobileNumberNew).subscribe(data=>{
          if (data.msg=="This mobile number already exists in database!!"){
            this.errorMessage="user already registered";
            this.openDialog(this.errorMessage);
            this.updateMobileModel.mobileNumberNew=localStorage['mobileNumber'];
          }else{
            this.updateMobileNumber();
          }
        },error=>{
          console.log(error);
        })
      }
    }

    // ----------------opens the PopupComponent--------------------------------------
    openDialog(msg): void {
      let dialogRef = this.dialog.open(PopupComponent, {
          width: '240px',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        }
      });
    }

    // ----------------fetches the contributions--------------------------------------

    savedContributions(){
      this.allPostsService.savedContributions(this.userId).subscribe(data=>{
        console.log(data);
        this.myContributions=data.data;
      },error=>{
        console.log(error);
      })
    }

    // --------------------open the validation alerts if details missing-------------------
   openValidationAlert(msg){
      let dialogRef = this.dialog.open(ValidationBoxesComponent, {
          width: '260px',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }

    onDownloadApp(){
      console.log('hi')
      window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");
    }

    // --------------------get state data----------------------
    getStateData(){
      this.allPostsService.getJSON().subscribe(data=>{
         this.stateData=data
      },error=>{
        console.log(error);
      })
    }

    // ----------------invokes on selecting state------------------
    onState(stateData){
      this.updateProfileModel.state=stateData.name;
      this.districtData=stateData.dist;
    }

    // --------------- invokes on selecting district--------------------
    onDistrict(district){
      this.updateProfileModel.district=district.name;
      this.blockData=district.block;
    }

    // --------------- invokes on selecting block--------------------
  
    onBlock(block){
      this.updateProfileModel.block=block.name
    }

    // --------------invokes on remove button on downloaded media--------------------

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

    // --------------------used to scroll to specific area while page intialization---------------
    scrolling() {
     console.log("scrolling test")
     const config: ScrollToConfigOptions = {
        target: 'destination'
      };
      this.scrollToService.scrollTo(config).subscribe(
        value => { console.log(value) },
        err => console.log(err) // Error is caught and logged instead of thrown
      );
    }

    // ----------------------------used to scroll through the dowloaded media section---------------------- 
    scrollToDownload(){
      const config:ScrollToConfigOptions={
        target:'downloaded'
      };
      this.scrollToService.scrollTo(config).subscribe(
        value=>{
          console.log(value);
        },err=>{
          console.log(err);
        }
      )
    }

    // ---------------------invokes on onview more button--------------------------------
    onViewMoreDownloads(){
      this.router.navigate(['/downloads'])
    }    

    // -----------------------invokes on the click of downloaded image----------------
    onImage(url){
      this.appProvider.current.viewImage=url;
      this.router.navigate(['/downloaded-image'])
    }

    // -----------------------for setting the template----------------
    getImageCLass(i){
      if (i<2) {
        return 'mat-2'
      }else{
        return 'mat-3'
      }
    }
    // --------------------invokes on remove button of profile image---------------

    onDeleteProfileImage(){
      if (this.profilePicture=="./assets/img/noImage1.jpg") {
       return;
      }else{
        let dialogRef = this.dialog.open(PopupComponent, {
            width: '260px',
            data:{ message:"Are you sure you want to remove profile picture"}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result=="yes") {
            this.loading=true;
            this.allPostsService.deleteImage(this.userId).subscribe(data=>{
                this.loading=false;
                localStorage['profileImage']="./assets/img/noImage1.jpg"
                this.profilePicture=localStorage['profileImage']
                this.imageAvailable=localStorage['profileImage']
                this.appProvider.current.cropedImage="";
            },err=>{
              this.loading=false;
              console.log(err);
            })
          }
        });
      }
    }

}
