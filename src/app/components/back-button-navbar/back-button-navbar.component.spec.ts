import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonNavbarComponent } from './back-button-navbar.component';

describe('BackButtonNavbarComponent', () => {
  let component: BackButtonNavbarComponent;
  let fixture: ComponentFixture<BackButtonNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackButtonNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
