import { TestBed } from '@angular/core/testing';

import { ElectionAuthorityService } from './election-authority.service';

describe('ElectionAuthorityService', () => {
  let service: ElectionAuthorityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectionAuthorityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
