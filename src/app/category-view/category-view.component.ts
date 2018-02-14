// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef,AfterViewInit,OnDestroy,ViewContainerRef,AfterViewChecked } from '@angular/core';
import { DOCUMENT, BrowserModule,DomSanitizer } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FetchSectionsService } from '../providers/fetch-sections.service';//to import service for fetching sections 
import { AllPostsService } from'../providers/allPost.service' ;//to import service for fetching allposts 
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';// to import enviroment file
import { AppProvider } from '../providers/app';// to import app provider
import { AnalyticsService } from '../providers/analytics.service';// to import analytics service
import { Observable } from 'rxjs/Observable';// to usethe fork join for hitting multiple services
import 'rxjs/add/observable/forkJoin';// imports fork join
import 'rxjs/add/operator/map';// dependency used by fork join
import { ToastsManager } from 'ng2-toastr/ng2-toastr';// used to display the toast
import { TranslationService } from '../providers/translation.service';// to use translation
import { OrderbyPipe } from '../pipes/orderby.pipe';// to order the sections by order no.
// ----------------importing statements for local libraries and plugins ends---------------------- 

// ---------------global variables-----------------------
declare var google;
declare var ga;
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.css'],
  providers:[AnalyticsService,FetchSectionsService,AllPostsService,TranslationService]
})

export class CategoryViewComponent implements OnInit ,AfterViewChecked{
  // ------------------local variables-----------------------
	  private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    sections;
    bgClasses;
    thumbnailUrl=environment.thumbnail;
    allPostData;
    loading=false;
    activeSessionTime;
    userInfo
    userid;
    sectionTemplate;
    isChanged=false;
    previousTemplate;
    callAgain;
    timeInterval;
    countForToast=0;
    showDropDownArrow:boolean=false;
    fixedBoxOffsetTop: number  = 0;
    showDiv:boolean=false;
    @ViewChild('fixedBox') fixedBox: ElementRef;

    constructor(vRef: ViewContainerRef,private translationService:TranslationService,public toastr: ToastsManager,private domSanitizer:DomSanitizer,private analyticsService: AnalyticsService,private appProvider:AppProvider,private router:Router,private allPostsService:AllPostsService,private fetchSectionService:FetchSectionsService,location: Location,  private element: ElementRef) {
      this.location = location;
      this.sidebarVisible = false;
      this.toastr.setRootViewContainerRef(vRef);
      if (localStorage['userInfo']) {
        this.userInfo=JSON.parse(localStorage['userInfo']);
        this.userid=this.userInfo._id;
      }else{
        this.userid=Date.now()
      }
    }

  	ngOnInit() {
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.fetchData();//invokes the fetchData()
      // this.onlineUser(); //invokes the onlineUser()
    }

    ngAfterViewChecked() {
      this.scrollFunction();//invokes the scrollFunction()
    }

    // -----------used to display the 5 sections-------------- 
    scrollFunction(){
      var ulHeight = $('.homepage-ulist').outerHeight();
      var liHeight = $('.homepage-ulist li').outerHeight();
      var sum = 0;
      var i = 1;
      if($('.homepage-ulist li').length > 5){
        $('.homepage-ulist li:lt(5)').each(function () {
          sum = sum + $(this).outerHeight();
        });
        liHeight = sum+20;
        $('.homepage-ulist').height(liHeight);
      }
    }

    swipr(swipe){
      $(swipe).closest('.homepage-listing').find('.homepage-ulist').toggleClass('active');
      $(swipe).find('.up-down').toggle();
    }

    getIndex(i){
      if (i==0) {
        this.scrollFunction();
      }
    }


    // ------------------used remove the sidebar-------------------
  	navRemove(){
  		if (localStorage['menuOpen']=='true') {
	  		const body = document.getElementsByTagName('body')[0];
	      this.toggleButton.classList.remove('toggled');
	      this.sidebarVisible = false;
	      body.classList.remove('nav-open');
  	  }
    }


  	@HostListener("window:scroll", [])
  	@HostListener("window:resize", [])

    // -----------------------used to change the view of section while scrolling--------------------
  	onWindowScroll() {
      const rect = this.fixedBox.nativeElement.getBoundingClientRect();
      var add_scroll = rect.height - 60;
    	if((rect.top) > (-add_scroll)){
        this.showDiv=false
  		}
  		else{
        this.showDiv=true
  		} 	
	  }

