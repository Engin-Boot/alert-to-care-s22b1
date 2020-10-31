import { TestBed } from '@angular/core/testing';
import {PatientData} from '../models/patient-data';
import { PatientDataService } from './patient-data.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('PatientDataService', () => {
  let service: PatientDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let patientData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PatientData ],
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PatientDataService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('should get patient data with id P1', () => {
    const expectedData = {patientID: 'P1',
    name: 'Shivani Bollabattin',
    dateOfBirth: '1998-10-21',
    mobileNumber: '9174661167',
    spo2: 'unstable',
    bpm: 'unstable',
    bedID: 'B2111'
    };
    
    service.getPatientDataById('P1').subscribe(
      data => {
        patientData = data;
      }
    );
    expect(patientData).toEqual(expectedData);

  });*/


});
