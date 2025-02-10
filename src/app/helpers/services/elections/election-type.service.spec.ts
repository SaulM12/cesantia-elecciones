import { TestBed } from '@angular/core/testing';

import { ElectionTypeService } from './election-type.service';

describe('ElectionTypeService', () => {
  let service: ElectionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
