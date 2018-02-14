// ----------------importing statements for local libraries and plugins ----------------------

import { Component, OnInit, ElementRef,OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppProvider } from '../providers/app'
import { Router,ActivatedRoute } from '@angular/router';
import { AllPostsService } from '../providers/allPost.service';
import { AnalyticsService } from '../providers/analytics.service'
import { FetchSectionsService } from '../providers/fetch-sections.service'
// ----------------importing statements for local libraries and plugins ends----------------------

  @Component({
    selector: 'app-listing-view',
    templateUrl: './listing-view.component.html',
    styleUrls: ['./listing-view.component.css'],
    providers:[AllPostsService,AnalyticsService,FetchSectionsService]
  })

  export class ListingViewComponent implements OnInit,OnDestroy {
    // --------------local variables-------------------
  	private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1
    allArticles;
    listingViewFormat;
    articleDataAtZeroIndex;
    articleData;
    callAgain;
    time=2;
    subCategoryData;
    templateId;
    loading
    // --------------local variables ends-------------------

    constructor(private fetchSectionsService:FetchSectionsService,private route:ActivatedRoute,private analyticsService:AnalyticsService,private allPostsService:AllPostsService,private router:Router,private appProvider:AppProvider,location: Location,  private element: ElementRef) {
      this.getArticles()
    }

    // --------------------invokes on the intialization of page---------------------
  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      // this.updateSubCategoriesTotalTime();
  	}
    // --------------------removes the navbar---------------------

  	navRemove(){
  		if (localStorage['menuOpen']=='true') {
  		  const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
  		}
  	}

    // -----------------used to store the very first article--------------------
    getArticleData(){
      this.articleDataAtZeroIndex=this.allArticles[0];
      this.allArticles.splice(0, 1);
    }
    // -----------------used to set the color for the template--------------------
    
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
    // -----------------appends the new class for the template styling--------------------

    getclass(i){
      if (i%6>2) {
        return 'new'
      }
    }

    //------------------navigates to the articles details page (Story)---------------- 
    onArticle(articleData){
      this.analyticsService.trackArticleEvent(articleData);
      this.appProvider.current.articleDetails=articleData;
      this.appProvider.current.fromPageFlag="listingViewPage";
      this.router.navigate(["/Story/"+articleData.slug],{skipLocationChange:false});
    }

    // ------------invokes on page close-------------------
    ngOnDestroy(){
      clearTimeout(this.callAgain) 
    }

    // --------------invokes ga function-----------------
    analytics(){
      this.analyticsService.trackTemplateEvent(this.listingViewFormat);
    }

    // ---------------------fetches the articles under subcategory and sets the template for listing view ---------------------
    getArticles(){
      this.loading=true
      const categoryId=this.route.snapshot.paramMap.get('category_id');
      const subCategoryId=this.route.snapshot.paramMap.get('subcategory_id');
      this.allPostsService.getArticle(categoryId,subCategoryId).subscribe(data=>{
        this.loading=false;
        if (data.success==true) {
          this.allArticles=data.data;
          this.allPostsService.getCategory(this.allArticles[0].sectionId).subscribe(data=>{
            if(data.data[0].listView=="yes"){
                this.listingViewFormat=data.data[0].listViewFormat;
                this.analytics();

            }else{
                this.listingViewFormat="Listing-view Template One";
            }
          },err=>{
            console.log(err);
          })
          this.getArticleData();
          this.loading=false;
        }
      },err=>{
        console.log(err)
      })
    }
}
