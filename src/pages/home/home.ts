import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AnimesPage } from '../animes/animes';
import { GenerosPage } from '../generos/generos';
import { GuiaDaSemanaPage } from '../guia-da-semana/guia-da-semana';
import { NoticiasPage } from '../noticias/noticias';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private platform: Platform) { }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

  abrirLancamentos() {
    let tipo = 'lancamento';
    this.navCtrl.push(AnimesPage, { tipo });
  }

  abrirCompletos() {
    let tipo = 'completo';
    this.navCtrl.push(AnimesPage, { tipo });
  }

  abrirNoticias() {
    this.navCtrl.push(NoticiasPage);
  }

  abrirGeneros() {
    this.navCtrl.push(GenerosPage);
  }

  abrirGuiaDaSemana() {
    this.navCtrl.push(GuiaDaSemanaPage);
  }

}
