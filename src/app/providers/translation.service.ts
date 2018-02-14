import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import { Observable} from 'rxjs/Rx'
import { AppProvider } from './app'
import "rxjs"

// import {Admin} from './edit.model.component'

@Injectable()
export class TranslationService {

    lang
    constructor(private http: Http,private appProvider:AppProvider)
    { }

    // ------------------------------------------used for trasliteration (revup api)-----------------------------
     onGetSuggetiion(value):  Observable<any> {
        if (this.appProvider.current.currentLanguage=="Hindi") {
            this.lang='hindi'
        }else if (this.appProvider.current.currentLanguage=="Bengali") {
            this.lang='bengali'
        }else if (this.appProvider.current.currentLanguage=="Gujarati") {
             this.lang='gujarati'
        }else if (this.appProvider.current.currentLanguage=="Kannada") {
             this.lang='kannada'
        }else if (this.appProvider.current.currentLanguage=="Marathi") {
             this.lang='marathi'
        }else if (this.appProvider.current.currentLanguage=="Malayalam") {
             this.lang='malayalam'
        }else if (this.appProvider.current.currentLanguage=="Telugu") {
             this.lang='telugu'
        }else if (this.appProvider.current.currentLanguage=="Tamil") {
             this.lang='tamil'
        }else if (this.appProvider.current.currentLanguage=="Punjabi") {
             this.lang='punjabi'
        }else if (this.appProvider.current.currentLanguage=="English") {
             this.lang='english'
        }else {
             this.lang='marathi'
        }
        let a=[]
        a[0]=value
        let b={
            data:a
        }
        console.log(value)
        this.appProvider.current.suggestedString=[]
        let api =  "https://api-gw.revup.reverieinc.com/apiman-gateway/PROMATICS/transliteration/1.0?source_lang=english&target_lang="+this.lang+"&content_lang=&abbreviate=&noOfsuggestions=10&domain=1";
        let options = new RequestOptions({
                    headers: new Headers({
                       "rev-api-key": "5c3a548b01cce02490127a5f50c3fb47",
                       "rev-app-id": "NETPAR_APP",
                       "content-type": "application/json"
                    }),
                  //  search:params
         });
        return this.http.post(api,JSON.stringify(b),options).map(response => {
            console.log("customer Info datais " + response);
             let responsee=response.json();
            return responsee.responseList[0].outString;
        }).catch(error => {
            return error;
        });
    }


    // private throwPromise(error: any): Promise<any> {
    //     let details = error.json().messages;
    //     alert("Failure :" + details);
    //     return Promise.reject(error);
    // }


}