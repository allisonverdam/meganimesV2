import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { consts } from '../utils/consts';

/*
  Generated class for the EpisodioService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EpisodioService {

  constructor(public http: Http) {
    console.log('Hello EpisodioService Provider');
  }

  getEpisodios(idAnime:number, temporada:number){
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get(consts.baseUrl + '/anime/'+idAnime+'/'+temporada)
        .map(res => {
          let json = res.json()

          if(json.length == 0)
            return null      
          else
            return json;
        })
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);
        });
    });
  }

  getEpisodio(idEpisodio:number){
    return this.http.get(consts.baseUrl + '/episodio/'+idEpisodio);
  }

}
