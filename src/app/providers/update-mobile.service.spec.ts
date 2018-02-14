import { TestBed, inject } from '@angular/core/testing';

import { UpdateMobileService } from './update-mobile.service';

describe('UpdateMobileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateMobileService]
    });
  });

  it('should be created', inject([UpdateMobileService], (service: UpdateMobileService) => {
    expect(service).toBeTruthy();
  }));
});
