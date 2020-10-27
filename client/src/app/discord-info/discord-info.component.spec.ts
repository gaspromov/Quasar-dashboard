import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordInfoComponent } from './discord-info.component';

describe('DiscordInfoComponent', () => {
  let component: DiscordInfoComponent;
  let fixture: ComponentFixture<DiscordInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscordInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
