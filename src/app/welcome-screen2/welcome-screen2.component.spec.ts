import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeScreen2Component } from './welcome-screen2.component';

describe('WelcomeScreen2Component', () => {
  let component: WelcomeScreen2Component;
  let fixture: ComponentFixture<WelcomeScreen2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeScreen2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeScreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
