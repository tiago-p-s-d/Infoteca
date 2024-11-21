import { TestBed } from '@angular/core/testing';

import { ObterLivrosService } from './obter-livros.service';

describe('ObterLivrosService', () => {
  let service: ObterLivrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObterLivrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
