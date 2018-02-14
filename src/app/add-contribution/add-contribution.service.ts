import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class AddContributionService {

  constructor(private http:Http) { }

  uploadMedia(media,type): Observable<any>{
    let api = "https://www.netpar.in/api/uploadMedia/"+type;
    return this.http.post(api,media)
    .map(response =>{
        return response.json();
    }).catch(error =>{
        return error;
    })
  }

  uploadContribution(userContibutionModel): Observable<any>{
  	let api = environment.endPoint+"saveContribution";
    let body = userContibutionModel;
    return this.http.post(api,body)
   		.map(response =>{
   	     return response.json();
    }).catch(error =>{
        return error;
    })
  }

}
