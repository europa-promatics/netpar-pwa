// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit,ViewChild,ViewContainerRef } from '@angular/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
import { FacebookService,InitParams,UIParams,UIResponse} from 'ngx-facebook';
import { AppProvider } from '../../providers/app';
import { DomSanitizer } from '@angular/platform-browser';
import { AnalyticsService }from '../../providers/analytics.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// ----------------importing statements for local libraries and plugins ends----------------------
// ----------------global variables------------------
declare var $
declare var FB: any;
declare var window: any;
// ----------------global variables end------------------


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ FacebookService,AnalyticsService]
})
export class FooterComponent implements OnInit {
  // ------------loacal variabels----------------------
   @ViewChild('myProfile') any:any
  test : Date = new Date();
  test2:any;
  showShareButton=false;
  shareUrl;
  classtoopen="open";
  shareButtonsFromArticleDetail=false;
  imageForOg
  // ------------loacal variabels ends----------------------

  constructor(vRef: ViewContainerRef,private toastr:ToastsManager,private analyticsService:AnalyticsService,private domSanitizer:DomSanitizer,private appProvider:AppProvider,private router:Router,private fb: FacebookService) {
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  window.fbAsyncInit = () => {
        console.log("fbasyncinit")

        FB.init({
            appId            : '223293578209386',
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10'
        });
    };
    this.toastr.setRootViewContainerRef(vRef);
  }
  // --------------------------invokes on page intialization--------------------
  ngOnInit() {
    this.shareUrl="http://europa.promaticstechnologies.com/netpar-pwa-dev/#/shareArticle/"+this.appProvider.current.article_id
  	this.test2=this.test.toISOString()
     let route= this.router.url;
    let spl=route.split('/');
  	if(spl[1]=='Story' || spl[1]=='suggestedArticleComponent'){
  		this.showShareButton=true;
  	}
  }

  // -------------------invokes on sharing the article----------------------
 share() {
    if (this.appProvider.current.articleDetails.thumbnailPicture) {
      this.imageForOg=this.appProvider.current.articleDetails.thumbnailPicture
    }else if (!this.appProvider.current.articleDetails.thumbnailPicture && this.appProvider.current.articleDetails.horizontalPicture) {
      this.imageForOg=this.appProvider.current.articleDetails.horizontalPicture
    }else if (!this.appProvider.current.articleDetails.thumbnailPicture && !this.appProvider.current.articleDetails.horizontalPicture) {
      this.imageForOg="http://www.netpar.in/netpar/uploads/logo.png"
    }

    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
          object : {
          'og:url': "https://www.netpar.in/#/Story/"+this.appProvider.current.slug,
          'og:title':  this.appProvider.current.articleDetails.headline,
          'og:site_name':'Netpar.in',
          'og:description':this.appProvider.current.articleDetails.tagline,
          'og:image': this.imageForOg,
          'og:image:width':'200',//size of image in pixel
          'og:image:height':'200', 
          }
        })
        }, function(response){
        console.log("response is ",response);
    });
 }
  
  // ---------------------------invokes on share icons----------------------

 onShare(){
  this.analyticsService.trackShareEvent(this.appProvider.current.articleDetails);
 }

  // ---------------------------invokes on myfriend list----------------------

 onMyFriends(){
   this.appProvider.current.landingArea="friends";
 }

  // ---------------------------invokes on view mycontibution ----------------------

  onMyContriBution(){
    this.appProvider.current.selectedTab="myContribution";
  }

  // ---------------------------invokes on view saved articles ----------------------

  onSavedArticles(){
    this.appProvider.current.selectedTab="savedArticles";
  }

  // ---------------------------invokes on view my downloads----------------------

  onMyDownloads(){
       if (localStorage['downloadMedia']) {
        this.appProvider.current.landingArea="downloadSection";
        this.router.navigate(['/account'])
      }else{
        this.toastr.custom('<span style="color: red">डाऊनलोड केलेल्या गोष्टी नाही</span>', null, {enableHTML: true});
      }
  }

  // ---------------------------invokes the share buttons----------------------

  testFunction(){
    $('#share').addClass('open');
    this.shareButtonsFromArticleDetail=true
    this.classtoopen="open";
    console.log(this.classtoopen)
  }

  // ---------------------------close the share buttons----------------------

  onFloatButton(){
    this.classtoopen="";
    this.shareButtonsFromArticleDetail=false;
    console.log("float")
    console.log(this.classtoopen)
  }

  
}

