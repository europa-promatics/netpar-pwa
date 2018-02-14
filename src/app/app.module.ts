import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component'; //default component
import { AppRoutingModule } from './app-routing.module'; //to import routing file
import { RouterModule } from '@angular/router'; //to use routing
import { HashLocationStrategy, LocationStrategy } from '@angular/common'; // to follow hash strategy

// ---------------to import material designing modules------------------
import { MatSnackBarModule,MatProgressBarModule, MatCheckboxModule, MatProgressSpinnerModule, MatSelectModule, MatInputModule, MatRadioModule} from "@angular/material";
import { MatAutocompleteModule,MatListModule, MatDialogModule } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule,MatExpansionModule} from '@angular/material';
import { MatTooltipModule, MatTableModule, MatPaginator } from "@angular/material";
import { MatTabsModule} from '@angular/material';

// ------------------- components used(pages)-----------------------------
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Homepage2Component } from './homepage2/homepage2.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { WelcomeScreen2Component } from './welcome-screen2/welcome-screen2.component';
import { StateDialogComponent } from './welcome-screen2/state-dialog/state-dialog.component';
import { LanguageDialogComponent } from './welcome-screen2/language-dialog/language-dialog.component';
import { Navbar2Component } from './components/navbar2/navbar2.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { MyContributionComponent } from './my-contribution/my-contribution.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SignupComponent } from './registeration-step-one/registeration-step-one.component';
import { BackButtonNavbarComponent } from './components/back-button-navbar/back-button-navbar.component'
import { AddContributionComponent } from './add-contribution/add-contribution.component';
import { CropImageComponent } from './crop-image/crop-image.component';
import { DownloadedImageComponent } from './downloaded-image/downloaded-image.component';
import { DownloadPageComponent } from './download-page/download-page.component';
import { FaqComponent } from './faq/faq.component'

// ----------------- popups -----------------------
import { PopupComponent } from './alerts/popup/popup.component';
import { SecurityDialogComponent } from './alerts/security-dialog/security-dialog.component';
import { SecurityDialog2Component } from './alerts/security-dialog2/security-dialog2.component';
import { Popup2Component } from './alerts/popup2/popup2.component';
import { ValidationBoxesComponent } from './alerts/validation-boxes/validation-boxes.component';
import { ExistingUserCheckComponent } from './alerts/existing-user-check/existing-user-check.component';
import { RecheckDetailsComponent } from './alerts/recheck-details/recheck-details.component';
import { IsThisYouComponent } from './alerts/is-this-you/is-this-you.component';
import { UpdateMobileNumberComponent } from './alerts/update-mobile-number/update-mobile-number.component';
import { ShareDialogComponent } from './alerts/share-dialog/share-dialog.component'
import { DownloadPopupComponent } from './alerts/download-popup/download-popup.component';

// ------------------------------plugins used----------------------------------------------
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';//used in side bar to set the layout
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';//used in side bar to set the layout
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';//used in side bar to set the layout
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';// used for form in angular
import { HttpClientModule, HttpClient } from '@angular/common/http';//used for fetching data from api's
import { HttpModule, Http, JsonpModule } from "@angular/http";//used for fetching data from api's
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';//used in translation of the app
import { TranslateHttpLoader } from '@ngx-translate/http-loader';//used in translation of the app
import { SlickModule } from 'ngx-slick';// used in slider on home page
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FacebookModule } from 'ngx-facebook'; // facebook sharing
import { ToastModule } from 'ng2-toastr/ng2-toastr';//to show toasts
import { ToastOptions } from 'ng2-toastr'; //to show toasts
import { NgxCroppieModule } from 'ngx-croppie';// used to crop profile image
import { ShareDirectiveModule  } from 'ngx-sharebuttons';// for social sharing.
import { LazyLoadImagesModule } from 'ngx-lazy-load-images'; // used for lazyloading on images
import { OrderbyPipe } from './pipes/orderby.pipe';
import { AppProvider } from './providers/app';//used for data transfer.
import { RevupDirective } from './directives/revup.directive';//used in transliteration
import { AuthGuard } from './security/auth.guard';// used to check login or not


// -----------------------------fcm----------------------------
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth }     from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

// ---------------------------angular service worker------------------------
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export const firebaseConfig = {
    //fill this data with the data you get from the firebase console
    apiKey: "AIzaSyD6QIflHAEvwg9bpodwmQrTsy__tEHyOy0",
    authDomain: "netpar-pwa.firebaseapp.com",
    databaseURL: "https://netpar-pwa.firebaseio.com",
    projectId: "netpar-pwa",
    storageBucket: "",
    messagingSenderId: "1030333247647"
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}



@NgModule({
  declarations: [
    CategoryViewComponent,
    FaqComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    OtpComponent,
    PopupComponent,
    SecurityDialogComponent,
    SecurityDialog2Component,
    HomepageComponent,
    Homepage2Component,
    ArticleDetailsComponent,
    WelcomeScreenComponent,
    WelcomeScreen2Component,
    StateDialogComponent,
    LanguageDialogComponent,
    Navbar2Component,
    Popup2Component,
    ListingViewComponent,
    MyContributionComponent,
    MyProfileComponent,
    SignupComponent,
    ValidationBoxesComponent,
    RevupDirective,
    BackButtonNavbarComponent,
    ExistingUserCheckComponent,
    RecheckDetailsComponent,
    IsThisYouComponent,
    UpdateMobileNumberComponent,
    AddContributionComponent,
    CropImageComponent,
    ShareDialogComponent,
    DownloadPopupComponent,
    DownloadPageComponent,
    DownloadedImageComponent,
    OrderbyPipe
  ],
  imports: [
    ShareDirectiveModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([],{ useHash: true }),
    ScrollToModule.forRoot(),
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    MatTableModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    MatExpansionModule,
    FacebookModule,
    SlickModule.forRoot(),
    ToastModule.forRoot(),
    NgxCroppieModule,
    LazyLoadImagesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [AppProvider,{provide: LocationStrategy, useClass: HashLocationStrategy},{
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },AuthGuard,AngularFireAuth,AngularFireDatabase],
  bootstrap: [AppComponent],
  entryComponents: [ 
    DownloadPopupComponent,
    ShareDialogComponent,
    IsThisYouComponent,
    RecheckDetailsComponent,
    ExistingUserCheckComponent,
    ValidationBoxesComponent,
    Popup2Component,
    PopupComponent, 
    SecurityDialogComponent,
    SecurityDialog2Component,
    StateDialogComponent, 
    LanguageDialogComponent,
    UpdateMobileNumberComponent
  ]

})


export class AppModule { }
