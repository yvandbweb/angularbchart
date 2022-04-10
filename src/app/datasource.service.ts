import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {
    //baseUrl:string = "http://localhost:8585/laravelweb/public/index.php/";
    baseUrl:string = "https://ydbweb.com/laravelweb/public/index.php/";
    baseUrlposts:string = "serv";

  constructor(private httpClient : HttpClient) {}

  getData(wich) {
      return this.httpClient.get(this.baseUrl+ this.baseUrlposts + '/'+wich);
  }
}
