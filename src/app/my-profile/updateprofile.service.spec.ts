import { TestBed, inject } from '@angular/core/testing';

import { UpdateprofileService } from './updateprofile.service';

describe('UpdateprofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateprofileService]
    });
  });

  it('should be created', inject([UpdateprofileService], (service: UpdateprofileService) => {
    expect(service).toBeTruthy();
  }));
});
