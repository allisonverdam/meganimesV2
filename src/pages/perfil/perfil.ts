import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';

import localForage from "localforage";
import { AnimePage } from '../anime/anime';

/*
  Generated class for the Perfil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  opcoesPerfil: string = 'favoritos';
  favoritos;
  user: any = { picture: { data: { url: null } } };

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    let self = this;
    // pegar dados do user do banco
    // Callback version:
    localForage.getItem('user').then(value => {
      // This code runs once the value has been loaded
      // from the offline store.
      self.user = value;
      console.log('user:', value);
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });

    localForage.getItem('favoritos').then(value => {
      // This code runs once the value has been loaded
      // from the offline store.
      self.favoritos = value;

      console.log('favoritos:', this.favoritos)
      console.log('value:', value);
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });

    console.log('ionViewDidLoad PerfilPage');
  }

  abrirAnime(anime) {
    this.navCtrl.push(AnimePage, { id: anime.id });
  }

}
