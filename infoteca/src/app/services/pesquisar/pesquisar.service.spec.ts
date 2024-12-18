import { TestBed } from '@angular/core/testing';

import { PesquisarService } from './pesquisar.service';

describe('PesquisarService', () => {
  let service: PesquisarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesquisarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
