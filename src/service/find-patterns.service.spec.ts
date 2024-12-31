import { TestBed } from '@angular/core/testing';

import { FindPatternsService } from './find-patterns.service';

describe('FindPatternsService', () => {
  let service: FindPatternsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindPatternsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
