import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDialog2Component } from './security-dialog2.component';

describe('SecurityDialog2Component', () => {
  let component: SecurityDialog2Component;
  let fixture: ComponentFixture<SecurityDialog2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityDialog2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
