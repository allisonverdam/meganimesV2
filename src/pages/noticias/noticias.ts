import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Noticias page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html'
})
export class NoticiasPage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('Hello NoticiasPage Page');
  }

}
