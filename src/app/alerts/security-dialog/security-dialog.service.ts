import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { environment } from '../../../environments/environment.prod';


@Injectable()
export class SecurityDialogService {

  constructor(private http:Http) {

  }

  SecurityStep1(securityModel:any):  Observable<any> {
		let body = securityModel;
        let api =  environment.endPoint;
        return this.http.post(api+"securityCheck-step1",body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}
