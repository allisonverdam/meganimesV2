import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Generos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-generos',
  templateUrl: 'generos.html'
})
export class GenerosPage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('Hello GenerosPage Page');
  }

}
