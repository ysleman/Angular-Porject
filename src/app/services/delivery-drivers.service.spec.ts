import { TestBed } from '@angular/core/testing';

import { DeliveryDriversService } from './delivery-drivers.service';

describe('DeliveryDriversService', () => {
  let service: DeliveryDriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryDriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
