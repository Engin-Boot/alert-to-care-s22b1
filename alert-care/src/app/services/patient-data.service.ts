import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {PatientData} from '../models/patient-data';

@Injectable({
  providedIn: 'root'
})

export class PatientDataService {
 httpClient: HttpClient;
baseUrl: string = 'https://localhost:5001/api/PatientData/';

  constructor(httpClient: HttpClient) { 
    this.httpClient = httpClient;
  }

  getPatientDataById(id)
  {
    let observableStream = this.httpClient.get<PatientData>(this.baseUrl+id);
    return observableStream;
  }

  postPatientData(patientData)
  {
    let observableStream = this.httpClient.post(this.baseUrl,patientData);
    return observableStream;
  }

  updatePatientData(id,patientData)
  {
    let observableStream = this.httpClient.put(this.baseUrl+id,patientData);
    return observableStream;
  }

  deletePatientData(id)
  {
    let observableStream = this.httpClient.delete(this.baseUrl+id);
    return observableStream;
  }
}
