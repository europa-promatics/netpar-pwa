import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  	Login(loginModel:any):  Observable<any> {
		let body = loginModel;
        let api =  environment.endPoint;
        return this.http.post(api+"authenticate",body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    Register(registerModel:any):  Observable<any> {
        let body = registerModel;
        let api =  environment.endPoint;
        return this.http.post(api+"signUp",body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    VerifyMobile(mobileNumber):Observable<any>{
        let body = {
            mobileNumber:mobileNumber
        }
        let api  =  environment.endPoint;
        return this.http.post(api+"checkmobilePWA",body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}
