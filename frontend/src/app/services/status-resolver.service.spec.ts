import { TestBed } from '@angular/core/testing';

import { StatusResolverService } from './status-resolver.service';

describe('StatusResolverService', () => {
  let service: StatusResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
