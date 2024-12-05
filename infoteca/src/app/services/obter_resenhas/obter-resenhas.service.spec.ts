import { TestBed } from '@angular/core/testing';

import { ObterResenhasService } from './obter-resenhas.service';

describe('ObterResenhasService', () => {
  let service: ObterResenhasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObterResenhasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
