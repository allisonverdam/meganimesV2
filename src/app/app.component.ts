import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, Deeplinks } from 'ionic-native';

import localForage from "localforage";
// import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { HomePage } from '../pages/home/home';
import { GenerosPage } from '../pages/generos/generos';
import { AnimePage } from '../pages/anime/anime';
import { AnimesPage } from '../pages/animes/animes';
import { AmigosPage } from '../pages/amigos/amigos';
import { PerfilPage } from '../pages/perfil/perfil';
import { LoginService } from '../providers/login-service';
import { FirebaseService } from '../providers/firebase-service';
import * as firebase from 'firebase';

localForage.config({
  driver: localForage.LOCALSTORAGE,
  name: 'meganimesDB',
  storeName: 'database'
})



@Component({
  templateUrl: 'app.html',
  providers: [LoginService, FirebaseService]
})
export class MyApp {
  rootPage: any = HomePage;
  favoritos;
  user;

  @ViewChild(Nav) nav: Nav;

  //public af: AngularFire,

  constructor(private platform: Platform, private loginService: LoginService, private firebaseService: FirebaseService) {
    platform.ready().then(() => {

      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#000');
    })
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      Splashscreen.hide();

      // Deeplinks.routeWithNavController(this.nav, {
      //   '/generos': GenerosPage,
      //   '/animes': AnimesPage,
      //   '/anime/:id': AnimePage
      // }).subscribe((match) => {
      //   console.log('Successfully routed', match);
      // }, (nomatch) => {
      //   this.nav.setRoot(HomePage);
      //   console.warn('Unmatched Route', nomatch);
      // })
    })

    console.log('iniciou o app')
    let self = this;
    // pegar dados do user do banco
    // Callback version:
    localForage.getItem('user').then(function (value) {
      // This code runs once the value has been loaded
      // from the offline store.
      self.user = value;
      console.log(value);
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });

  }

  logout() {
    this.user = null;
    localForage.clear().then(function () {
      // Run this code once the key has been removed.
      console.log('Key is cleared!');
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });

    // firebase.auth().signOut().then(() => {
    //   console.log('deslogou')
    // }).catch(err => {
    //   console.log('erro ao deslogar', err)
    // })
  }

  openAmigos() {
    this.nav.push(AmigosPage);
  }

  abrirPerfil() {
    this.nav.push(PerfilPage);
  }


  loginFacebook() {
    let self = this;
    this.loginService.autenticar(data => {
      console.log('data', data)
      this.firebaseService.loginFirebaseWithFacebook(data.accessToken).then(() => {
        this.firebaseService.carregarFavoritos(data.userID);
      })

      this.loginService.getDados(data, response => {
        localForage.setItem('amigos', response.friends.data).then(function () {
          // Run this code once the key has been removed.
          console.log('Key is cleared!');
        }).catch(function (err) {
          // This code runs if there were any errors
          console.log(err);
        });

        console.log("Facebook success: " + JSON.stringify(data));
        //salva os dados do facebook no objeto do user
        let user = response;
        self.user = user;

        /*
        this.favoritos = this.af.database.list('/favoritos/'+self.user.id).map(result => {
          console.log('executou a parada do favorito')
          console.log('result fav:', result)
          self.favoritos = result;
          localForage.setItem('favoritos', result).then(function () {
              // Do other things once the value has been saved.
              console.log('set fav maneiro');
          }).catch(function(err) {
              // This code runs if there were any errors
              console.log('erro:',err);
          })
          
        }).subscribe(value => {
          console.log('valor da parada:', value)
        })
        */

        // salva os dados do user no banco
        localForage.setItem('user', user).then(function (value) {
          // Do other things once the value has been saved.
          console.log('set item fb', value);
        }).catch(function (err) {
          // This code runs if there were any errors
          console.log(err);
        })
      })
    }, err => {
      console.log('erro login', err)
    })
  }

}
