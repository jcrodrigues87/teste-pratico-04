import { TestBed } from '@angular/core/testing';

import { BuscaCepService } from './busca-cep.service';

describe('BuscaCepService', () => {
  let service: BuscaCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
