import { TestBed } from '@angular/core/testing';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
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
      providers: [FavoriteService]
    })
  );

  it('should be created', () => {
    const service: FavoriteService = TestBed.get(FavoriteService);
    expect(service).toBeTruthy();
  });
});
