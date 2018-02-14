import { Component,OnInit } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { environment } from '../environments/environment.prod';
import { Location } from '@angular/common';
// import { MessagingService } from "./messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[TranslateService]
})
export class AppComponent implements OnInit {


  constructor(private location: Location,private translateService: TranslateService){
    translateService.setDefaultLang(environment.language);
  	translateService.use(environment.language);
  }

  ngOnInit(){
   
  }



}
