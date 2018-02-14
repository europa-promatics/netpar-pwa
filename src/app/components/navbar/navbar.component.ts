import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
import { PopupComponent } from '../../alerts/popup/popup.component';
// ----------------importing statements for local libraries and plugins ends----------------------
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnalyticsService } from'../../providers/analytics.service';
import { AppProvider } from '../../providers/app'
// ----------------importing statements for local libraries and plugins ends----------------------

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[AnalyticsService]
})
export class NavbarComponent implements OnInit {
  // --------------------LOCAL VARIABLES---------------
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    backButton=false;
    logoutButtonVisible;
    userData;
    logoutClass='';
    
    constructor(private appProvider:AppProvider,private analyticsService:AnalyticsService,private dialog: MatDialog,private router:Router,private translateService:TranslateService,location: Location,  private element: ElementRef) {
      this.location = location;
      this.sidebarVisible = false;
      if (localStorage['userInfo']) {
        this.userData=JSON.parse(localStorage['userInfo']);
      }
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
    // --------------FOR OPENING SIDE BAR--------------------
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('nav-open');

        this.sidebarVisible = true;
        localStorage['menuOpen']='true'
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
        localStorage['menuOpen']='false'
    };
    
    sidebarToggle() {
        if (this.sidebarVisible == false) {
            this.sidebarOpen();
            this.sidebarVisible = false
        } else {
           this.sidebarClose();
        }
    };

    getTitle(){
      var titlee =  this.router.url;
      if (titlee=='/') {
        return 
      }
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();
      if (titlee=='account') {
         this.logoutClass="logoutButtonClass";
         this.logoutButtonVisible=true;
         return 
      }
      else if (titlee=='my-contribution' || titlee=='friends' ||titlee=='category-view') {
         return 
      }
      else if (titlee=='addContribution') {
         return this.translateService.instant('MenuScreen.Contribute');
      }
      else{
         return 
      }
    }

    goBack(): void { 
      if (this.router.url=='/Story/'+this.appProvider.current.slug) {
       this.router.navigate(['/Home'],{skipLocationChange:false});
      }
    }

    onLogOut(){
      this.openDialog("do you want to logout");
    }

     openDialog(msg): void {
      let dialogRef = this.dialog.open(PopupComponent, {
          width: '240px',
          data:{ message:msg}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result=='logOut'){
            localStorage.removeItem('isLoggedin');
            // this.userOfflineFunction();
            this.router.navigate(['/welcome-screen2'],{skipLocationChange:false});
          }
        }
      });
    }

    onWhatsappLogo(){
      window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");
    }

    // userOfflineFunction(){
    //   if (this.userData) {
    //     // code...
    //     this.analyticsService.offlineStatus(this.userData._id).subscribe(data=>{
    //       console.log("userOffline");
    //     },err=>{
    //       console.log(err);
    //     })
    //   }
    // }
}
