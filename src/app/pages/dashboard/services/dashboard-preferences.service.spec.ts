import { TestBed } from '@angular/core/testing';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

import { DashboardPreferencesService } from './dashboard-preferences.service';

describe('DashboardPreferencesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        NgxDhis2HttpClientModule.forRoot({
          namespace: 'iapps',
          version: 1,
          models: {
            users: 'id'
          }
        })
      ],
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
