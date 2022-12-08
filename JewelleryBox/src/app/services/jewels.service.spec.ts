import { TestBed } from '@angular/core/testing';

import { JewelsService } from './jewels.service';

describe('JewelsService', () => {
  let service: JewelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JewelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
