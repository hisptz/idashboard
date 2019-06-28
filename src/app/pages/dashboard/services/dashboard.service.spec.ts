import { DashboardService } from './dashboard.service';
import { TestBed } from '@angular/core/testing';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

describe('DashboardService', () => {
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
      providers: [DashboardService]
    })
  );

  it('should be created', () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });
});
