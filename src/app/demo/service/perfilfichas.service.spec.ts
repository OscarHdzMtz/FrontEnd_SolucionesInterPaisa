import { TestBed } from '@angular/core/testing';

import { PerfilfichasService } from './perfilfichas.service';

describe('PerfilfichasService', () => {
  let service: PerfilfichasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilfichasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
