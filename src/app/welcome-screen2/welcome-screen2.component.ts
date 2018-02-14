// ----------------importing statements for local libraries and plugins ----------------------

import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 
import { StateDialogComponent } from './state-dialog/state-dialog.component';
import { LanguageDialogComponent } from './language-dialog/language-dialog.component';
import { StateService } from '../providers/state.service';
import { LanguageService } from '../providers/language.service';
import { AppProvider } from '../providers/app'
// ----------------importing statements for local libraries and plugins ends----------------------


@Component({
  selector: 'app-welcome-screen2',
  templateUrl: './welcome-screen2.component.html',
  styleUrls: ['./welcome-screen2.component.css'],
  providers:[StateService,LanguageService]
})
export class WelcomeScreen2Component implements OnInit {
  // -------------------------local variables------------------------
  states;
  languages;
  selectedState;
  selectedLanguage;
  refrralId;
  message
  // -------------------------local variables ends------------------------

  constructor(private appProvider:AppProvider,private route:ActivatedRoute,private dialog: MatDialog, private router:Router, private stateService:StateService,private languageService:LanguageService) { 
    if (localStorage.getItem('isLoggedin')) {
      localStorage.removeItem('isLoggedin');
    }
    this.routeConfig()
  }

  // -------------------intializes on the page loading--------------------
  	ngOnInit(){
      this.getStates();//getStates()
      this.getLanguages();//getLanguages()
    	localStorage['currentpath']=this.router.url;
  	}

    // --------------------used to get the state data------------------
    getStates(): void {
      this.stateService.getStates().then(data =>{
        this.states = data
      } );
    }

    // --------------------used to get the language data------------------

    getLanguages(): void {
      this.languageService.getLanguages().then(data =>{
        this.languages = data
         // alert(JSON.stringify(data))
      } );
    }

    // --------------------invokes on selecting language------------------

    onSelected(){
      if (this.selectedLanguage) {
       localStorage['selectedLanguage']=this.selectedLanguage;
       this.router.navigate(['/welcome-screen'],{skipLocationChange:false})
      }
    }

    // -----------------checks whethe refferal code is present or not---------------
    routeConfig(){
      this.refrralId = this.route.snapshot.paramMap.get('referralId');
      if (this.refrralId) {
        this.appProvider.current.refferalId=this.refrralId;
      }
    }

}
