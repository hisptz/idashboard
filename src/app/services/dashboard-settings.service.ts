import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {
  NgxDhis2HttpClientService,
  ManifestService,
  Manifest
} from '@hisptz/ngx-dhis2-http-client';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';
import { AppConfigurationsService } from './app-configurations.service';

@Injectable({ providedIn: 'root' })
export class DashboardSettingsService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private manifestService: ManifestService,
    private appConfigurationService: AppConfigurationsService
  ) {}

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
        const namespace = 'who-malaria';
        return this.loadDashboardSettings().pipe(
          mergeMap((dashboardSettingsList: Array<string>) => {
            return dashboardSettingsList.indexOf(namespace) !== -1
              ? this.httpClient
                  .get(`dataStore/dashboard-settings/${namespace}`)
                  .pipe(
                    map((dashboardSettings: any) => dashboardSettings),
                    catchError((error: any) => of(null))
                  )
              : of(null);
          }),
          catchError((error: any) => of(null))
        );
      }),
      catchError((error: any) => of(null))
    );
  }

  loadDashboardSettings(): Observable<any> {
    return new Observable(observer => {
      this.httpClient.get('dataStore/dashboard-settings').subscribe(
        dashboardSettingsList => {
          observer.next(dashboardSettingsList);
          observer.complete();
        },
        () => {
          this.appConfigurationService.initateAppConfigurations().subscribe(
            dashboardSettings => {
              observer.next(Object.keys(dashboardSettings));
              observer.complete();
            },
            error => {
              console.log({ error });
            }
          );
        }
      );
    });
  }
}
