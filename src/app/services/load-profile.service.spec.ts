import { TestBed } from '@angular/core/testing';

import { LoadProfileService } from './load-profile.service';

describe('LoadProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadProfileService = TestBed.get(LoadProfileService);
    expect(service).toBeTruthy();
  });
});