	  slideConfig = {"slidesToShow": 4, "slidesToScroll": 2, "draggable": false};

    // ------------------------to change the background colours if 'Section Template One' is selected ---------------------

    bgClass(i){
      if (i%5==0) {
        return "bg-yellow-g";
      }
      else if (i%5==1) {
        return "bg-red";
      }
      else if (i%5==2) {
        return "bg-pink";
      }
       else if (i%5==3) {
        return "bg-purple";
      }
       else if (i%5==4) {
        return "bg-green-g";
      }
    }

    // ------------------------------to change the color of articles view------------------------
    colorClass(i){
      if (i%5==0) {
        return "color-yellow";
      }
      else if (i%5==1) {
        return "color-red";
      }
      else if (i%5==2) {
        return "color-pink";
      }
       else if (i%5==3) {
        return "color-purple";
      }
       else if (i%5==4) {
        return "color-green";
      }
    }

    // ------------------------------------navigate to atricle-details(Story) page--------------------------
    onFeeds(articleData){
      this.analyticsService.trackArticleEvent(articleData);
      this.appProvider.current.articleDetails=articleData;
      this.appProvider.current.fromPageFlag="categoryViewPage"
      this.router.navigate(["/Story/"+articleData.slug],{skipLocationChange:false});
    }

    // ----------------------used to set the design will append the new class---------------------------------
    // getclass(i){
    //   if (i%6>2) {
    //     return 'new'
    //   }
    // }

    // ------------------------------------------------------fetches allpost and section data together------------------------
    fetchData(){
      this.loading=true
      Observable.forkJoin([this.fetchSectionService.fetchSections(), this.allPostsService.allPosts(this.userid)]).subscribe(results => {
        this.loading=false
        if (results[0].success==true) {
          this.sections=this.sortFunction(results[0].FinalArray);
          this.appProvider.current.sidebarMenuData=results[0].FinalArray;
          this.setSectionTemplate();
        }
        if (results[1].success==true) {
          this.appProvider.current.allArticles=results[1];
          this.allPostData=results[1].response.filter(f=>( f.publishStatus =="true" ||  f.publishStatus ==true) && f.deleteStatus !=true);
        } 
      },error=>{
        this.loading=false;
        this.toastr.error("something went wrong please try after some time","error")
      });
    }
 
    // --------------------used to set the template of section-------------------------------
    setSectionTemplate(){
      if (this.sections.length>0) {
        this.previousTemplate=this.sections[0].sectionViewFormat;
        if (this.sections[0].sectionViewFormat=="Section Template One") {
          this.sectionTemplate="Section Template One";
        }else{
          this.sectionTemplate="default Template";
           console.log(this.sectionTemplate)
        }
      }
    }

    // ----------------------navigates to section page (homepage)-------------------------------
    onSection(sectionData){
      console.log('on section');
      this.analyticsService.trackSectionEvent(sectionData);
      this.analyticsService.trackTemplateEvent(sectionData.sectionViewFormat)
      if (sectionData.section_categories.length==0) {
        this.showCustom();
      }else{
        this.router.navigate(['/section/'+sectionData._id],{skipLocationChange:false})
        console.log(JSON.stringify(sectionData));
        this.appProvider.current.sectionDetails=sectionData;
        this.appProvider.current.articleDetails=this.allPostData
      }  
    }
    
    // --------------------------toast to be displayed if categories not present under the section------------------------
    showCustom() {
      console.log("toast function")
      if (this.countForToast==0) {
        this.toastr.custom("<span style='color: red'>या विभागातील प्रकार नाही</span>", null, {enableHTML: true});
        this.countForToast=this.countForToast+1;
        setTimeout(()=>{
          this.countForToast=0
        },5000)
      }
    }

    // onlineUser(){
    //   this.analyticsService.onlineStatus(this.userid).subscribe(data=>{
    //     console.log('user Online');
    //   },err=>{
    //     console.log(err);
    //   })
    // }

    // ------------------ to sort the sections by order no.------------------- 
    sortFunction(array){
      array.sort((a: any, b: any) => {
        if (a.orderNo < b.orderNo) {
          return -1;
        } else if (a.orderNo > b.orderNo) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }

}
