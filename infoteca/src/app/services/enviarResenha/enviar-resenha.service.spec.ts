import { TestBed } from '@angular/core/testing';

import { EnviarResenhaService } from './enviar-resenha.service';

describe('EnviarResenhaService', () => {
  let service: EnviarResenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarResenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
