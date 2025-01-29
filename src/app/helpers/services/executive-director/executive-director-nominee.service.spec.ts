import { TestBed } from '@angular/core/testing';

import { ExecutiveDirectorNomineeService } from './executive-director-nominee.service';

describe('ExecutiveDirectorNomineeService', () => {
  let service: ExecutiveDirectorNomineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutiveDirectorNomineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
