import { TestBed, inject } from '@angular/core/testing';

import { FetchSectionsService } from './fetch-sections.service';

describe('FetchSectionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchSectionsService]
    });
  });

  it('should be created', inject([FetchSectionsService], (service: FetchSectionsService) => {
    expect(service).toBeTruthy();
  }));
});
