import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { consts } from '../utils/consts';

/*
  Generated class for the Anime provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AnimeService {

  constructor(public http: Http) {
    console.log('Hello Anime Provider');
  }

  getAnimes(pagina:number){
    return this.http.get(consts.baseUrl + '/animes/page/'+pagina)
      .map(res => {
        let json = res.json()

        if(json.length == 0)
          return null      
        else
          return json;
      })
  }

  getAnimesCompletos(pagina:number){
    return this.http.get(consts.baseUrl + '/animesCompletos/page/'+pagina)
      .map(res => {
        let json = res.json()

        if(json.length == 0)
          return null      
        else
          return json;
      })
  }

  getAnimeById(id:number){
    console.log('id', id)
        return this.http.get(consts.baseUrl + '/anime/'+id)
      .map(res => {
        console.log('anime: ',res)
        let json = res.json()
        console.log('json: ', json)

        if(json.length == 0)
          return null      
        else
          return json;
      })
  }

  buscarAnimes(nome:string){
    return this.http.get(consts.baseUrl + '/animes/buscar/'+nome)
      .map(res => {
        console.log('anime: ',res)
        let json = res.json()
        console.log('json: ', json)

        if(json.length == 0)
          return null      
        else
          return json;
      })
  }

}
