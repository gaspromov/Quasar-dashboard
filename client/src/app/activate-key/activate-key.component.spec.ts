import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateKeyComponent } from './activate-key.component';

describe('ActivateKeyComponent', () => {
  let component: ActivateKeyComponent;
  let fixture: ComponentFixture<ActivateKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
