import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadedImageComponent } from './downloaded-image.component';

describe('DownloadedImageComponent', () => {
  let component: DownloadedImageComponent;
  let fixture: ComponentFixture<DownloadedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadedImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
