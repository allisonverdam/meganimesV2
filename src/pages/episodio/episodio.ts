import * as localforage from 'localforage';
import { EpisodioService } from './../../providers/episodio-service';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { meuChromecast } from './../../assets/js/meuChromecast';
// import { StatusBar, ScreenOrientation } from 'ionic-native';

declare var chrome, window, document, screen, videojs, WebTorrent;

/*
  Generated class for the Episodio page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
@Component({
  selector: 'page-episodio',
  templateUrl: 'episodio.html',
  providers: [EpisodioService]
})
export class EpisodioPage {
  episodio;
  anime;
  meuchromecast: meuChromecast;
  torrent;

  constructor(public navCtrl: NavController, public params: NavParams, public episodioService: EpisodioService) {
    // StatusBar.hide();
    // ScreenOrientation.lockOrientation('landscape');

    this.episodio = params.data.episodio;
    this.anime = params.data.anime;
    this.meuchromecast = new meuChromecast();
  }

  ionViewWillEnter() {

  }

  removerPlayer() {
    console.log('saiu do ep')
    let qtdPlayers = document.getElementsByClassName('player').length;
    for (let i = 0; i < qtdPlayers; i++) {
      // videojs('my-player').dispose();
      if (document.getElementsByClassName('player')[i].firstElementChild != null)
        document.getElementsByClassName('player')[i].removeChild(document.getElementsByClassName('player')[i].firstElementChild);
    }
  }

  viewWillUnload() {
    this.removerPlayer();
  }

  ionViewDidLoad() {
    this.carregarEpisodio();

    //faz o botao do chromecast aparecer
    if (chrome.cast) {
      if (document.getElementsByClassName('vjs-chromecast-button')[0] != null)
        document.getElementsByClassName('vjs-chromecast-button')[0].classList.remove('vjs-hidden');
    }
  }

  carregarEpisodio() {
    let episodio;
    if (this.params.data.episodio != null) {
      this.atualizarDadosEpisodio(this.params.data.episodio);
    } else {
      this.carregaEpisodioAPI().subscribe(data => {
        this.atualizarDadosEpisodio(data.json());
      });
    }
  }

  atualizarDadosEpisodio(episodio) {
    this.episodio = episodio;
    this.configurarPlayer();
  }

  carregaEpisodioAPI() {
    return this.episodioService.getEpisodio(this.params.get('id') || this.params.data.id);
  }

  ionViewWillLeave() {
    this.removerPlayer();
    window.screen.orientation.lock("portrait");
    window.screen.orientation.unlock();
    window.screen.unlockOrientation ? window.screen.unlockOrientation() : false;
    // ScreenOrientation.unlockOrientation();
    // StatusBar.show();
    //console.log("saindo da view de episodio");
  }

  configurarPlayer() {

    // video-js vjs-default-skin vjs-big-play-centered
    if (document.getElementsByClassName('player')[0].children.length > 0) {
      let playerDIV = document.getElementsByClassName('player');
      // videojs(document.querySelector('video')).dispose();
      this.inserirPlayer(playerDIV);
    } else if (document.getElementsByClassName('player')[document.getElementsByClassName('player').length - 1].children.length > 0) {
      let playerDIV = document.getElementsByClassName('player');
      // videojs(document.querySelector('video')).dispose();
      this.inserirPlayer(playerDIV);
    } else {
      let playerDIV = document.getElementsByClassName('player');
      this.inserirPlayer(playerDIV);
    }
  }

  inserirPlayer(playerDIV) {
    console.log('this.episodio.video', this.episodio.video)
    console.log('Achou?', this.episodio.video.indexOf("magnet:?") != -1)
    if (this.episodio.video.indexOf("magnet:?") != -1) {
      if (WebTorrent.WEBRTC_SUPPORT) {
        console.log('entrou no webtorrent')
        var client = new WebTorrent();
        client.add(this.episodio.video, (torrent) => {
          // Stream the file in the browser

          window.torrent = torrent;
          this.torrent = torrent.files[0];
          console.log('torrent:', torrent.files[0])

          playerDIV[playerDIV.length - 1].innerHTML =
            `
            <video id="my-player" class="video-js vjs-default-skin vjs-big-play-centered" controls poster="`+ this.episodio.imagem + `" data-setup='{"fluid": true}'
            src="" type="video/mp4">
            <source src="" type="video/mp4">
            </video>
          `;

          this.playerVideoJS();
        });
      }
    } else {
      playerDIV[playerDIV.length - 1].innerHTML =
        `
      <video id="my-player" class="video-js vjs-default-skin vjs-big-play-centered" controls poster="`+ this.episodio.imagem + `" data-setup='{"fluid": true}'
      src="`+ this.episodio.video + `" type="video/mp4">
      <source src="`+ this.episodio.video + `" type="video/mp4">
      </video>
    `;

      this.playerVideoJS();
    }

  }

  playerVideoJS() {
    let player = videojs(document.querySelector('video'), {
      language: 'pt',
      appId: 'CC1AD845',
      poster: this.episodio.imagem,
      src: this.episodio.video,
      metadata: {
        title: this.episodio.nome,
        subtitle: this.episodio.sub_titulo,
      },
      plugins: {
        chromecast: {
          appId: "CC1AD845",
          metadata: {
            title: this.episodio.nome,
            subtitle: this.episodio.sub_titulo,
          }
        }
      }
    });

    if (document.querySelector('video') && this.episodio.video.indexOf("magnet:?") != -1) {
      console.log('fez')
      this.torrent.renderTo('video');
    }

    player.seekButtons({ back: 30, forward: 30 });

    document.getElementById('my-player').src = document.querySelector('video').src;

    var aspectRatio = 9 / 16; // AR 16:9
    function resizeVideoJs() {
      // Get the parent element's actual width
      var width = document.getElementById(player.id()).parentElement.offsetWidth;
      // Set my width to fill parent element, set my calculated height
      player.width(width).height(width * aspectRatio);
    }
    resizeVideoJs(); // Initialize the function right now
    window.onresize = resizeVideoJs; // Call the function on resize

    player.on('fullscreenchange', function (e) {
      var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

      if (isFullScreen) {
        window.screen.orientation.lock("landscape");
        window.screen.lockOrientation ? window.screen.lockOrientation('landscape') : false;

      } else {
        window.screen.unlockOrientation ? window.screen.unlockOrientation() : false;
      }

    });
  }
}
