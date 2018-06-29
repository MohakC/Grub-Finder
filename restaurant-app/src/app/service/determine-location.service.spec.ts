import { TestBed, inject } from '@angular/core/testing';

import { DetermineLocationService } from './determine-location.service';

describe('DetermineLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetermineLocationService]
    });
  });

  it('should be created', inject([DetermineLocationService], (service: DetermineLocationService) => {
    expect(service).toBeTruthy();
  }));
});
