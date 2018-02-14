import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecheckDetailsComponent } from './recheck-details.component';

describe('RecheckDetailsComponent', () => {
  let component: RecheckDetailsComponent;
  let fixture: ComponentFixture<RecheckDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecheckDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecheckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
