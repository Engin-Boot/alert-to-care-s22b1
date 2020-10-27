import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BedConfig } from '../models/bed-config.model';

@Injectable({
  providedIn: 'root'
})
export class BedConfigService {

  httpClient:HttpClient;
  baseUrl:string= "https://localhost:44369/api/BedConfiguration";
  constructor(httpClient:HttpClient) {
 
    this.httpClient=httpClient;
   }

   addBedConfigData(bedConfigData)
   {
      let observableStream=this.httpClient.post<BedConfig>(this.baseUrl,bedConfigData);
      //.log(observableStream);

      return observableStream;
   }
}
