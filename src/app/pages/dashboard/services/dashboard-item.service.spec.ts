import { DashboardItemService } from './dashboard-item.service';
import { TestBed } from '@angular/core/testing';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

describe('DashboardItemService', () => {
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
      providers: [DashboardItemService]
    })
  );

  it('should be created', () => {
    const service: DashboardItemService = TestBed.get(DashboardItemService);
    expect(service).toBeTruthy();
  });
});
