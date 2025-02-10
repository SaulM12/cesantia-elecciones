import { TestBed } from '@angular/core/testing';

import { CandidateElectionsService } from './candidate-elections.service';

describe('CandidateElectionsService', () => {
  let service: CandidateElectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateElectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
