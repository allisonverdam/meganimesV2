import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

import { EpisodioService } from '../../providers/episodio-service';
import { AlertProvider } from './../../providers/alert-provider';
import { AnimeService } from '../../providers/anime-service';
import { EpisodioPage } from '../episodio/episodio';
import { ModalAnimePage } from '../modal-anime/modal-anime';
import { AnimesPage } from './../animes/animes';

declare var apiSession, chrome;

/*
  Generated class for the Anime page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-anime',
  templateUrl: 'anime.html',
  providers: [EpisodioService, AnimeService, AlertProvider]
})
export class AnimePage {

  titulo: string;
  anime;
  episodios;
  episodiosOld;
  temporadas: Array<number>;
  temporada: number = 1;
  rate: number;
  myInput: string = '';
  hasEpisodes: boolean = true;

  constructor(public navCtrl: NavController, private episodioService: EpisodioService,
    private params: NavParams, public modalCtrl: ModalController, private animeService: AnimeService,
    private alertCtrl: AlertProvider) {
    this.anime = { generos: null, imagem: null }
    this.titulo = "Carregando...";
  }

  ionViewDidLoad() {
    this.carregarAnime();
  }

  onInputSearchbar(event) {
    if (event.target.value != null) {
      this.buscarEpisodio(event.target.value);
    }
  }

  onCancelSearchbar(event) {
    if (this.episodiosOld != null) {
      this.episodios = this.episodiosOld;
      this.episodiosOld = null;
    }
  }

  onClearSearchbar(event) {
    if (this.episodiosOld != null) {
      this.episodios = this.episodiosOld;
      this.episodiosOld = null;
    }
  }

  buscarEpisodio(numero: string) {
    if (numero.trim().length == 0) {
      if (this.episodiosOld != null)
        this.episodios = this.episodiosOld;
      return;
    }

    if (this.episodiosOld == null)
      this.episodiosOld = this.episodios;

    let episodio = this.episodiosOld.filter(episodio => {
      return episodio.nome.endsWith(numero);
    })

    //coloquei o [] porque o *ngFor precisa dele pra funcionar
    if (episodio.length > 0)
      episodio = [episodio.shift()];

    this.episodios = episodio;
  }

  toggleDetalhes(data) {
    if (data.showImagem) {
      data.showImagem = false;
    } else {
      data.showImagem = true;
    }
  }

  carregarAnime() {
    let anime;
    if (this.params.data.anime != null) {
      this.atualizarDadosAnime(this.params.data.anime);
    } else {
      this.carregaAnimeAPI().subscribe(data => {
        this.atualizarDadosAnime(data);
      });
    }
  }

  carregaAnimeAPI() {
    return this.animeService.getAnimeById(this.params.get('id') || this.params.data.id);
  }

  atualizarDadosAnime(anime) {
    this.anime = anime;
    this.rate = this.anime.classificacao;
    this.titulo = this.anime.nome;
    this.numTemporada(this.anime.temporadas);
    this.carregarEpisodios(this.anime.id, this.temporada);
  }

  votar() {
    console.log('classificacao', this.rate);
  }

  shareFacebook() {
    SocialSharing.shareViaFacebook('Estou assistindo: ' + this.anime.nome,
      this.anime.imagem, 'http://borntoplay.com.br/aplicativo/meganimes')
      .then(success => {
        console.log('sucesso: ', success)
      })
      .catch(err => {
        console.log('erro: ', err)
      })
  }

  abrirSinopse(event) {
    let anime = this.anime;
    let profileModal = this.modalCtrl.create(ModalAnimePage, { anime });
    profileModal.present();
  }

  numTemporada(numTemporadas) {
    this.temporadas = [];
    for (let i = 0; i < numTemporadas; ++i) {
      this.temporadas.push(i + 1)
    }
    return this.temporadas;
  }

  carregarEpisodios(idAnime, temporada) {
    this.episodioService.getEpisodios(idAnime, temporada).then(data => {
      this.episodios = data;
      //verifica se o array de episodios ta vazio
      data != null ? this.hasEpisodes = true : this.hasEpisodes = false;
    })
  }

  abrirEpisodio(episodio, i) {
    if (0) {
      this.alertCtrl.showCofirm('Atenção!!', 'Você deseja executar esse episódio?', 'Não', 'Sim', (res) => {
        if (res == 0) {
          return;
        } else {
          let mediaInfo = new chrome.cast.media.MediaInfo(episodio.video, 'video/mp4');
          mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
          mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
          mediaInfo.metadata.title = episodio.nome;
          mediaInfo.metadata.subtitle = episodio.sub_titulo;
          mediaInfo.metadata.images = [
            { 'url': episodio.imagem }];

          let request = new chrome.cast.media.LoadRequest(mediaInfo);

          apiSession.loadMedia(request, this.successLoadMedia(), this.errorLoadMedia(chrome.cast.Error));
          this.irParaEpisodio(episodio, i);
        }
      })
    } else {
      this.irParaEpisodio(episodio, i);
    }
  }

  irParaEpisodio(episodio, i) {
    let anime = this.anime;
    this.navCtrl.push(EpisodioPage, { episodio, anime, id: episodio.id, index: i, episodios: this.episodios });
  }

  successLoadMedia() {
    console.log('Load succeed');
  }

  errorLoadMedia(err) {
    console.log('Error code: ' + err);
  }
}
