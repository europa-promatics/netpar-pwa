import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class UpdateprofileService {

  constructor(private http:Http) { }

  	updateProfilePicture(image,id): Observable<any>{
        let api = "https://www.netpar.in/api/uploadProfilePicEncoded/"+id;
        let body= {
            image:image
        };
        return this.http.post(api,body)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }


    updateProfile(updateProfileModel,userId):Observable<any>{
        let api = environment.endPoint+"updateProfile/"+userId;
        let body=updateProfileModel;
         return this.http.post(api,body)
        .map(response =>{
            return response.json();
        }).catch(error =>{
            return error;
        })
    }

    updateMobileNumber(updateMobileModel):  Observable<any> {
        let body = updateMobileModel;
        let api =  environment.endPoint;
        return this.http.post(api+"updateContact",body)
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
        return this.http.post(api+"checkMobile",body)
        .map(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}
