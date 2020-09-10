import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuccessComponent } from './new-success.component';

describe('NewSuccessComponent', () => {
  let component: NewSuccessComponent;
  let fixture: ComponentFixture<NewSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
