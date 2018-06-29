import { TestBed, inject } from '@angular/core/testing';

import { GetJWTService } from './get-jwt.service';

describe('GetJWTService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetJWTService]
    });
  });

  it('should be created', inject([GetJWTService], (service: GetJWTService) => {
    expect(service).toBeTruthy();
  }));
});
