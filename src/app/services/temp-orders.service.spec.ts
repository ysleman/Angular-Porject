import { TestBed } from '@angular/core/testing';

import { TempOrdersService } from './temp-orders.service';

describe('TempOrdersService', () => {
  let service: TempOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
