import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ModalAnime page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-anime',
  templateUrl: 'modal-anime.html'
})
export class ModalAnimePage {
  anime;

  constructor(public navCtrl: NavController, params: NavParams, public viewCtrl: ViewController) {
    this.anime = params.data.anime;

  }
  

  ionViewDidLoad() {
    console.log('Hello ModalAnimePage Page');
  }

  fechar(){
   this.viewCtrl.dismiss();
  }

}
