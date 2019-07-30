import { TestBed } from '@angular/core/testing';

import { ReportService } from './report.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

describe('ReportService', () => {
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
      ]
    })
  );

  it('should be created', () => {
    const service: ReportService = TestBed.get(ReportService);
    expect(service).toBeTruthy();
  });
});
