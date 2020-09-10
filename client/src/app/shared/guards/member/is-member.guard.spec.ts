import { TestBed } from '@angular/core/testing';

import { IsMemberGuard } from './is-member.guard';

describe('IsMemberGuard', () => {
  let guard: IsMemberGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsMemberGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
