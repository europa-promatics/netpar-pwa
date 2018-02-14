// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit, ElementRef,AfterViewInit,ViewChild ,ViewContainerRef} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
import { DomSanitizer } from '@angular/platform-browser';// used for making safe urls
import { AllPostsService } from '../providers/allPost.service' ;//imports the services to be used for media upload
import { ArticleLikeModel,ArticleCommentModel,SaveArticle } from './article-detail.model.component';//imports the payloads to sent
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA ,MatSnackBar,MatSnackBarVerticalPosition} from '@angular/material';//to create models
import { TranslateService } from '@ngx-translate/core';// for the translation of page
import { ValidationBoxesComponent } from '../alerts/validation-boxes/validation-boxes.component'// import the validation popup component
import { Router } from '@angular/router';//user for page navigation
import { TranslationService } from '../providers/translation.service';// used for transliteration
import { ToastsManager } from 'ng2-toastr/ng2-toastr';// used for transliteration
import 'rxjs/Rx';
import { DownloadPopupComponent } from '../alerts/download-popup/download-popup.component';// imports the download popup component
import { AnalyticsService } from '../providers/analytics.service'; // imports analytics services
import { FooterComponent } from '../components/footer/footer.component';//imports the footer component
import { Http ,Headers,RequestOptions,ResponseContentType,RequestMethod} from '@angular/http';// used for dowloading media 
import { saveAs } from "file-saver";// used for dowloading media
import { ActivatedRoute } from '@angular/router';// used to check which route is activated
// ----------------importing statements for local libraries and plugins----------------------


// ----------------global varialbes--------------------
declare var google;
declare var $:any;
declare var jQuery:any;


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  providers:[AnalyticsService,AllPostsService,TranslationService]
})
export class ArticleDetailsComponent implements OnInit,AfterViewInit {
   // --------------------local variables--------------------------
    @ViewChild( FooterComponent ) footerComponent:FooterComponent;

    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    articleLikeModel: ArticleLikeModel = new ArticleLikeModel ();
    articleCommentModel:ArticleCommentModel=new ArticleCommentModel();
    saveArticle:SaveArticle=new SaveArticle();
    count:number=1;
    articleData;
    aritcleContents;
    likeClass;
    finalText;
    showChar = 120;
    likeButtonClass;
    saveButtonClass;
    downloadButtonClass="inactive";
    callMeBackButtonClass="inactive";
    callButtonClass="inactive";
    shareButtonClass="inactive";
    applyButtonClass="inactive";
    interstedButtonClass="inactive";
    classForlikeButton="inactive";
    countsOnLikeButton;
    classForlikeButton1="inactive";
    countsOnLikeButton1;
    classForlikeButton2="inactive";
    countsOnLikeButton2;
    classForlikeButton3="inactive";
    countsOnLikeButton3;
    likeIcon;
    saveIcon;
    saveClass;
    downloadClass;
    downloadIcon="cusIco-donload-o";
    latestComment;
    continueClass="read-panel";
    continueButtonVisible=true;
    userData
    snackbarMessage;
    currentString:any;
    sendString:any;
    selectedValue:any;
    currentActiveIndex:number;
    outputStringArrayLength:number;
    caretPos
    elementRefrence:any;
    inputStringLength:number;
    outputStringLength:number;
    viewAllComment;
    guideTextImage=false;
    textFirstSpan:string='';
    textSecondSpan:string='';
    downloadedMedia=[];
    savedGuideText=false;
    downloadGuideText=false;
    userList;
    loading:boolean=false;
    userId;
    newComment;
    comments;
    commentBoxPlaceHolder;

    constructor(vRef: ViewContainerRef,private route: ActivatedRoute,private analyticsService:AnalyticsService,public toastr: ToastsManager,private translationService:TranslationService,private translateService:TranslateService,private snackBar: MatSnackBar,private http:Http,private router:Router,private dialog: MatDialog,private allPostsService:AllPostsService,private domSanitizer: DomSanitizer,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      this.location = location;
      this.sidebarVisible = false;
      this.toastr.setRootViewContainerRef(vRef);
       this.commentBoxPlaceHolder="तुमची प्रतिक्रिया नोंदवा..."
      if (localStorage['userInfo']) {
        this.userData=JSON.parse(localStorage['userInfo']);
        this.userId=this.userData._id;
      }else{
        this.userId=Date.now()
      }
    }

