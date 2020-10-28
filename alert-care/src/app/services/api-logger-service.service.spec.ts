import { TestBed } from '@angular/core/testing';

import { ApiLoggerServiceService } from './api-logger-service.service';

describe('ApiLoggerServiceService', () => {
  let service: ApiLoggerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLoggerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
