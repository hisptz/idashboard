import { Injectable } from '@angular/core';
import {
  NgxDhis2HttpClientService,
  SystemInfo,
  User
} from '@iapps/ngx-dhis2-http-client';
import { omit, pick } from 'lodash';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { getFavoriteUrl } from '../../../helpers/get-favorite-url.helper';
import { DashboardPreferences } from '../../../models/dashboard-preferences.model';
import { getNewFavoritePayload } from '../helpers/get-new-favorite-payload.helper';
import { Favorite } from '../models/favorite.model';

const favoriteDataStoreNamespace = 'dataStore/favorites';

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

  save(
    favorite: Favorite,
    dashboardPreferences: DashboardPreferences,
    favoriteType: string,
    action: string
  ) {
    switch (dashboardPreferences.favoriteSource) {
      case 'DATASTORE':
        return this._saveToDataStore(favorite, action);
      case 'BOTH':
        return this._saveToBoth(
          favorite,
          dashboardPreferences,
          favoriteType,
          action
        );
      default:
        return this._saveToApi(
          omit(favorite, dashboardPreferences.customAttributes || []),
          favoriteType,
          action
        );
    }
  }

  private _saveToDataStore(favorite: Favorite, action: string) {
    if (!favorite) {
      return throwError({
        status: 400,
        statusText: 'Error',
        message: 'Favorite object could not be identified'
      });
    }
    return (action === 'CREATE'
      ? this.http.post(`${favoriteDataStoreNamespace}/${favorite.id}`, favorite)
      : this.http.put(`${favoriteDataStoreNamespace}/${favorite.id}`, favorite)
    ).pipe(map(() => favorite));
  }

  private _saveToBoth(
    favorite: Favorite,
    dashboardPreferences: DashboardPreferences,
    favoriteType: string,
    action: string
  ) {
    return forkJoin(
      this._saveToApi(
        omit(favorite, dashboardPreferences.customAttributes || []),
        favoriteType,
        action
      ),
      this._saveToDataStore(
        pick(favorite, dashboardPreferences.customAttributes || []),
        action
      )
    ).pipe(map(() => favorite));
  }

  private _saveToApi(favorite: Favorite, type: string, action: string) {
    if (!favorite) {
      return throwError({
        status: 400,
        statusText: 'Error',
        message: 'Favorite object could not be identified'
      });
    }
    return (action === 'CREATE'
      ? this.http.post(`${type}s.json`, favorite)
      : this.http.put(`${type}s/${favorite.id}.json`, favorite)
    ).pipe(map(() => favorite));
  }

  private _getFromDataStore(id: string) {
    return this.http.get(`${favoriteDataStoreNamespace}/${id}`);
  }

  private _getFromApi(url: string) {
    return this.http.get(url);
  }
}
