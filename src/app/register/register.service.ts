import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class RegisterService {

  constructor(private http:Http) { }

    Register(registerModel:any):  Observable<any> {
		let body = registerModel;
        let api =  environment.endPoint;
        return this.http.post(api+"usersignup",body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}
