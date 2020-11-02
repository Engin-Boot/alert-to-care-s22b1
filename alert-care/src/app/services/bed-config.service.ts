import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BedConfig } from '../models/bed-config.model';
import {BedData} from '../models/bed-data';

@Injectable({
  providedIn: 'root'
})
export class BedConfigService {

  httpClient: HttpClient;
  baseUrl: string = 'https://localhost:5001/api/BedConfiguration/';

  constructor(httpClient: HttpClient) {
 
    this.httpClient = httpClient;
   }

   addBedConfigData(bedConfigData)
   {
      const observableStream = this.httpClient.post<BedConfig>(this.baseUrl,bedConfigData);
      return observableStream;
   }

   getBedsForGivenBedConfigurationId(id)
   {
     const observableStream = this.httpClient.get<BedData[]>(this.baseUrl+'beds-assigned-for-configuration/'+id);
     return observableStream;
   }
}
