// ----------------importing statements for local libraries and plugins ----------------------

import { Component, OnInit, ElementRef,ViewContainerRef,OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AllPostsService } from '../providers/allPost.service'
import { AnalyticsService } from '../providers/analytics.service' ;
// ----------------importing statements for local libraries and plugins ends----------------------

@Component({
  selector: 'app-homepage2',
  templateUrl: './homepage2.component.html',
  styleUrls: ['./homepage2.component.css'],
  providers:[AllPostsService,AnalyticsService]
})

export class Homepage2Component implements OnInit,OnDestroy {
  // -----------local variables-------------------
  	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    sectionData;
    categoryData;
    subCategoryTemplateStyle;
    userInfo
    time=2
    callAgain;
    countForToast=0;
    subCategories;
    loading
    constructor(private route:ActivatedRoute,private analyticsService:AnalyticsService,private allPostsService:AllPostsService ,private toastr:ToastsManager,vRef: ViewContainerRef,private router:Router,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
        this.location = location;
        this.sidebarVisible = false;
        this.toastr.setRootViewContainerRef(vRef);
        if (localStorage['userInfo']) {
          this.userInfo==JSON.parse(localStorage['userInfo']);
        }
    }
    
  	ngOnInit() {
      this.categoryData=this.appProvider.current.categoryData;
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.getSubcategories();// invoke getSubcategories()
  	}

  	navRemove(){
  		if (localStorage['menuOpen']=='true') {
	  		const body = document.getElementsByTagName('body')[0];
	        this.toggleButton.classList.remove('toggled');
	        this.sidebarVisible = false;
	        body.classList.remove('nav-open');
  		}
  	}
    
    // -------------------------fetches subcategories by category id-----------------------
    getSubcategories(){
      this.loading=true;
      const categoryId=this.route.snapshot.paramMap.get('category_id');
      this.allPostsService.getSubCategory(categoryId).subscribe(data=>{
        this.loading=false
        this.subCategories=data.data;
        this.templateStyling();
      },err=>{
        console.log(err)
      })
    }

    // --------------------sets the template----------------------
    templateStyling(){
        if (this.subCategories.length==0) {
          this.subCategoryTemplateStyle="SubCategory-view Template Four";
          this.analyticsService.trackTemplateEvent("SubCategory-view Template Four")
          console.log("SubCategory-view Template Four");
          return;
        }else{
          if (this.subCategories[0].subCategoryFormat) {
            this.subCategoryTemplateStyle=this.subCategories[0].subCategoryFormat;
            this.analyticsService.trackTemplateEvent(this.subCategories[0].subCategoryFormat);
            console.log(this.subCategoryTemplateStyle)
          }
          else{
            this.subCategoryTemplateStyle="SubCategory-view Template Four";
            this.analyticsService.trackTemplateEvent("SubCategory-view Template Four")
            console.log("SubCategory-view Template Four");
          }
        }
    }
    // --------------------sets the background color----------------------

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

  // -------------------navigates to the category page(listing -view)------------------
  onSubcategory(subcategory){
    this.allPostsService.getArticlesCount(subcategory.categoryId,subcategory._id).subscribe(data=>{
      if(data){ 
        if (data.count==0) {
          this.showCustom();
        }else{
          this.router.navigate(['/category/'+subcategory.categoryId+'/'+subcategory._id],{skipLocationChange:false})
        }
      }

    },err=>{
      console.log(err)
    })
  }

  // ----------------------invokes if articles are   not present-------------------------
  showCustom() {
    if (this.countForToast==0) {
      this.toastr.custom("<span style='color: red'>या उपप्रकारमध्ये लेख नाही</span>", null, {enableHTML: true});
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
