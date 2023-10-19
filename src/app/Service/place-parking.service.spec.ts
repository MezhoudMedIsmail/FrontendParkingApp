import { TestBed } from '@angular/core/testing';

import { PlaceParkingService } from './place-parking.service';

describe('PlaceParkingService', () => {
  let service: PlaceParkingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceParkingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
