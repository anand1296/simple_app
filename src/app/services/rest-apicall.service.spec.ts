import { TestBed } from '@angular/core/testing';

import { RestAPICallService } from './rest-apicall.service';

describe('RestAPICallService', () => {
  let service: RestAPICallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestAPICallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
