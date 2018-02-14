import { TestBed, inject } from '@angular/core/testing';

import { SecurityDialog2Service } from './security-dialog2.service';

describe('SecurityDialog2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityDialog2Service]
    });
  });

  it('should be created', inject([SecurityDialog2Service], (service: SecurityDialog2Service) => {
    expect(service).toBeTruthy();
  }));
});
