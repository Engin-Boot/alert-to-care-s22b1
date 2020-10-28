import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLoggerServiceService {

  constructor() { }

  write(message:string){
  
      console.log(`Api Logging ${message} `);
    }
  
}
