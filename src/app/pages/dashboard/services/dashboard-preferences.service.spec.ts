import { TestBed } from '@angular/core/testing';

import { DashboardPreferencesService } from './dashboard-preferences.service';

describe('DashboardPreferencesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [DashboardPreferencesService]
    })
  );

  it('should be created', () => {
    const service: DashboardPreferencesService = TestBed.get(
      DashboardPreferencesService
    );
    expect(service).toBeTruthy();
  });
});
