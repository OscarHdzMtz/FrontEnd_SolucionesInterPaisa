import { TestBed } from '@angular/core/testing';

import { ServidoreshotspotfichasService } from './servidoreshotspotfichas.service';

describe('ServidoreshotspotfichasService', () => {
  let service: ServidoreshotspotfichasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServidoreshotspotfichasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
