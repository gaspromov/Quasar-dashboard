import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowImagesComponent } from './window-images.component';

describe('WindowImagesComponent', () => {
  let component: WindowImagesComponent;
  let fixture: ComponentFixture<WindowImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
