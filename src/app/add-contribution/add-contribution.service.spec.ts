import { TestBed, inject } from '@angular/core/testing';

import { AddContributionService } from './add-contribution.service';

describe('AddContributionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddContributionService]
    });
  });

  it('should be created', inject([AddContributionService], (service: AddContributionService) => {
    expect(service).toBeTruthy();
  }));
});
