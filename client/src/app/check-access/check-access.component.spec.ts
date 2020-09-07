import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAccessComponent } from './check-access.component';

describe('CheckAccessComponent', () => {
  let component: CheckAccessComponent;
  let fixture: ComponentFixture<CheckAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
