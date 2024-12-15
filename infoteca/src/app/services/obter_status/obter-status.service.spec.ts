import { TestBed } from '@angular/core/testing';

import { ObterStatusService } from './obter-status.service';

describe('ObterStatusService', () => {
  let service: ObterStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObterStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
