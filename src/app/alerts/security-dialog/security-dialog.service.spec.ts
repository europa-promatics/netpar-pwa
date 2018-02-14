import { TestBed, inject } from '@angular/core/testing';

import { SecurityDialogService } from './security-dialog.service';

describe('SecurityDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityDialogService]
    });
  });

  it('should be created', inject([SecurityDialogService], (service: SecurityDialogService) => {
    expect(service).toBeTruthy();
  }));
});
