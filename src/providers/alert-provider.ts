import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AlertProvider {

  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello AlertProvider Provider');
  }

  showCofirm(title:string, message:string, btnText1:string, btnText2:string, callback:any) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: btnText1,
          role: 'cancel',
          handler: () => {
            callback(0);
          }
        },
        {
          text: btnText2,
          handler: () => {
            callback(1);
          }
        }
      ]
    });
    alert.present();
  }
}
