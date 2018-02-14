import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationBoxesComponent } from './validation-boxes.component';

describe('ValidationBoxesComponent', () => {
  let component: ValidationBoxesComponent;
  let fixture: ComponentFixture<ValidationBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
