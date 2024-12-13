import { TestBed } from '@angular/core/testing';

import { AdicionarStatusService } from './adicionar-status.service';

describe('AdicionarStatusService', () => {
  let service: AdicionarStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdicionarStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
