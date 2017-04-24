import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import localForage from "localforage";

/*
  Generated class for the Amigos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html'
})
export class AmigosPage {
  amigos;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ngAfterViewInit() {
    this.carregarAmigos()
  }

  carregarAmigos() {
    // pegar dados do user do banco
    // Callback version:
    localForage.getItem('amigos').then(value => {
      // This code runs once the value has been loaded
      // from the offline store.
      this.amigos = value;
      console.log('amigos', value);
      console.log('this amigos', this.amigos)
    }).catch(err => {
      // This code runs if there were any errors
      console.log(err);
    });
  }
}
