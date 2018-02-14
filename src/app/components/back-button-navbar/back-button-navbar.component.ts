// ----------------importing statements for local libraries and plugins----------------------
import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule ,Router,RouterLinkActive} from '@angular/router';
import { AppProvider } from '../../providers/app';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common'; 
// ----------------importing statements for local libraries and plugins ends----------------------

@Component({
  selector: 'app-back-button-navbar',
  templateUrl: './back-button-navbar.component.html',
  styleUrls: ['./back-button-navbar.component.css']
})
export class BackButtonNavbarComponent implements OnInit {
  // -----------local variables-------
  articleData
  sectionDetails
  categoryData
  // -----------local variables ends-------

  constructor(private location:Location,private appProvider:AppProvider,private router:Router) { 
  }
    
  ngOnInit() {
    
  }
  // -------------------invokes on back Button leads to previous page-------------------
  goBack(): void { 
    this.location.back()
  }

  // -------------------invokes on netpar logo-------------------------
  onNetparLogo(){
    window.open("https://play.google.com/store/apps/developer?id=WhatsApp+Inc.&hl=en");
  }

 
}
