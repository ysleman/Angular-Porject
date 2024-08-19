import { TestBed } from '@angular/core/testing';

import { AdminDriversService } from './admin-drivers.service';

describe('AdminDriversService', () => {
  let service: AdminDriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
