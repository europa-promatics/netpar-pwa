// ----------------importing statements for local libraries and plugins ----------------------
import { Component, OnInit, ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AllPostsService } from '../providers/allPost.service';
import { AppProvider } from '../providers/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
// ----------------importing statements for local libraries and plugins ends----------------------


@Component({
  selector: 'app-my-contribution',
  templateUrl: './my-contribution.component.html',
  styleUrls: ['./my-contribution.component.css'],
  providers:[AllPostsService]
})
export class MyContributionComponent implements OnInit,AfterViewInit {

  // ----------------local variables-----------------
    @ViewChild('tabGroup') tabGroup
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    count:number=1;
    userInfo
    userId;
    savedPosts;
    myContributions;
    loading;
    constructor(private router:Router,private appProvider:AppProvider,private allPostsService:AllPostsService,location: Location,  private element: ElementRef) {
    	this.location = location;
      this.sidebarVisible = false;
      if (localStorage['userInfo']) {
        this.userInfo=JSON.parse(localStorage['userInfo']);
        // console.log(this.userInfo)
        this.userId=this.userInfo._id;
      }else{
        this.router.navigate(['/welcome-screen2'])
      }
    }

  	ngOnInit() {
  		//this.listTitles = ROUTES.filter(listTitle => listTitle);
  		const navbar: HTMLElement = this.element.nativeElement;
  		this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.fetchDataForContributionsAndSavedArticles();
  	}
    // ------------------removes the navbar--------------------------
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

    // -------------------used set the color for the styling------------------- 
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

  // -------------------navigates to article details(Story page)------------------- 

  onSaved(articleData){
    this.appProvider.current.articleDetails=articleData;
    this.router.navigate(["/Story/"+articleData.slug],{skipLocationChange:false});
  }

  // ----------------------------fetches the saved contibution & saved posts----------------------
  fetchDataForContributionsAndSavedArticles(){
    this.loading=true;
    Observable.forkJoin([this.allPostsService.savedContributions(this.userId), this.allPostsService.getSavedPosts(this.userId)]).subscribe(results => {
      this.myContributions=results[0].data,
      this.savedPosts=results[1].saved_articles;
      this.loading=false;
    },err=>{
      this.loading=false;
      console.log(err);
    })
  }

  ngAfterViewInit(){
    console.log('afterViewInit => ', this.tabGroup.selectedIndex);
    if (this.appProvider.current.selectedTab=="myContribution") {
      // alert("aasa")
      this.tabGroup.selectedIndex=1;
    }
  }

  

}
