import { TestBed } from '@angular/core/testing';

import { SelecionarService } from './selecionar.service';

describe('SelecionarService', () => {
  let service: SelecionarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelecionarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
