import { TestBed } from '@angular/core/testing';
import { BedConfigService } from './bed-config.service';
import { BedConfig } from '../models/bed-config.model';
import {BedData} from '../models/bed-data';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BedConfigService', () => {
  let service: BedConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ BedData, BedConfigService, BedConfig ],
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(BedConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
