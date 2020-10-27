import { TestBed } from '@angular/core/testing';

import { BedConfigService } from './bed-config.service';

describe('BedConfigService', () => {
  let service: BedConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
