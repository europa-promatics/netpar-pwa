import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class FetchSectionsService {

  constructor(private http:Http) { }

  // --------------------------used to fetch sections------------------------- 
	
	fetchSections():  Observable<any> {
    let api =  environment.endPoint+"fetchSections";
    return this.http.get(api)
    .map(response => {
        return response.json();
    }).catch(error => {
        return error;
    });
  }
}
