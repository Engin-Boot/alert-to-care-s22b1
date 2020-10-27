import { TestBed } from '@angular/core/testing';

import { BedDataService } from './bed-data.service';

describe('BedDataService', () => {
  let service: BedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
