import { TestBed } from '@angular/core/testing';

import { UserRolesGuard } from './user-roles.guard';

describe('UserRolesGuard', () => {
  let guard: UserRolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserRolesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
