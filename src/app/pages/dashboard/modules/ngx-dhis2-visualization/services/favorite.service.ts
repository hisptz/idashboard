import { Injectable } from '@angular/core';
import {
  NgxDhis2HttpClientService,
  SystemInfo,
  User
} from '@iapps/ngx-dhis2-http-client';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { getFavoriteUrl } from '../../../helpers/get-favorite-url.helper';
import { DashboardPreferences } from '../../../models/dashboard-preferences.model';
import { getNewFavoritePayload } from '../helpers/get-new-favorite-payload.helper';

const favoriteDataStoreNamespace = 'dataStore/favorites/';

@Injectable()
export class FavoriteService {
  constructor(private http: NgxDhis2HttpClientService) {}

  get(payload: {
    id: string;
    type: string;
    systemInfo: SystemInfo;
    currentUser: User;
    dashboardPreferences: DashboardPreferences;
    isNew?: boolean;
  }) {
    const {
      id,
      type,
      dashboardPreferences,
      isNew,
      systemInfo,
      currentUser
    } = payload;
    const favoriteUrl = getFavoriteUrl({ id, type });
    if (!favoriteUrl) {
      return of(null);
    }

    if (isNew) {
      return of(getNewFavoritePayload({ id, type, systemInfo, currentUser }));
    }

    switch (dashboardPreferences.favoriteSource) {
      case 'DATASTORE':
        return this._getFromDataStore(id);
      case 'BOTH':
        return forkJoin(
          this._getFromApi(favoriteUrl),
          this._getFromDataStore(id).pipe(catchError(() => of(null)))
        ).pipe(
          map((res: any[]) => {
            return { ...(res[0] || {}), ...(res[1] || {}) };
          })
        );
      default:
        return this._getFromApi(favoriteUrl);
    }
  }

  private _getFromDataStore(id: string) {
    return this.http.get(favoriteDataStoreNamespace + id);
  }

  private _getFromApi(url: string) {
    return this.http.get(url);
  }
}
