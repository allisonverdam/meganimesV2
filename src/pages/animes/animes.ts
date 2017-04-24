import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AnimeService } from '../../providers/anime-service';
import { AnimePage } from '../anime/anime';

declare var window: Window;


/*
  Generated class for the Animes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-animes',
  templateUrl: 'animes.html',
  providers: [AnimeService]
})
export class AnimesPage {

  animeService: AnimeService;
  animes;
  animesOld;
  titulo: string;
  pagina: number = 1;
  myInput: string = '';
  podeInfinite: boolean = true;
  animeNotFound: boolean = false;

  //1 = lançamento, 2 = completos
  tipo;

  constructor(public navCtrl: NavController, _animeService: AnimeService, params: NavParams) {
    this.tipo = params.data.tipo || params.get('tipo');

    if (this.tipo == 'lancamento')
      this.titulo = "Lançamento";
    else if(this.tipo == 'completo')
      this.titulo = "Animes Completos";
    else
      this.titulo = "Lançamento";

    this.animeService = _animeService;

    window.onhashchange = function() {
 console.log('reste')
}
  }

  ionViewDidLoad() {
    let self = this;
    setTimeout(function () {
      self.carregarAnimes();
    }, 1000);
    console.log('Hello AnimesPage Page asfasfffd');
  }

  onInputSearchbar(event) {
    if (event.target.value != null) {
      this.podeInfinite = false;
      this.buscarAnimes(event.target.value);
    }
  }

  onCancelSearchbar(event) {
    if (this.animesOld != null) {
      this.animes = this.animesOld;
      this.animesOld = null;
      this.podeInfinite = true;
      this.animeNotFound = false;
    }
  }


  onClearSearchbar(event) {
    if (this.animesOld != null) {
      this.animes = this.animesOld;
      this.animesOld = null;
      this.podeInfinite = true;
      this.animeNotFound = false;
    }
  }


  buscarAnimes(nome: string) {
    if (nome.trim().length == 0) {
      if (this.animesOld != null)
        this.animes = this.animesOld;
      this.podeInfinite = true;
      return;
    }

    if (this.animesOld == null)
      this.animesOld = this.animes;

    this.animeService.buscarAnimes(nome).subscribe(data => {
      if (data == null) {
        this.animes = [];
        this.animeNotFound = true;
      } else {
        this.animeNotFound = false;
        this.animes = data;
      }
    })
  }

  carregarAnimes() {
    if (this.tipo == 'lancamento') {
      this.animeService.getAnimes(this.pagina).subscribe(data => {
        this.animes = data;
      })
      //botei else por enquanto, pois só tem animes completos ou em lançamento
    } else {
      this.animeService.getAnimesCompletos(this.pagina).subscribe(data => {
        this.animes = data;
      })
    }
  }

  doInfinite(pagina, infiniteScroll) {
    if (this.tipo == 'lancamento') {
      this.animeService.getAnimes(pagina).subscribe(data => {
        if (data == null) {
          infiniteScroll.enable(false);
          return;
        }

        this.animes = this.animes.concat(data);
        infiniteScroll.complete();
        this.pagina++;
      })
    } else {
      this.animeService.getAnimesCompletos(pagina).subscribe(data => {
        if (data == null) {
          infiniteScroll.enable(false);
          return;
        }

        this.animes = this.animes.concat(data);
        infiniteScroll.complete();
        this.pagina++;
      })
    }
  }

  //ionViewDidLoad() {
  //  console.log('Hello AnimesPage Page');
  //}

  abrirAnime(anime) {
    this.navCtrl.push(AnimePage, { anime, id: anime.id });
  }

}
