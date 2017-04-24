import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Facebook } from 'ionic-native';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {

  constructor(public http: Http) {
    console.log('Hello LoginService Provider');
  }

  autenticar(successCallback:any, errorCallback:any){
    Facebook.login(['user_friends', 'public_profile']).then(response => {      
      successCallback(response.authResponse);
    }, err => {
      errorCallback(err);
    })
  }

  getDados(user:any, successCallback:any){
    console.log('user', user)
    Facebook.api('/me?fields=id,name,picture,email,friends&access_token='+user.accessToken, []).then(response => {
      console.log('response',response);
      let profile = response;
      successCallback(profile);
    })
  }

}