    // ---------------------------calculates the height for continue reading button-------------------------
    heightFunction(){
      var inner_height=0;
      var card_height = 0;
      $('.read-panel .inner-card').each(function() {
        inner_height = $(this).outerHeight();
        card_height = card_height + inner_height;
      })
      if(card_height > 536 ){
        $('.read-panel').css('height','536px');
      }
      else{
        $('.read-panel').css('height',card_height);
      }
    }

  	ngOnInit() {
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      const slug = this.route.snapshot.paramMap.get('slug')
      this.getArtilcleData(slug);//invokes the getArtilcleData() on the intialization of page
      this.continueClass="read-panel";
      this.continueButtonVisible=true;
  	}

    ngAfterViewInit(){
    
    }

    // --------------------adjusts the height of contiue redaing button------------------------
    _forContinueButton(){
      if (this.articleData.contentBody.length!=0){
        if (this.articleData.contentBody[0].tag=='text'){
          if (this.finalText.length>120) {
         
            this.getHeight();
          }else{
        
            this.heightFunction()
          }
        }else{
          
          this.heightFunction()
        }
      }else{
        this.continueButtonVisible=false;
      }
    }

    // ------------------------fetches the data of article by slug------------------------
    getArtilcleData(slug){
      this.loading=true;
      this.allPostsService.getPost(slug).subscribe(result=>{
        this.loading=false;
        console.log(result.response)
        if (result.response != null) {
          this.articleData=result.response[0];
          this.appProvider.current.articleDetails=result.response[0]
          this.appProvider.current.article_id=this.articleData._id;
          this.appProvider.current.slug=this.articleData.slug;
          this.appProvider.current.articleHeadline=this.articleData.headline;
          this.comments=this.articleData.user_comments.reverse();
          this.getComments();//invokes getComments()
          this.likeOrNot();//invokes likeOrNot()
          this.savedOrNot();//invokes savedOrNot()
          this.viewArticle();//invokes viewArticle()
          this.sectionSeprator();//invokes sectionSeprator()
          this.getAllMembers();//invokes getAllMembers()
        }
      })
    }

  
    // ---------------------------removes the side navbar----------------
  	navRemove(){
  		if (localStorage['menuOpen']=='true') {
	  		  const body = document.getElementsByTagName('body')[0];
	        this.toggleButton.classList.remove('toggled');
	        this.sidebarVisible = false;
	        body.classList.remove('nav-open');
  		}
  	}

    slideConfig = {"slidesToShow": 2, "slidesToScroll": 2, "arrows": false};

    // --------------------------for safe url--------------------
    getSafeContent(content) {
      let safeContent =this.domSanitizer.bypassSecurityTrustHtml(content)
      return safeContent;
    }

    getSafeContentt(content) {
      let safeContent =this.domSanitizer.bypassSecurityTrustHtml(content)
      return safeContent;
    }

     getTypeFile(url){
      if (url.indexOf('<iframe')==-1) {
        return true
      }else{
        return false
      }
    }

    // -----------------------check whether article already liked or not---------------
    likeOrNot(){
      if (this.articleData.usersLiked.indexOf(this.userId)==-1) {
        this.likeIcon='cusIco-okay-o';
        this.likeClass="";
        this.likeButtonClass="inactive";
      }else{
        this.likeIcon='cusIco-okay';
        this.likeClass="active";
        this.likeButtonClass=""
      }
    }

    // -----------------------check whether article already saved or not---------------


    savedOrNot(){
      if (this.articleData.usersSaved.indexOf(this.userId)==-1) {
        this.saveIcon="cusIco-badge-o";
        this.saveClass="";
        this.saveButtonClass="inactive"
      }else{
        this.saveIcon='cusIco-badge';
        this.saveClass="active"
        this.saveButtonClass=""
      }
    }

