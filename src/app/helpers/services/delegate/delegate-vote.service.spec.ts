import { TestBed } from '@angular/core/testing';

import { DelegateVoteService } from './delegate-vote.service';

describe('DelegateVoteService', () => {
  let service: DelegateVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelegateVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
