import { TestBed } from '@angular/core/testing';

import { AutoCompleteSearchService } from './auto-complete-search.service';

describe('AutoCompleteSearchService', () => {
  let service: AutoCompleteSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoCompleteSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