     // -----------------------for liking the article---------------

    onLike(){
      if (localStorage['userInfo']) {
        this.loading=true;
        this.articleLikeModel.articleId=this.articleData._id;
        this.articleLikeModel.articleName=this.articleData.headline;
        this.articleLikeModel.userId=this.userData._id;
        this.articleLikeModel.userPhone=this.userData.mobileNumber;
        this.allPostsService.likePost(this.articleLikeModel).subscribe(data=>{
          this.loading=false;
          if (data.success==true && data.msg=="Post liked successfully!") {
             this.likeIcon='cusIco-okay';
             this.likeClass="active";
             this.likeButtonClass="";
             this.articleData.likeCount = this.articleData.likeCount+1;
             this.analyticsService.trackLikeEvents(this.articleData);  
          }
          if (data.success==false) { 
            this.likeIcon='cusIco-okay-o';
            this.likeClass=""
            this.likeButtonClass="inactive"
            this.articleData.likeCount=this.articleData.likeCount-1
          }
        },err=>{
          this.loading=false;
          this.toastr.error("something went wrong please try after sometime","error")
        })
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
    }

    // ---------------to get the latest comment----------------
    getComments(){
      if (this.articleData.user_comments) {
        this.latestComment = this.articleData.user_comments[0];
      }
    }
    
    // --------------------navigates to comment box--------------------------
    onCommentIcon(){
      document.getElementById("mycomment").focus();
    }

    // ---------------------post the comment on the artcle works on post comment------------------------
    onComment(){
      if (localStorage['userInfo']) {
        if (!this.articleCommentModel.userComment) {
          return
        }
        else{
          this.loading=true;
          this.articleCommentModel.userId=this.userData._id;
          this.articleCommentModel.articleName=this.articleData.headline;
          this.articleCommentModel.articleId=this.articleData._id;
          this.articleCommentModel.userPhone=this.userData.mobileNumber;
          this.articleCommentModel.userName=this.userData.firstName+" "+this.userData.lastName;
          this.articleCommentModel.sectionName=this.articleData.sectionName;
          this.articleCommentModel.categoryName=this.articleData.categoryName;
          this.articleCommentModel.subCategoryName=this.articleData.subCategoryName;
          this.articleCommentModel.language=localStorage['selectedLanguage'];
          this.allPostsService.commentPost(this.articleCommentModel).subscribe(data=>{
            this.loading=false;
            if (data) {
              this.analyticsService.trackCommentEvent(this.articleData);
              this.articleCommentModel.userComment="";
              this.latestComment=data.response;
              this.newComment=data.response;
              this.articleData.commentCount=this.articleData.commentCount+1;
            }
          },err=>{
            this.toastr.error("something went wrong please try after sometime","error")
          })
        }
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
    }

    // ---------------------------saves the article-------------------------------
    onSavePost(){
      if(localStorage['userInfo']){
        this.saveArticle.user_id=this.userData._id;
        this.saveArticle.content_name=this.articleData.headline;
        this.saveArticle.content_id=this.articleData._id;
        this.allPostsService.savePost(this.saveArticle).subscribe(data=>{
          if (data.success==true) {
            this.guideTextImage=true;
            this.savedGuideText=true;
            this.downloadGuideText=false;
            this.saveIcon="cusIco-badge";
            this.saveClass="active";
            this.saveButtonClass=""
            this.articleData.saveCount=this.articleData.saveCount+1;
            this.analyticsService.trackSaveEvent(this.articleData);
            this.snackbarMessage=this.translateService.instant('ContentItemSaved.saved');
            let verticalPosition: MatSnackBarVerticalPosition
            this.openSnackBar(this.snackbarMessage,'',verticalPosition)
          }if (data.success==false) {
            this.saveIcon='cusIco-badge-o';
            this.saveClass="";
            this.saveButtonClass="inactive"
            this.articleData.saveCount=this.articleData.saveCount-1;
          }
        },err=>{
          this.toastr.error("something went wrong please try after sometime","error")
        })
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
    }


    // ------------------------------opens the validation popup---------------------

    openValidationAlert(msg){
        let dialogRef = this.dialog.open(ValidationBoxesComponent, {
            width: '260px',
            data:{ message:msg}
        });
        dialogRef.afterClosed().subscribe(result => {
          document.getElementById("mycomment").focus();
        });
    }

 
    // ----------------------sanitizes the url----------------------------
    getSafeUrl(url){
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

    // -------------------------displays full aricle------------------------
    onContinueReading(){
      $('.read-panel').css('height','auto');
      this.allPostsService.continueReading(this.articleData._id).subscribe(data=>{
      },error=>{
      })
      this.continueButtonVisible=false
    }

    // ---------------------------opens the snackBar to display the message----------------
    openSnackBar(message: string, action: string,config) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }

    // ----------------------------------used in transliteration of comment----------------------------

    onTransliteration(value,event){
       var myEl=event.target
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
                this.appProvider.current.suggestedString=data
                this.outputStringArrayLength=this.appProvider.current.suggestedString.length
                this.currentActiveIndex=-1;
                this.inputStringLength=this.sendString.length
               },error=>{        
        })
       }
    }

