import { TestBed } from '@angular/core/testing';

import { ExecutiveDirectorVoteService } from './executive-director-vote.service';

describe('ExecutiveDirectorVoteService', () => {
  let service: ExecutiveDirectorVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutiveDirectorVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
