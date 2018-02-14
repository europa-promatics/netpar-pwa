import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq/faq.component'
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { WelcomeScreen2Component } from './welcome-screen2/welcome-screen2.component';
import { LoginComponent} from './login/login.component';
import { HomeComponent} from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Homepage2Component } from './homepage2/homepage2.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ListingViewComponent } from './listing-view/listing-view.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { MyContributionComponent } from './my-contribution/my-contribution.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SignupComponent } from './registeration-step-one/registeration-step-one.component';
import { AddContributionComponent } from './add-contribution/add-contribution.component'
import { AuthGuard } from './security/auth.guard'
import { CropImageComponent } from './crop-image/crop-image.component';
import { DownloadPageComponent } from './download-page/download-page.component'
import { DownloadedImageComponent } from './downloaded-image/downloaded-image.component';

const routes: Routes = [
    { path: '',   component: CategoryViewComponent,canActivate:[AuthGuard]},
    { path: 'welcome-screen', component: WelcomeScreenComponent },
    { path: 'welcome-screen2', component: WelcomeScreen2Component },
    { path: 'welcome-screen3',  component: HomeComponent},
    { path: 'Login', component: LoginComponent},
    { path: 'Signup',component:SignupComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'otp', component: OtpComponent},
    { path: 'section/:section_id', component: HomepageComponent},
    { path: 'category/:category_id', component: Homepage2Component },
    { path: 'category/:category_id/:subcategory_id', component: ListingViewComponent },
    { path: 'Story/:slug', component: ArticleDetailsComponent},
    { path: 'downloads', component: DownloadPageComponent },
    { path: 'downloaded-image', component: DownloadedImageComponent },
    { path: 'Home', component: CategoryViewComponent },
    { path: 'saved-articles', component: MyContributionComponent },
    { path: 'contributions', component: MyContributionComponent },
    { path: 'account', component: MyProfileComponent },
    { path: 'submit-content', component:AddContributionComponent},
    { path: 'crop-image',component:CropImageComponent},
    { path: 'Faq',component:FaqComponent},
    { path: 'Signup/:referralId',component:WelcomeScreen2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
