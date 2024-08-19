import { TestBed } from '@angular/core/testing';

import { RestaurantOrdersService } from './restaurant-orders.service';

describe('RestaurantOrdersService', () => {
  let service: RestaurantOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
