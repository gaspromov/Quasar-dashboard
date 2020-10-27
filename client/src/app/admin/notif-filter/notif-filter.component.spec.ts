import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifFilterComponent } from './notif-filter.component';

describe('NotifFilterComponent', () => {
  let component: NotifFilterComponent;
  let fixture: ComponentFixture<NotifFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
