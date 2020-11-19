import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {
    baseUrl:string = "https://www.ydbweb.com/laravelweb/";    
    //baseUrl:string = "http://192.168.178.42:8383/laravelweb/";  
    baseUrlposts:string = "serv";

  constructor(private httpClient : HttpClient) {}

  getData(wich) {
      return this.httpClient.get(this.baseUrl+ this.baseUrlposts + '/'+wich);
  }
}