    getCaretPos(oField) {
      if (oField.selectionStart || oField.selectionStart == '0') {
         this.caretPos = oField.selectionStart;
         return this.caretPos
      }
    }

    clearSuggstion(){
      this.commentBoxPlaceHolder="";
      this.appProvider.current.suggestedString=[]
    }

    onKeyUp(event){
      // console.log(event.keyCode )
      if(event.keyCode==32){
        this.currentString=this.currentString.toString()
        if (this.appProvider.current.suggestedString.length>0) {
            if (this.currentActiveIndex==-1 || this.currentActiveIndex==0) {
             let replaceWith=this.appProvider.current.suggestedString[0]
             let output=this.currentString.replace(this.sendString ,replaceWith)
            this.articleCommentModel.userComment=output
            this.appProvider.current.suggestedString=[]
            }else{
             let replaceWith=this.appProvider.current.suggestedString[this.currentActiveIndex]
             let output=this.currentString.replace(this.sendString ,replaceWith)
             this.articleCommentModel.userComment=output
             this.appProvider.current.suggestedString=[]
            }
        }
      }else if (this.selectedValue && event.keyCode==13) {
       this.currentString=this.currentString.toString()
       if (this.outputStringArrayLength>0) {
            let replaceWith=this.selectedValue+' '
            let output=this.currentString.replace(this.sendString ,replaceWith)
            this.articleCommentModel.userComment=output
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

    onSuugestionkeyup(suggestion){
      this.selectedValue=suggestion
    }

    selectString(suggestion){
      this.currentString=this.currentString.toString()
      this.outputStringLength=suggestion.length
      let replaceWith=suggestion+' '
      let output=this.currentString.replace(this.sendString ,replaceWith)
      this.articleCommentModel.userComment=output
      let sumIndex=(this.caretPos+this.outputStringLength)-this.inputStringLength;
      this.appProvider.current.suggestedString=[];
    }

     // ----------------------------------used in transliteration of comment end----------------------------


     // ----------------------------to show the toast if comments not available----------------------------
    showCustom() {
      this.toastr.custom('<span style="color: red">दर्शविण्यासाठी आणखी टिप्पण्या नाहीत</span>', null, {enableHTML: true});
    }

    // ----------------------display all comments---------------------

    onViewMoreComments(){
       this.viewAllComment=true;
    }

    //--------------------------------increase the number of views----------------------- 
   viewArticle(){
     if (this.userId) {
       this.allPostsService.viewPost(this.articleData._id,this.userId,this.articleData.sectionId,this.articleData.categoryId).subscribe(response=>{
       },error=>{
       })
     }else{
       let userID= Date.now();
        this.allPostsService.viewPost(this.articleData._id,userID,this.articleData.sectionId,this.articleData.categoryId).subscribe(response=>{
       },error=>{
       })
     }
   }

   // -----------------------------displays the suggested articles---------------------------
    onSuggestedArticle(suggestedArticle){
     console.log(suggestedArticle)
     scrollTo(0,0)
     this.router.navigate(['/Story/'+suggestedArticle.slug]);
     this.getArtilcleData(suggestedArticle.slug);
     this.continueClass="read-panel";
     this.continueButtonVisible=true;
    }

    // -------------------------------closes the guide text image--------------------
    onGuideTextImage(){
     this.guideTextImage=false;
    }


    // ------------------------------------to dowload the media  from the article --------------
   download(url,type) {
    let typeOfmedia
    let filenameMedia=url.split('/')
    let length=filenameMedia.length
    if (type=='image') {
        typeOfmedia='image/*'
    }else if (type=='audio') {
        typeOfmedia='audio/*'
    }else if (type=='video') {
         typeOfmedia='video/*'
    }else{
         typeOfmedia='application/*'
    }
    let a={
      mediaUrl:url
    }
        this.http.post("https://www.netpar.in/netpar/downloadFile", a, {
            method: RequestMethod.Post,
            responseType: ResponseContentType.Blob,
            headers: new Headers({'Content-type': 'application/json'})
        }).subscribe(
            (response) => {
                // this.downloaded();
                if (localStorage['downloadMedia'] && type=='image') {
                  this.downloadedMedia=JSON.parse(localStorage['downloadMedia'])
                }
                 
                this.downloadedMedia.push({url:a})
                localStorage['downloadMedia']=JSON.stringify(this.downloadedMedia);
                var blob = new Blob([response.blob()], {type: typeOfmedia});
                var filename = filenameMedia[length-1];
                saveAs(blob, filename);
        }
    );
  }

   onDownload(url,type){
      this.analyticsService.trackDownloadEvent(this.articleData);
      if (type=='document') {
        this.download(url,'document');
      }else if (type=='image') {
        this.download(url,'image');
      }
    }  

    onTagDownloadButton(){
       for (var i = 0; i < this.articleData.contentBody.length; ++i) {
        if (this.articleData.contentBody[i].tag=='image' && this.articleData.contentBody[i].downloadable==true) {
          var url = this.articleData.contentBody[i].url;
          this.download(url,'image')
        }
        if(this.articleData.contentBody[i].tag=='audio' && this.articleData.contentBody[i].downloadable==true){
           var url = this.articleData.contentBody[i].url;
            this.download(url,'audio')
        } 
        if (this.articleData.contentBody[i]=='video' && this.articleData.contentBody[i].downloadable==true) {
           var url = this.articleData.contentBody[i].url;
            this.download(url,'video')
         }
         if (this.articleData.contentBody[i]=='document' && this.articleData.contentBody[i].downloadable==true) {
            var url = this.articleData.contentBody[i].url;
            this.download(url,'document')
         }  
         if (this.articleData.contentBody[i].tag=='grid' && this.articleData.contentBody[i].downloadable==true) {
           if (this.articleData.contentBody[i].imgurl2!=null) {
             var url = this.articleData.contentBody[i].imgurl2;
           }
           if (this.articleData.contentBody[i].imgurl1!=null) {
             var url = this.articleData.contentBody[i].imgurl1;
           }
           if (this.articleData.contentBody[i].imgurl3!=null) {
             var url = this.articleData.contentBody[i].imgurl3;
           }
          
          this.download(url,'image')
        }
      }
    }

    // ------------------------------------to dowload the media  from the article  ends--------------

    // ---------------------works if the user logins for the first time---------------
    forFirstTimeUser(){
      if(localStorage['userArticalView']==0){
        let userArticleView=localStorage['userArticalView'];
        let b=userArticleView+1;
        localStorage['userArticalView']=b;
        this.openDownloadPopup();
      }
    }

    // ----------opens the download popup-----------------------
    openDownloadPopup(){
      let dialogRef = this.dialog.open(DownloadPopupComponent, {
            width: '260px',
            disableClose :true
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result=="navigateToPlayStore"){
            window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");  
          }
        });
    }

    // ----------used for the adjustment of continue reading button -----------------------
    sectionSeprator(){
      if (this.articleData.contentBody.length!=0) {
          if (this.articleData.contentBody[0].tag=='text'){
            var ellipsestext = "...";
            let text = this.articleData.contentBody[0].text
            this.finalText=text.split(' ');
            if(this.finalText.length > this.showChar) {
              for (var i = 0; i <120; i++) {
                this.textFirstSpan=this.textFirstSpan+this.finalText[i]+' '
              }
              for (var i = 120; i <this.finalText.length; i++) {
                this.textSecondSpan=this.textSecondSpan+this.finalText[i]+' '
              }
            }else{
              this.textFirstSpan=this.articleData.contentBody[0].text;
                this.textSecondSpan="";
              $('.read-panel').css('height','400px');
            }
          }else{
            $('.read-panel').css('height','50px');
          }
      }else{
        this.continueButtonVisible=false
      }
    }

    getHeight(){
      var upper_box = $('.upper-box').outerHeight();
      var wrap_text = $('.wrap-text').outerHeight();
      // console.log(upper_box);
      var combine_height = upper_box + wrap_text;
      // console.log(combine_height);
      $('.read-panel').css('height',combine_height);
    }

      // ----------used for the adjustment of continue reading button end-----------------------


    // -------------------call to action buttons functionality on call button--------------------
    onCall(){
      if (localStorage['userInfo']) {
        // code...
        this.analyticsService.trackCallEvent(this.articleData);
        this.allPostsService.call(this.userData._id,this.articleData._id).subscribe(data=>{
          // console.log(data);
          this.callButtonClass="";
         this.snackbarMessage=this.translateService.instant('toasterMsgs.call');
            let verticalPosition: MatSnackBarVerticalPosition
            this.openSnackBar(this.snackbarMessage,'',verticalPosition);
        },err=>{
          // console.log(err);
        })
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
    }

    // -------------------call to action buttons functionality on callmeback button--------------------

    onCallMeBack(){
      if (localStorage['userInfo']) {
        this.analyticsService.trackCallMeBackEvent(this.articleData);
        this.allPostsService.callmeback(this.userData._id,this.articleData._id).subscribe(data=>{
            // console.log(data);
            this.callMeBackButtonClass="";
            this.snackbarMessage=this.translateService.instant('toasterMsgs.callMeBack');
            let verticalPosition: MatSnackBarVerticalPosition
            this.openSnackBar(this.snackbarMessage,'',verticalPosition);
        },err=>{
          // console.log(err);
        })
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
    }

    // -------------------call to action buttons functionality on apply button--------------------


    onApply(){
      if (localStorage['userInfo']) {
        this.analyticsService.trackApplyEvent(this.articleData);
        this.allPostsService.apply(this.userData._id,this.articleData._id).subscribe(data=>{
          // console.log(data);
          this.applyButtonClass="";
         this.snackbarMessage=this.translateService.instant('toasterMsgs.apply');
            let verticalPosition: MatSnackBarVerticalPosition
            this.openSnackBar(this.snackbarMessage,'',verticalPosition);
        },err=>{
          // console.log(err);
        })
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
    }

    // -------------------call to action buttons functionality on interested button--------------------
    onIntersted(){
      if (localStorage['userInfo']) {
        this.analyticsService.trackInterestedEvent(this.articleData);
        this.allPostsService.interested(this.userData._id,this.articleData._id).subscribe(data=>{
          this.interstedButtonClass="";
          this.snackbarMessage=this.translateService.instant('toasterMsgs.intersted');
            let verticalPosition: MatSnackBarVerticalPosition
            this.openSnackBar(this.snackbarMessage,'',verticalPosition);
        },err=>{
        })
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
    }

    onDWnldButton(){
      window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");
    }

    // ------------------------------to like the particular section--------------------------------
    onLikeButtonInContentBody(tag,orderNo,position,index){
      if (localStorage['userInfo']) {
        let data={
          contentId:this.articleData._id,
          tag:tag,
          orderNo:orderNo,
          postion:position
        }
        this.allPostsService.likeParticularSection(data).subscribe(data=>{
          // console.log(data)
          if (data.success==true){
            if (tag=='like') {
              this.classForlikeButton="";
              this.countsOnLikeButton=this.articleData.contentBody[index].count+1;
            }
            if (tag=="userEngBtn" && position=="count1") {
              this.classForlikeButton1="";
              // this.countsOnLikeButton1=data.latest_count;
               this.countsOnLikeButton1=this.articleData.contentBody[index].count1+1;
            }else if (tag=="userEngBtn" && position=="count2") {
              this.classForlikeButton2="";
              this.countsOnLikeButton2=this.articleData.contentBody[index].count2+1;
              // this.articleData.contentBody[index].count2=this.articleData.contentBody[index].count2+1

            }else if (tag=="userEngBtn" && position=="count3") {
              this.classForlikeButton3="";
              this.countsOnLikeButton3=this.articleData.contentBody[index].count3+1;
              // this.articleData.contentBody[index].count3=this.articleData.contentBody[index].count3+1
            }
            this.analyticsService.trackLikeEvents(this.articleData); 
          }
        },err=>{
          // console.log(err)
        })
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
    }


    // ---------------------------on share button in content body----------------------------
    onShare(){
      // console.log("share function");
      this.footerComponent.testFunction();
    }

    // --------------------------------to fetch the list of all members-------------------------
    getAllMembers(){
      this.allPostsService.getAllMembers().subscribe(data=>{
        this.userList=data.data;
        // console.log(this.userList)
      },err=>{
        // console.log(err);
      })
    }

    // ------------------------to display the image for the user on comments------------------

    getImage(userId){
      // console.log(userId);
      if (this.userList) {
        let user_data=this.userList;
         user_data= user_data.filter(f=>f._id==userId);
         // console.log(user_data);
         if (user_data.length>0) {
               return user_data[0].userImage;
           // code...
         }else{
           return null
         }
      }
    }

    // ----------------------to change the date format----------------------
    getDate(dateOfCreation){
      let data= dateOfCreation.split('-');
      // alert(data);
      let date=data[2];
      let year=data[0];
      let Month
      switch(data[1]){
          case "01":
            Month='JAN'
          break;
          case "02":
            Month='FEB'
          break;
          case "03":
            Month='MAR'
          break;
          case "04":
            Month='APR'
          break;
          case "05":
            Month='MAY'
          break;
          case "06":
            Month='JUN'
          break;
          case "07":
            Month='JUL'
          break;
          case "08":
            Month='AUG'
          break;
          case "09":
            Month='SEP'
          break;
          case "10":
            Month='OCT'
          break;
          case "11":
            Month='NOV'
          break;
          case "12":
            Month='DEC'
          break;
          default:
            break;
      }

      return date+"-"+ Month +'-'+ year
    }

    getDateForComment(dateOfComment){
      let comment_date=dateOfComment.split('T')[0];
      let data= comment_date.split('-');
      // alert(data);
      let date=data[2];
      let year=data[0];
      let Month
      switch(data[1]){
          case "01":
            Month='JAN'
          break;
          case "02":
            Month='FEB'
          break;
          case "03":
            Month='MAR'
          break;
          case "04":
            Month='APR'
          break;
          case "05":
            Month='MAY'
          break;
          case "06":
            Month='JUN'
          break;
          case "07":
            Month='JUL'
          break;
          case "08":
            Month='AUG'
          break;
          case "09":
            Month='SEP'
          break;
          case "10":
            Month='OCT'
          break;
          case "11":
            Month='NOV'
          break;
          case "12":
            Month='DEC'
          break;
          default:
            break;
      }
      return date+"-"+ Month +'-'+ year
    }


    // _notUserLogin(){
    //   this.router.navigate(['/welcome-screen2'])
    // }

}
