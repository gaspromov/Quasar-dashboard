import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutWidgetComponent } from './checkout-widget.component';

describe('CheckoutWidgetComponent', () => {
  let component: CheckoutWidgetComponent;
  let fixture: ComponentFixture<CheckoutWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
