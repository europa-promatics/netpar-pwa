// ----------------importing statements for local libraries and plugins ----------------------
import { Component, OnInit, ElementRef ,ViewContainerRef,OnDestroy} from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AllPostsService } from '../providers/allPost.service';
import { AnalyticsService } from '../providers/analytics.service' 
import { ActivatedRoute } from '@angular/router';
// ----------------importing statements for local libraries and plugins ends----------------------
// --------------gloabal variables---------------------
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[AllPostsService,AnalyticsService]
})
export class HomepageComponent implements OnInit,OnDestroy {
  // ----------------local variables----------------------
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    sectionData;
    categories;
    categoryTemplateStyle;
    userInfo
    time=2;
    callAgain;
    templateId;
    countForToast=0;
    loading

    constructor(private route: ActivatedRoute,private analyticsService:AnalyticsService,private allPostsService:AllPostsService ,vRef: ViewContainerRef,public toastr: ToastsManager,private router:Router,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      // if(!this.appProvider.current.sectionDetails){
      //   this.router.navigate(['/Home'])
      // }
      this.location = location;
      this.sidebarVisible = false;
      this.toastr.setRootViewContainerRef(vRef);
      if (localStorage['userInfo']) {
        this.userInfo=JSON.parse(localStorage['userInfo'])
      }
    }
    
  	ngOnInit() {
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      // this.getSectionDetails();
      this.getCategoies()
  	}

    // -----------------removes the navbar-------------
  	navRemove(){
  		if (localStorage['menuOpen']=='true') {
	  		const body = document.getElementsByTagName('body')[0];
	        this.toggleButton.classList.remove('toggled');
	        this.sidebarVisible = false;
	        body.classList.remove('nav-open');
  		}
  	}

    // -----------------fetches the category by section section id-------------

    getCategoies(){
      this.loading=true
      const sectionId = this.route.snapshot.paramMap.get('section_id');
      // alert(sectionId);
      this.allPostsService.getCategory(sectionId).subscribe(data=>{
        this.loading=false;
        console.log("service ")
         this.sectionData=data.data;
         this.categories=this.sectionData;
         this.templateStyling();
      },err=>{
        console.log(err);
      })
    }
    // -----------------sets the template------------

    templateStyling(){
        if (this.sectionData.length==0) {
          this.categoryTemplateStyle="Category-view Template Four";
          this.analyticsService.trackTemplateEvent("Category-view Template Four")
          console.log("Category-view Template Four");
          return;
        }else{
          if (this.sectionData[0].categoryFormat) {
            this.categoryTemplateStyle=this.sectionData[0].categoryFormat;
            this.analyticsService.trackTemplateEvent(this.sectionData[0].categoryFormat);
            console.log(this.categoryTemplateStyle)
          }
          else{
            this.categoryTemplateStyle="Category-view Template Four";
            this.analyticsService.trackTemplateEvent("Category-view Template Four")
            console.log("Category-view Template Four");
          }
        }
    }
    // ------------------------set the background colour------------------
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

    // ------------------------navigates to the category page(home page 2)------------------

  onCategory(category){

    this.allPostsService.getSubCategoryCount(category._id).subscribe(data=>{
      if (data) {
        if (data.count==0) {
          this.showCustom();
        }else{
          this.router.navigate(['/category/'+category._id],{skipLocationChange:false});
          if(category.listView=="yes"){
            this.appProvider.current.listingViewFormat=category.listViewFormat;
          }else{
            this.appProvider.current.listingViewFormat="Listing-view Template One";
          }
        }
      }
    },err=>{
      console.log(err)
    })
  }

  // ---------------------invokes if subcategories are not present-----------------
  showCustom() {
    console.log("toast function")
    if (this.countForToast==0) {
      this.toastr.custom("<span style='color: red'>या प्रकारमध्ये उपप्रकार नाही</span>", null, {enableHTML: true});
      this.countForToast=this.countForToast+1;
      setTimeout(()=>{
        this.countForToast=0
      },5000)
    }
  }

  ngOnDestroy(){
    clearTimeout(this.callAgain) 
  }

}
