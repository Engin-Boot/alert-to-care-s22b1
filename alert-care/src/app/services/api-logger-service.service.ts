import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLoggerServiceService {

  constructor() { }

  write(message: string): void{
      console.log(`Api Logging ${message} `);
    }
  
}
