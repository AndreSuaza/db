import { TestBed } from '@angular/core/testing';

import { BattlesService } from './battles.service';

describe('BattlesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BattlesService = TestBed.get(BattlesService);
    expect(service).toBeTruthy();
  });
});
