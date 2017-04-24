import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import localForage from "localforage";

/*
  Generated class for the FirebaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseService {

  fire = firebase.initializeApp({
    apiKey: "AIzaSyADNxnsGOoC2Cu813aBWa4CFYZlYyOB3PA",
    authDomain: "meganimes-ea530.firebaseapp.com",
    databaseURL: "https://meganimes-ea530.firebaseio.com",
    storageBucket: "meganimes-ea530.appspot.com",
    messagingSenderId: "384650351491"
  })

  constructor() { }

  loginFirebaseWithFacebook(token:any) {
    let provider = firebase.auth.FacebookAuthProvider.credential(token);

    return this.fire.auth().signInWithCredential(provider)
      .then(success => {
        console.log("Success: ", success);
      })
      .catch(err => {
        console.error("Error: ", err);
      })
  }

  carregarFavoritos(user_id:number) {
    let ref = firebase.database().ref('/favoritos/' + user_id);

    ref.once('value')
      .then(snapshot => {
        let favoritos:any = [];
        snapshot.forEach((childSnapshot:any) => {
          favoritos.push(childSnapshot.val());
        });

        localForage.setItem('favoritos', favoritos).then(function () {
          // Do other things once the value has been saved.
          console.log('set fav');
        }).catch(function (err) {
          // This code runs if there were any errors
          console.log('erro:', err);
        })

      })
      .catch(err => {
        console.log("err favoritos", err)
      })
  }

}
