import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';


@Injectable()
export class UpdateMobileService {

  constructor(private http:Http) { }

    // ----------------------------------used for updating mobile number----------------------------
    updateMobileNumber(updateModel:any):  Observable<any> {
        let body = updateModel;
        let api =  environment.endPoint;
        return this.http.post(api+"updateContact",body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    // ---------------------------registerDeviceForNotification-----------------------------
    registerDeviceForNotification(userId,deviceToken):  Observable<any> {
        let body = {
            id:userId,
            deviceToken:deviceToken
        };
        let api =  environment.endPoint;
        return this.http.post(api+"registerGCMDevice",body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}
