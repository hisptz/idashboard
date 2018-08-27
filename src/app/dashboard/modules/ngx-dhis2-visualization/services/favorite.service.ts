import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';

import { getFavoriteUrl } from '../helpers';
import { map, catchError } from 'rxjs/operators';
import { FavoriteConfiguration } from '../models/favorite-configurations.model';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  constructor(private http: NgxDhis2HttpClientService) {}

  getFavorite(
    favorite: { id: string; type: string },
    configurations: FavoriteConfiguration = {
      useDataStoreAsSource: false,
      useBothSources: true
    },
    namespace: string = 'favorites'
  ): Observable<any> {
    return configurations.useDataStoreAsSource
      ? this.getFromDataStore(namespace, favorite.id)
      : configurations.useBothSources
        ? forkJoin(
            this.getFromApi(favorite),
            this.getFromDataStore(namespace, favorite.id).pipe(
              catchError(() => of({}))
            )
          ).pipe(
            map((favoriteResults: any[]) => {
              return { ...favoriteResults[0], ...favoriteResults[1] };
            })
          )
        : this.getFromApi(favorite);
  }

  getFromDataStore(namespace: string, favoriteId: string) {
    return this.http.get(`dataStore/${namespace}/${favoriteId}`);
  }

  getFromApi(favorite: any) {
    const favoriteUrl = getFavoriteUrl(favorite);
    return favoriteUrl !== '' ? this.http.get(favoriteUrl) : of(null);
  }

  create(favoriteUrl: string, favorite: any) {
    return this.http.post(favoriteUrl, favorite).pipe(map(() => favorite));
  }

  update(favoriteUrl: string, favorite: any) {
    return this.http
      .put(`${favoriteUrl}/${favorite.id}`, favorite)
      .pipe(map(() => favorite));
  }

  delete(favoriteId: string, favoriteType: string) {
    return this.http.delete(`${favoriteType}s/${favoriteId}`);
  }
}
