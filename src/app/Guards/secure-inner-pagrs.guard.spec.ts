import { TestBed } from '@angular/core/testing';

import { SecureInnerPagrsGuard } from './secure-inner-pagrs.guard';

describe('SecureInnerPagrsGuard', () => {
  let guard: SecureInnerPagrsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureInnerPagrsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
