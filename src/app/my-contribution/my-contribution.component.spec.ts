import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContributionComponent } from './my-contribution.component';

describe('MyContributionComponent', () => {
  let component: MyContributionComponent;
  let fixture: ComponentFixture<MyContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
