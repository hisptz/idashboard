import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService, User } from '@iapps/ngx-dhis2-http-client';
import { find, omit, pick } from 'lodash';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { filterDashboardIdsByNamespace } from '../helpers/filter-dashboard-ids-by-namespace.helper';
import { DashboardPreferences } from '../models/dashboard-preferences.model';
import { Dashboard } from '../models/dashboard.model';

const dataStoreNamespace = 'dataStore/dashboards';
const dashboardFileLink = 'dashboard-config/dashboards.json';
const dashboardApiFields =
  'fields=id,name,user[id,name],description,access,created,lastUpdated,favorite,dashboardItems[id,type],favorites&paging=false';
const dashboardApiNamespace = 'dashboards';
@Injectable()
export class DashboardService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getAll(dashboardPreferences: DashboardPreferences) {
    switch (dashboardPreferences.dashboardSource) {
      case 'DATASTORE':
        return this._getAllFromDataStore(dashboardPreferences.namespace);
      case 'BOTH':
        return this._getAllFromBoth(dashboardPreferences);
      default:
        return this._getAllFromApi();
    }
  }

  getOne(id: string, dashboardPreferences: DashboardPreferences) {
    switch (dashboardPreferences.dashboardSource) {
      case 'DATASTORE':
        return this._getOneFromDataStore(id);
      case 'BOTH':
        return this._getOneFromBoth(id);
      default:
        return this._getOneFromApi(id);
    }
  }

  save(
    dashboard: Dashboard,
    dashboardPreferences: DashboardPreferences,
    action: string
  ) {
    switch (dashboardPreferences.dashboardSource) {
      case 'DATASTORE':
        return this._saveToDataStore(
          dashboard,
          dashboardPreferences.namespace,
          action
        );
      case 'BOTH':
        return this._saveToBoth(dashboard, dashboardPreferences, action);
      default:
        return this._saveToApi(
          omit(dashboard, dashboardPreferences.customAttributes || []),
          action
        );
    }
  }

  delete(id: string, dashboardPreferences: DashboardPreferences) {
    switch (dashboardPreferences.dashboardSource) {
      case 'DATASTORE':
        return this._deleteFromDataStore(id, dashboardPreferences.namespace);
      case 'BOTH':
        return this._deleteFromBoth(id, dashboardPreferences.namespace);
      default:
        return this._deleteFromApi(id);
    }
  }

  private _saveToDataStore(
    dashboard: Dashboard,
    namespace: string,
    action: string
  ) {
    if (!dashboard) {
      return throwError({
        status: 400,
        statusText: 'Error',
        message: 'Dashboard object could not be identified'
      });
    }
    return (action === 'CREATE'
      ? this.httpClient.post(
          `${dataStoreNamespace}/${namespace}_${dashboard.id}`,
          dashboard
        )
      : this.httpClient.put(
          `${dataStoreNamespace}/${namespace}_${dashboard.id}`,
          dashboard
        )
    ).pipe(map(() => dashboard));
  }

  private _saveToApi(dashboard: Dashboard, action: string) {
    if (!dashboard) {
      return throwError({
        status: 400,
        statusText: 'Error',
        message: 'Dashboard object could not be identified'
      });
    }
    return (action === 'CREATE'
      ? this.httpClient.post(`${dashboardApiNamespace}.json`, dashboard)
      : this.httpClient.put(
          `${dashboardApiNamespace}/${dashboard.id}.json`,
          dashboard
        )
    ).pipe(map(() => dashboard));
  }

  private _saveToBoth(
    dashboard: Dashboard,
    dashboardPreferences: DashboardPreferences,
    action: string
  ) {
    return forkJoin(
      this._saveToApi(
        omit(dashboard, dashboardPreferences.customAttributes || []),
        action
      ),
      this._saveToDataStore(
        pick(dashboard, dashboardPreferences.customAttributes || []),
        dashboardPreferences.namespace,
        action
      )
    ).pipe(map(() => dashboard));
  }

  private _getAllFromApi() {
    return this.httpClient
      .get(`${dashboardApiNamespace}.json?${dashboardApiFields}`)
      .pipe(
        map((dashboardResponse: any) => dashboardResponse.dashboards || [])
      );
  }

  private _getAllFromDataStore(namespace: string) {
    return this.httpClient.get(dataStoreNamespace).pipe(
      mergeMap((dashboardIds: string[]) => {
        const newDashboardIds = filterDashboardIdsByNamespace(
          dashboardIds,
          namespace
        );

        if (newDashboardIds.length === 0) {
          return of([]);
        }
        return new Observable(observer => {
          let dashboards: Dashboard[] = [];
          from(newDashboardIds)
            .pipe(mergeMap(this._getOneFromDataStore, null, 10))
            .subscribe(
              (dashboard: Dashboard) => {
                dashboards = [...dashboards, dashboard];
              },
              error => {
                observer.error(error);
              },
              () => {
                observer.next(dashboards);
                observer.complete();
              }
            );
        });
      })
    );
  }

  private _getAllFromBoth(dashboardPreferences: DashboardPreferences) {
    return forkJoin(
      this._getAllFromApi(),
      this._getAllFromDataStore(dashboardPreferences.namespace)
    ).pipe(
      map(dashboardsResult => {
        const dashboardsFromDataStore = dashboardsResult
          ? dashboardsResult[1]
          : [];
        return (dashboardsResult ? dashboardsResult[0] : []).map(
          (dashboard: Dashboard) => {
            return {
              ...dashboard,
              ...(find(dashboardsFromDataStore, ['id', dashboard.id]) || {})
            };
          }
        );
      })
    );
  }

  private _getOneFromDataStore(id: string): Observable<any> {
    return this.httpClient.get(`${dataStoreNamespace}/${id}`);
  }

  private _getOneFromApi(id: string) {
    return this.httpClient.get(
      `${dashboardApiNamespace}/${id}.json?${dashboardApiFields}`
    );
  }

  private _getOneFromBoth(id: string) {
    return forkJoin(
      this._getOneFromApi(id),
      this._getOneFromDataStore(id)
    ).pipe(
      map((dashboardsResponse: any[]) => {
        return {
          ...(dashboardsResponse ? dashboardsResponse[0] || {} : {}),
          ...(dashboardsResponse ? dashboardsResponse[1] || {} : {})
        };
      })
    );
  }

  private _deleteFromApi(id: string) {
    return this.httpClient.delete(`${dashboardApiNamespace}/${id}.json`);
  }

  private _deleteFromDataStore(id: string, namespace: string) {
    return this.httpClient.delete(`${dataStoreNamespace}/${namespace}_${id}`);
  }

  private _deleteFromBoth(id: string, namespace: string) {
    return this._deleteFromApi(id).pipe(
      mergeMap(() =>
        this._deleteFromDataStore(id, namespace).pipe(map(() => id))
      )
    );
  }
}
