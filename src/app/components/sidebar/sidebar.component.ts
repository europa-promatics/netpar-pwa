// ----------------importing statements for local libraries and plugins----------------------

import { Component, OnInit,AfterViewInit,ElementRef,ViewContainerRef } from '@angular/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
import { FetchSectionsService } from '../../providers/fetch-sections.service';
import { AppProvider } from '../../providers/app';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShareDialogComponent } from '../../alerts/share-dialog/share-dialog.component';
// ----------------importing statements for local libraries and plugins ends----------------------


// -----------------global variables-------------------
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Administrator',  icon: 'dashboard', class: '' },
    { path: 'admin', title: 'Template',  icon: 'dashboard', class: '' },
    { path: 'user-profile', title: 'Section',  icon:'person', class: '' },
    { path: 'table-list', title: 'Content',  icon:'content_paste', class: '' },
    { path: 'typography', title: 'User contribution',  icon:'library_books', class: '' },
    { path: 'icons', title: 'Homepage',  icon:'bubble_chart', class: '' },
    { path: 'maps', title: 'User',  icon:'location_on', class: '' },
    { path: 'notifications', title: 'Platform Analytics',  icon:'notifications', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers:[RouterLinkActive,FetchSectionsService]
})
export class SidebarComponent implements OnInit {

  // -------------local variables------------------
  menuItems: any[];
  adminPath;
  sectionPath;
  content;
  analaytics;
  template;
  sections;
  profile;
  private toggleButton: any;
  sectionData
  constructor(private dialog: MatDialog,private toastr:ToastsManager,vRef: ViewContainerRef,private element:ElementRef,private appProvider:AppProvider,private fetchSectionsService:FetchSectionsService ,private route:Router, private activeLink:RouterLinkActive) {
     
  }



  ngOnInit() {
    //alert(this.route.url)
      this.fetchSections();
      this.menuItems = ROUTES.filter(menuItem => menuItem);

       if (this.route.url=="welcome-screen3" ||this.route.url=="/edit-admin") {
            this.adminPath="in";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics=' ';
            this.template=' ';
            this.profile='';

        } else if(this.route.url=="/view-section" ||this.route.url=="/add-section" ||this.route.url=="/add-category" || this.route.url=="/add-subcategory"){
            this.adminPath=" ";
            this.sectionPath='in';
            this.content=' ';
            this.analaytics=' ';
            this.template=' ';
            this.profile='';
        }else if (this.route.url=='/add-content' || this.route.url=='/view-content' || this.route.url=='/comment') {
            this.adminPath=" ";
            this.sectionPath=' ';
            this.content='in';
            this.analaytics=' ';
            this.template=' ';
            this.profile='';
          // code...
        }else if (this.route.url=='/section-analytics' || this.route.url=='/template-analytics'||this.route.url=='/element-analytics'||this.route.url=='/article-analytics') {
          // code...
             this.adminPath="";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics='in';
            this.template=' ';
            this.profile='';
        }else if (this.route.url=='/section-templates' || this.route.url=='/category-templates' ||this.route.url=='/list-templates' ||this.route.url=='/homepage-templates') {
          // code...
            this.adminPath="";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics=' ';
            this.template='in';
            this.profile='';
        }
        else if (this.route.url=='/profile' || this.route.url=='/edit-profile') {
          // code...
            this.adminPath="";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics=' ';
            this.template='';
            this.profile='in';
        }
        else{
            this.adminPath=" ";
            this.sectionPath=' ';
            this.content=' ';
            this.analaytics=' ';
            this.template=' ';
            this.profile='';
        }
  }

// ------------------  fetches the section  data for the sidebar--------------------
   fetchSections(){
    this.fetchSectionsService.fetchSections().subscribe(data=>{
      // console.log(JSON.stringify(data));
      if (data.success==true) {
        this.sections=data.FinalArray;
      }
      
    },err =>{
      console.log(JSON.stringify(err));
    })
  } 

  // ----------------removes the navbar-------------------
  navRemove(){
      if (localStorage['menuOpen']=='true') {
        const body = document.getElementsByTagName('body')[0];
          body.classList.remove('nav-open');
      }
    }

// ------------------invokes on the click of subcategory-------------------
    onSubCategory(subcategory){
       console.log(subcategory)
        let articlesInSubCategory=this.appProvider.current.allArticles.response.filter(f=>f.subCategoryName==subcategory.subCategoryName);
        if (articlesInSubCategory.length==0) {
          this.showCustom()
        }
        else{
            this.appProvider.current.subCategoryData=subcategory;
            this.route.navigate(['/category/'+subcategory.categoryId+'/'+subcategory._id],{skipLocationChange:false})
            this.navRemove()
        }
    }
// ------------------invokes on the click of category-------------------

   onCategory(category){
      console.log(category);
      if (category.section_subcategories.length==0) {
        console.log("nothing to show");
        this.showCustom();
      }else{
        this.appProvider.current.categoryData=category;
        if(category.listView=="yes"){
          this.appProvider.current.listingViewFormat=category.listViewFormat;
        }else{
          this.appProvider.current.listingViewFormat="Listing-view Template One";
        }      
      }
    }

  // ------------------invokes when articles are not present-------------------

    showCustom() {
      console.log("toast function")
      this.toastr.custom('<span style="color: red">या उपप्रकारमध्ये लेख नाही</span>', null, {enableHTML: true});
    }

  // ------------------invokes on the click of section-------------------
 
  
    onSection(sectionData){
       this.sectionData=sectionData
    }

  // ------------------invokes on the rateus button -------------------

    onRateus(){
      this.navRemove();
      window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");  
    }

  // ------------------invokes on the click of myContribution-------------------

    onMyContriBution(){
      this.navRemove();
      this.appProvider.current.selectedTab="myContribution";
     
    }
  // ------------------invokes on the click of invite friends-------------------

    onInviteFreinds(){
      this.navRemove();
      let dialogRef = this.dialog.open(ShareDialogComponent, {
          width: '300px',
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }
  // ------------------invokes on the click of saved articles-------------------

    onSavedArticles(){
      this.navRemove();
      this.appProvider.current.selectedTab="savedArticles";
    }

  // ------------------invokes on the click of myfriends-------------------

    onFriends(){
      this.navRemove();
      this.appProvider.current.landingArea="friends";
      this.route.navigate(['/account'])
    }

  // ------------------invokes on the click of view mydownloads-------------------

    onMyDownloads(){
      this.navRemove();
      if (localStorage['downloadMedia']) {
        this.appProvider.current.landingArea="downloadSection";
        this.route.navigate(['/account'])
      }else{
        this.toastr.custom('<span style="color: red">डाऊनलोड केलेल्या गोष्टी नाही</span>', null, {enableHTML: true});
      }
    }

    // ------------------------------invokes on aboutus-------------------------
    onAboutUs(){
      this.navRemove();
      window.open("https://www.netpar.in/about-us.pdf");
    }

    // ------------------------------invokes on privacyPolicy------------------
    onPrivacyPolicy(){
      this.navRemove();
      window.open("https://www.netpar.in/privacy/privacy-policy.pdf");
    }
}
