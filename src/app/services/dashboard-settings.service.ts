import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {
  NgxDhis2HttpClientService,
  ManifestService,
  Manifest
} from '@hisptz/ngx-dhis2-http-client';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { forkJoin, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardSettingsService {
  private _dataStoreUrl: string;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private manifestService: ManifestService
  ) {
    this._dataStoreUrl = 'dataStore/dashboard-settings';
  }

  loadAll() {
    return this.manifestService.getManifest().pipe(
      mergeMap((manifestObject: any) => {
        // const namespace =
        //   manifestObject &&
        //   manifestObject.activities &&
        //   manifestObject.activities.dhis
        //     ? manifestObject.activities.dhis.namespace
        //     : 'default';
        // TODO FIND DYNAMIC WAY
        const namespace = 'nmcp-malaria';
        return this.httpClient.get('dataStore/dashboard-settings').pipe(
          mergeMap((dashboardSettingsList: Array<string>) => {
            return dashboardSettingsList.indexOf(namespace) !== -1
              ? this.httpClient
                  .get(`dataStore/dashboard-settings/${namespace}`)
                  .pipe(
                    map((dashboardSettings: any) => dashboardSettings),
                    catchError((error: any) => of(null))
                  )
              : this.create(namespace);
          }),
          catchError((error: any) => {
            if (error.status !== 404) {
              return throwError(error);
            }

            return this.create(namespace);
          })
        );
      }),
      catchError((error: any) => of(null))
    );
  }

  create(namespace: string) {
    // TODO FIND A GENERIC WAY TO CREATE DASHBOARD PREFERENCES
    const dashboardSettings = {
      id: namespace,
      useDataStoreAsSource: true,
      allowAdditionalAttributes: true,
      additionalAttributes: ['globalSelections']
    };
    return this.httpClient
      .post(`${this._dataStoreUrl}/${namespace}`, dashboardSettings)
      .pipe(map(() => dashboardSettings));
  }
}
