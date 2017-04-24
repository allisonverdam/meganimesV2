import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { APP_BASE_HREF } from '@angular/common';

import { Ionic2RatingModule } from 'ionic2-rating';
// import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AnimePage } from '../pages/anime/anime';
import { AnimesPage } from '../pages/animes/animes';
import { EpisodioPage } from '../pages/episodio/episodio';
import { GenerosPage } from '../pages/generos/generos';
import { GuiaDaSemanaPage } from '../pages/guia-da-semana/guia-da-semana';
import { NoticiasPage } from '../pages/noticias/noticias';
import { ModalAnimePage } from '../pages/modal-anime/modal-anime';
import { AmigosPage } from '../pages/amigos/amigos';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { PerfilPage } from '../pages/perfil/perfil';

// const myFirebaseAuthConfig = {
//   provider: AuthProviders.Facebook,
//   method: AuthMethods.OAuthToken
// }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AnimePage,
    AnimesPage,
    EpisodioPage,
    GenerosPage,
    GuiaDaSemanaPage,
    NoticiasPage,
    ModalAnimePage,
    AmigosPage,
    FavoritosPage,
    PerfilPage
  ],
  imports: [
    BrowserModule,
    Ionic2RatingModule,
    // AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
    IonicModule.forRoot(MyApp, {
      platforms: {
        android: {
          mode: 'ios',
          backButtonText: '',
          backButtonIcon: 'md-arrow-back',
          iconMode: 'md',
          tabsPlacement: 'bottom',
          pageTransition: 'ios'
        }
      }
    },
    {
      links: [
            { component: HomePage, name: 'home', segement: 'home' },
            { component: GenerosPage, name: 'generos', segement: 'generos', defaultHistory: [HomePage] },
            { component: AnimesPage, name: 'animes', segement: 'animes', defaultHistory: [HomePage] },
            { component: AnimesPage, name: 'animes/:tipo', segement: 'animes', defaultHistory: [HomePage] },
            { component: NoticiasPage, name: 'noticias', segement: 'noticias', defaultHistory: [HomePage] },
            { component: AnimePage, name: 'anime/:id', segement: 'anime/:id', defaultHistory: [HomePage] },
            { component: GuiaDaSemanaPage, name: 'guiadasemana', segement: 'guiadasemana', defaultHistory: [HomePage] },
            { component: EpisodioPage, name: 'episodio/:id', segement: 'episodio/:id', defaultHistory: [HomePage] }
        ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AnimePage,
    AnimesPage,
    EpisodioPage,
    GenerosPage,
    GuiaDaSemanaPage,
    NoticiasPage,
    ModalAnimePage,
    AmigosPage,
    FavoritosPage,
    PerfilPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, {provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppModule {}
