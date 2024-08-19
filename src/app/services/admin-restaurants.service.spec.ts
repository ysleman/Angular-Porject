import { TestBed } from '@angular/core/testing';

import { AdminRestaurantsService } from './admin-restaurants.service';

describe('AdminRestaurantsService', () => {
  let service: AdminRestaurantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRestaurantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
