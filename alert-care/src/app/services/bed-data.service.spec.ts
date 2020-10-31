import { TestBed } from '@angular/core/testing';
import {BedData} from '../models/bed-data';
import {PatientData} from '../models/patient-data';
import { BedDataService } from './bed-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BedDataService', () => {
  let service: BedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ BedData, PatientData ],
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(BedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
