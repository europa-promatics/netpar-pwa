import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingUserCheckComponent } from './existing-user-check.component';

describe('ExistingUserCheckComponent', () => {
  let component: ExistingUserCheckComponent;
  let fixture: ComponentFixture<ExistingUserCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingUserCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingUserCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
