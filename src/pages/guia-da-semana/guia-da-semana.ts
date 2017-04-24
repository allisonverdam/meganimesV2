import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the GuiaDaSemana page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-guia-da-semana',
  templateUrl: 'guia-da-semana.html'
})
export class GuiaDaSemanaPage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('Hello GuiaDaSemanaPage Page');
  }

}
