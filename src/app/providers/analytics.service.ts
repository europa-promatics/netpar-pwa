import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';
declare var ga:any;
@Injectable()
export class AnalyticsService {

  constructor(private http:Http) { }

   // --------------------------------for user's online status----------------------------------- 
    onlineStatus(userId){
        let api = environment.endPoint+"onlineStatus/"+userId+"/"+1;
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    // ----------------------------------for user's offline status-------------------------------

    offlineStatus(userId){
         let api = environment.endPoint+"onlineStatus/"+userId+"/"+0;
        return this.http.get(api)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    // --------------------------------ga analytics----------------------------------------

    // -------------------------ga section analtics---------------------------------

    trackSectionEvent(sectionData){
        console.log('analytics',sectionData)
        ga('send', 'event', 'Section', 'click', sectionData.sectionName,sectionData.itemId);
    }
    

    // -------------------------------for template analytics-------------------------------

    trackTemplateEvent(templateName){
        // alert(templateName)
        if(templateName=="Section Template One"){
            ga('send', 'event', 'Template', 'click', templateName , 12 );
        }
        else if(templateName=="Section Template Two"){
            ga('send', 'event', 'Template', 'click', templateName , 13 );
        }

        else if(templateName=="Category-view Template One"){
            ga('send', 'event', 'Template', 'click', templateName , 8 );
        }else if(templateName=="Category-view Template Two"){
            ga('send', 'event', 'Template', 'click', templateName , 9 );
        }else if(templateName=="Category-view Template Three"){
            ga('send', 'event', 'Template', 'click', templateName , 10 );
        }else if(templateName=="Category-view Template Four"){
            ga('send', 'event', 'Template', 'click', templateName , 11 );
        }


        else if(templateName=="SubCategory-view Template One"){
            ga('send', 'event', 'Template', 'click', templateName , 14 );
        }else if(templateName=="SubCategory-view Template Two"){
            ga('send', 'event', 'Template', 'click', templateName , 15 );
        }else if(templateName=="SubCategory-view Template Three"){
            ga('send', 'event', 'Template', 'click', templateName , 16 );
        }else if(templateName=="SubCategory-view Template Four"){
            ga('send', 'event', 'Template', 'click', templateName , 17 );
        }


        else if(templateName=="Listing-view Template One"){
            ga('send', 'event', 'Template', 'click', templateName , 1 );
        }else if(templateName=="Listing-view Template Two"){
            ga('send', 'event', 'Template', 'click', templateName , 2 );
        }else if(templateName=="Listing-view Template Three"){
            ga('send', 'event', 'Template', 'click', templateName , 3 );
        }else if(templateName=="Listing-view Template Four"){
            ga('send', 'event', 'Template', 'click', templateName , 4 );
        }else if(templateName=="Listing-view Template Five"){
            ga('send', 'event', 'Template', 'click', templateName , 5 );
        }else if(templateName=="Listing-view Template Six"){
            ga('send', 'event', 'Template', 'click', templateName , 6 );
        }else if(templateName=="Listing-view Template Seven"){
            ga('send', 'event', 'Template', 'click', templateName , 7 );
        }
    }

   // ---------------------------for aricle analytics-------------------------------------

   // ----------------------------------for article click-------------------------------
    trackArticleEvent(articleData){

        ga('send', 'event', 'Article', 'click',articleData.headline,articleData.itemId);
    }

    // --------------------------------for article like-------------------------------------
    trackLikeEvents(articleData){
        ga('send', 'event', 'Engagement', 'Like',articleData.headline,articleData.itemId);
    }

    // ----------------------------------for article share---------------------------------

    trackShareEvent(articleData){
        ga('send', 'event', 'Engagement', 'Share',articleData.headline,articleData.itemId);
    }

    // --------------------------------------for comment on article-----------------------

    trackCommentEvent(articleData){
        ga('send', 'event', 'Engagement', 'Comment',articleData.headline,articleData.itemId);
    }
    // --------------------------------------for saving article-----------------------


    trackSaveEvent(articleData){
        ga('send', 'event', 'Engagement', 'Save',articleData.headline,articleData.itemId);
    }

    // --------------------------------------for downloading-----------------------

    trackDownloadEvent(articleData){
        ga('send', 'event', 'Engagement', 'Download',articleData.headline,articleData.itemId);
    }


    // ------------------for call to action buttons-----------------

    // ----------------------------call button-----------------------
    trackCallEvent(articleData){
        ga('send', 'event', 'Engagement', 'Call',articleData.headline,articleData.itemId);
    }

    // ----------------------------call me back button-----------------

    trackCallMeBackEvent(articleData){
        ga('send', 'event', 'Engagement', 'Call-Me-Back',articleData.headline,articleData.itemId);
    }

    // ---------------------------apply button---------------------
    trackApplyEvent(articleData){
        ga('send', 'event', 'Engagement', 'Apply',articleData.headline,articleData.itemId);
    }

    // -------------------------------interested button---------------------
    trackInterestedEvent(articleData){
        ga('send', 'event', 'Engagement', 'Interested',articleData.headline,articleData.itemId);
    }
    
}