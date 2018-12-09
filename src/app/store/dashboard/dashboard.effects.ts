import {
  switchMap, withLatestFrom, take,
  map,
  catchError, tap, debounceTime, distinctUntilChanged
} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable, of, forkJoin} from 'rxjs';
import {Dashboard, DashboardSharing} from './dashboard.state';
import {Actions, Effect, ofType} from '@ngrx/effects';


import {HttpClientService} from '../../services/http-client.service';
import * as dashboard from './dashboard.actions';
import * as dashboardHelpers from './helpers/index';
import * as visualization from '../visualization/visualization.actions';
import * as visualizationHelpers from '../visualization/helpers/index';
import * as currentUser from '../current-user/current-user.actions';
import * as portalConfiguration from '../portal/portal.actions';
import {AppState} from '../app.reducers';
import {Store} from '@ngrx/store';
import {CurrentUserState} from '../current-user/current-user.state';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {ROUTER_NAVIGATION} from '@ngrx/router-store';
import {Visualization} from '../visualization/visualization.state';
import {SharingEntity} from '../../modules/sharing-filter/models/sharing-entity';

@Injectable()
export class DashboardEffects {
  @Effect({dispatch: false})
  portalConfigurationLoaded$ = this.actions$.ofType<portalConfiguration.LoadPortalConfigurationSuccessAction>(
    portalConfiguration.PortalActions.LOAD_PORTAL_CONFIGURATION_SUCCESS
  ).pipe(tap(() => {
    this.store.dispatch(new dashboard.LoadAction());
  }));
  @Effect({dispatch: false})
  currentUserLoaded$ = this.actions$.ofType<currentUser.LoadSuccessAction>(
    currentUser.CurrentUserActions.LOAD_SUCCESS
  ).pipe(tap(() => {
    this.store.dispatch(new portalConfiguration.LoadPortalConfigurationAction());
    this.store.dispatch(new dashboard.LoadDashboardNotificationAction());
  }));

  @Effect()
  loadDashboard$ = this.actions$.ofType<dashboard.LoadAction>(dashboard.DashboardActions.LOAD).pipe(take(1),
    withLatestFrom(this.store)).pipe(
    switchMap(([action, state]: [any, AppState]) =>
      this._loadAll().pipe(
        map((dashboards: any) => {
          return {
            dashboards: dashboards,
            currentUser: state.currentUser,
            portalConfiguration: state.portalConfiguration,
            url: state.route.state.url
          };
        }),
        map((dashboardResponse: any) =>
          new dashboard.LoadSuccessAction(dashboardResponse)),
        catchError((error) => of(new dashboard.LoadFailAction(error)))
      )
    )
  );

  @Effect({dispatch: false})
  dashboardsLoaded$ = this.actions$.ofType<dashboard.LoadSuccessAction>(
    dashboard.DashboardActions.LOAD_SUCCESS
  ).pipe(tap((action: any) => {
    // TODO refactor this code
    this.store.dispatch(new dashboard.LoadOptionsAction());
    this.store.dispatch(new visualization.LoadSuccessAction());
    const currentDashboardId = this._getCurrentDashboardId(
      action.payload.url,
      action.payload.dashboards,
      action.payload.currentUser
    );

    const currentVisualization = action.payload.url.split('/')[4];

    const portalConfigurations = action.payload.portalConfiguration;
    /**
     * Control if the app will load with portal configurations from datastore or not
     **/
    if (portalConfigurations.isPortal && portalConfigurations) {
      // _.each(action.payload.dashboards, (dashboardObject: any) => {
      //   this.store.dispatch(
      //     new dashboard.SetCurrentAction(dashboardObject.id)
      //   );
      // })
      // navigate to the page set true
      let navigateTo = '';

      const allDashboardItems = _.flatten(_.map(action.payload.dashboards || [], (dashboardLoaded: any) => _.take(_.map(dashboardLoaded.dashboardItems, (dashboardItem: any) => {
        return {...dashboardItem, dashboardId: dashboardLoaded.id};
      }), 10)));

      this.store.dispatch(new dashboard.SetAllDashboardsAction(allDashboardItems));

      portalConfigurations.pages.forEach((page) => {
        if (this.router.url !== '/') {
          console.log(this.router.url);
          navigateTo = this.router.url;
        } else if (page.isHomePage) {
          navigateTo = page.routeUrl;
        }
      });
      if (navigateTo !== '') {
        this.router.navigate([navigateTo]);
      }
    } else {
      if (currentDashboardId) {
        /**
         * Navigate to the particular dashboard if comes from home
         */
        if (action.payload.url.indexOf('dashboards') === -1) {
          this.router.navigate(['/dashboards/' + currentDashboardId]);
        } else {
          if (currentVisualization) {
            this.store.dispatch(
              new visualization.SetCurrentAction(currentVisualization)
            );
          } else {
            this.store.dispatch(
              new dashboard.SetCurrentAction(currentDashboardId)
            );
            this.store.dispatch(
              new dashboard.LoadSharingDataAction(currentDashboardId)
            );
          }
        }
      } else {
        this.router.navigate(['/']);
      }
    }
  }));

  @Effect()
  createDashboard$ = this.actions$.pipe(ofType<dashboard.CreateAction>(dashboard.DashboardActions.CREATE),
    switchMap((action: any) => this._create(action.payload).pipe(map(
      (dashboardObject: any) =>
        new dashboard.CreateSuccessAction(dashboardObject)
    ))));
  // TODO deal with errors when dashboard creation fails

  @Effect()
  renameDashboard$ = this.actions$.pipe(
    ofType<dashboard.RenameAction>(dashboard.DashboardActions.RENAME),
    switchMap((action: any) => this._rename(action.payload).pipe(map(
      (dashboardObject: any) =>
        new dashboard.RenameSuccessAction(dashboardObject)
    ))));

  @Effect({dispatch: false})
  dashboardCreated$ = this.actions$.pipe(ofType<dashboard.CreateSuccessAction>(
    dashboard.DashboardActions.CREATE_SUCCESS
  ), tap((action: any) => {
    this.router.navigate([`/dashboards/${action.payload.id}`]);
  }));

  @Effect()
  deleteDashboard$ = this.actions$.pipe(
    ofType<dashboard.DeleteAction>(dashboard.DashboardActions.DELETE),
    switchMap((action: any) => this._delete(action.payload).pipe(map(
      (dashboardId: string) => new dashboard.DeleteSuccessAction(dashboardId)))));

  @Effect({dispatch: false})
  dashboardDeleted$ = this.actions$.pipe(ofType<dashboard.DeleteSuccessAction>(
    dashboard.DashboardActions.DELETE_SUCCESS
  ), withLatestFrom(this.store), tap(([action, store]: [dashboard.DeleteSuccessAction, AppState]) => {
    const dashboardIndex = _.findIndex(
      store.dashboard.dashboards,
      _.find(store.dashboard.dashboards, ['id', action.payload])
    );

    if (dashboardIndex !== -1) {
      const dashboardToNavigate =
        store.dashboard.dashboards.length > 1
          ? dashboardIndex === 0
          ? store.dashboard.dashboards[1]
          : store.dashboard.dashboards[dashboardIndex - 1]
          : null;

      this.store.dispatch(new dashboard.CommitDeleteAction(action.payload));

      if (dashboardToNavigate) {
        this.router.navigate([`/dashboards/${dashboardToNavigate.id}`]);
      } else {
        this.router.navigate(['/']);
      }
    }
  }));

  @Effect({dispatch: false})
  route$ = this.actions$.pipe(ofType(ROUTER_NAVIGATION), withLatestFrom(this.store),
    tap(([action, state]: [any, AppState]) => {
      const currentDashboardId = state.route.state.url.split('/')[2];
      if (currentDashboardId) {
        /**
         * Save current dashboard into the store and load visualizations
         */
        const currentDashboard = _.find(state.dashboard.dashboards, [
          'id',
          currentDashboardId
        ]);

        if (currentDashboard) {
          /**
           * Save current dashboard to local storage
           */
          localStorage.setItem(
            'dhis2.dashboard.current.' +
            state.currentUser.userCredentials.username,
            currentDashboardId
          );

          /**
           * Set current dashboard in the store
           */
          this.store.dispatch(
            new dashboard.SetCurrentAction(currentDashboard.id)
          );
          this.store.dispatch(
            new dashboard.LoadSharingDataAction(currentDashboardId)
          );
        }
      }
    }));

  @Effect()
  searchItem$ = this.actions$.pipe(ofType<dashboard.SearchItemsAction>(
    dashboard.DashboardActions.SEARCH_ITEMS
  ), switchMap((action: any) =>
    action.payload.pipe(debounceTime(400), distinctUntilChanged(), switchMap((term: string) => this._searchItems(term).pipe(map(
      (searchResult: any) =>
        new dashboard.UpdateSearchResultAction(searchResult)
    ))))
  ));

  @Effect()
  addDashboardItemAction$ = this.actions$.pipe(
    ofType<dashboard.AddItemAction>(dashboard.DashboardActions.ADD_ITEM),
    withLatestFrom(this.store), switchMap(([action, store]) =>
      this._addItem(
        store.dashboard.currentDashboard,
        action.payload.id,
        action.payload.type
      ).pipe(map(
        (dashboardItems: any[]) =>
          new dashboard.AddItemSuccessAction(dashboardItems)
      ))
    ));

  @Effect({dispatch: false})
  dashboardItemAddedAction$ = this.actions$.pipe(ofType<dashboard.AddItemSuccessAction>(
    dashboard.DashboardActions.ADD_ITEM_SUCCESS
  ), withLatestFrom(this.store), tap(([action, state]: [any, AppState]) => {
    const currentDashboard: Dashboard = _.find(state.dashboard.dashboards, [
      'id',
      state.dashboard.currentDashboard
    ]);

    if (currentDashboard) {
      const newDashboardItem: any = dashboardHelpers.getCheckedAddedItem(
        currentDashboard,
        action.payload
      );

      const initialVisualization: Visualization = visualizationHelpers.mapDashboardItemToVisualization(
        newDashboardItem,
        state.dashboard.currentDashboard,
        state.currentUser
      );

      this.store.dispatch(
        new visualization.AddOrUpdateAction({
          visualizationObject: initialVisualization,
          placementPreference: 'first'
        })
      );

      this.store.dispatch(
        new visualization.LoadFavoriteAction(initialVisualization)
      );
    }
  }));

  @Effect({dispatch: false})
  loadDashboardSharing = this.actions$.pipe(ofType<dashboard.LoadSharingDataAction>(
    dashboard.DashboardActions.LOAD_SHARING_DATA
  ), withLatestFrom(this.store), tap(([action, state]: [any, AppState]) => {
    if (
      !state.dashboard.dashboardSharing ||
      !state.dashboard.dashboardSharing[action.payload]
    ) {
      this._loadSharingInfo(action.payload).subscribe(
        (sharingInfo: DashboardSharing) => {
          this.store.dispatch(
            new dashboard.LoadSharingDataSuccessAction(sharingInfo)
          );
        }
      );
    }
  }));

  @Effect()
  loadOptions$ = this.actions$.pipe(ofType<dashboard.LoadOptionsAction>(
    dashboard.DashboardActions.LOAD_OPTIONS
  ), take(1), withLatestFrom(this.store), switchMap(([action, state]: [dashboard.LoadOptionsAction, AppState]) =>
    this._loadOptions().pipe(
      map(
        (dashboardOptions: any) =>
          new dashboard.LoadOptionsSuccessAction({
            dashboardOptions,
            currentUser: state.currentUser,
            portalConfiguration: state.portalConfiguration,
          })
      ),
      catchError(() => of(new dashboard.LoadOptionsFailAction()))
    )
  ));

  @Effect()
  bookmarkDashboard$ = this.actions$.pipe(ofType<dashboard.BookmarkDashboardAction>(
    dashboard.DashboardActions.BOOKMARK_DASHBOARD
    ), withLatestFrom(this.store), map(([action, state]: [any, AppState]) => {
      return {
        dashboardId: action.payload.dashboardId,
        bookmarked: action.payload.bookmarked,
        currentUserId: state.currentUser.id
      };
    }),
    switchMap(({dashboardId, currentUserId, bookmarked}) =>
      this._bookmarkDashboard(dashboardId, currentUserId, bookmarked).pipe(
        map(() => new dashboard.BookmarkDashboardSuccessAction()),
        catchError(() => of(new dashboard.BookmarkDashboardFailAction()))
      )
    ));

  @Effect()
  loadDashboardNotification$ = this.actions$.pipe(
    ofType(dashboard.DashboardActions.LOAD_NOTIFACATION),
    switchMap(() => this.httpClient.get('me/dashboard.json').pipe(
      map((response: any) => new dashboard.LoadDashboardNotificationSuccessAction(response)),
      catchError((error) => of(new dashboard.LoadDashboardNotificationFailAction(error)))))
  );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private router: Router,
              private httpClient: HttpClientService) {
  }

  private _loadAll(): Observable<Dashboard[]> {
    return new Observable(observer => {
      this.httpClient.get(
        `dashboards.json?fields=id,name,publicAccess,access,externalAccess,created,lastUpdated,
      user[id,name],dashboardItems[id,type,created,lastUpdated,shape,appKey,reports[id,displayName],chart[id,displayName],
    map[id,displayName],reportTable[id,displayName],eventReport[id,displayName],eventChart[id,displayName],
    resources[id,displayName],users[id,displayName]]&paging=false`
      ).subscribe(
        (dashboardResponse: any) => {
          observer.next(dashboardResponse.dashboards || []);
          observer.complete();
        },
        dashboardError => {
          console.warn(dashboardError);
          observer.next([]);
          observer.complete();
        }
      );
    });
  }

  private _getCurrentDashboardId(routeUrl: string,
                                 dashboards: Dashboard[],
                                 currentUserInfo: CurrentUserState) {
    let currentDashboard = routeUrl.split('/')[2];

    if (_.find(dashboards, ['id', currentDashboard])) {
      if (currentUserInfo && currentUserInfo.userCredentials) {
        localStorage.setItem(
          'dhis2.dashboard.current.' + currentUserInfo.userCredentials.username,
          currentDashboard
        );
      }
    } else {
      if (currentUserInfo && currentUserInfo.userCredentials) {
        currentDashboard = localStorage.getItem(
          'dhis2.dashboard.current.' + currentUserInfo.userCredentials.username
        );

        if (!_.find(dashboards, ['id', currentDashboard])) {
          currentDashboard = dashboards[0] ? dashboards[0].id : undefined;
        }
      } else {
        currentDashboard = dashboards[0] ? dashboards[0].id : undefined;
      }
    }
    return currentDashboard;
  }

  private _load(id) {
    return this.httpClient.get(`dashboards/${id}.json?fields=id,name,publicAccess,access,externalAccess,
    userGroupAccesses,dashboardItems[id,type,created,shape,appKey,reports[id,displayName],chart[id,displayName],
    map[id,displayName],reportTable[id,displayName],eventReport[id,displayName],eventChart[id,displayName],
    resources[id,displayName],users[id,displayName]]`);
  }

  private _loadOptions() {
    return new Observable(observer => {
      this.httpClient.get('dataStore/dashboards').subscribe(
        (dashboardOptions: any[]) => {
          forkJoin(
            _.map(dashboardOptions, (dashboardOption: any) =>
              this.httpClient.get(`dataStore/dashboards/${dashboardOption}`)
            )
          ).subscribe(
            (dashboardOptionResults: any) => {
              observer.next(
                _.map(
                  dashboardOptionResults,
                  (dashboardOptionResult: any,
                   dashboardOptionIndex: number) => {
                    return {
                      id: dashboardOptions[dashboardOptionIndex],
                      ...dashboardOptionResult
                    };
                  }
                )
              );
            },
            error => observer.error(error)
          );
        },
        error => observer.error(error)
      );
    });
  }

  private _bookmarkDashboard(dashboardId: string,
                             currentUserId: string,
                             bookmarked: boolean) {
    return new Observable(observer => {
      this.httpClient.get(`dataStore/dashboards/${dashboardId}`).subscribe(
        (dashboardOption: any) => {
          this.httpClient.put(`dataStore/dashboards/${dashboardId}`, {
            ...dashboardOption,
            bookmarks: bookmarked
              ? dashboardOption.bookmarks.indexOf(currentUserId) === -1
                ? [...dashboardOption.bookmarks, currentUserId]
                : [...dashboardOption.bookmarks]
              : _.filter(
                dashboardOption.bookmarks,
                bookmark => bookmark !== currentUserId
              )
          }).subscribe(
            () => {
              observer.next({});
              observer.complete();
            },
            error => observer.error(error)
          );
        },
        () => {
          this.httpClient.post(`dataStore/dashboards/${dashboardId}`, {
            id: dashboardId,
            bookmarks: [currentUserId]
          }).subscribe(
            () => {
              observer.next({});
              observer.complete();
            },
            error => observer.error(error)
          );
        }
      );
    });
  }

  private _create(dashboardName: any): Observable<Dashboard> {
    return Observable.create(observer => {
      this.getUniqueId().subscribe(
        (uniqueId: string) => {
          this.httpClient.post('dashboards', {
            id: uniqueId,
            name: dashboardName
          }, true).subscribe(
            () => {
              this._load(uniqueId).subscribe(
                (dashboardObject: any) => {
                  observer.next(dashboardObject);
                  observer.complete();
                },
                dashboardLoadError => observer.error(dashboardLoadError)
              );
            },
            dashboardCreationError => observer.error(dashboardCreationError)
          );
        },
        uniqueIdError => observer.error(uniqueIdError)
      );
    });
  }

  private _rename(dashboardData: {
    id: string;
    name: string;
  }): Observable<Dashboard> {
    return new Observable(observer => {
      this.httpClient.put(`dashboards/${dashboardData.id}`, {name: dashboardData.name}, true).subscribe(
        () => {
          this._load(dashboardData.id).subscribe(
            (dashboardObject: any) => {
              observer.next(dashboardObject);
              observer.complete();
            },
            dashboardLoadError => observer.error(dashboardLoadError)
          );
        },
        renameError => observer.error(renameError)
      );
    });
  }

  private _delete(dashboardId: string) {
    return new Observable(observer => {
      this.httpClient.delete(`dashboards/${dashboardId}`, true).subscribe(
        () => {
          observer.next(dashboardId);
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }

  private _searchItems(searchText: string) {
    return new Observable(observer => {
      this.httpClient.get(
        'dashboards/q/' +
        searchText +
        '.json?max=USERS&&max=MAP&max=REPORT_TABLE&max=CHART&' +
        'max=EVENT_CHART&max=EVENT_REPORT&max=RESOURCES&max=REPORTS&max=APP'
      ).subscribe(
        searchResult => {
          observer.next(searchResult);
          observer.complete();
        },
        () => {
          observer.next(null);
          observer.complete();
        }
      );
    });
  }

  private _addItem(dashboardId, itemId, dashboardItemType) {
    return new Observable(observer => {
      this.httpClient.post(
        'dashboards/' +
        dashboardId +
        '/items/content?type=' +
        dashboardItemType +
        '&id=' +
        itemId,
        {}, true
      ).subscribe(
        () => {
          this._load(dashboardId).subscribe(
            (dashboardResponse: any) => {
              observer.next(
                this._retrieveAddedItem(
                  dashboardResponse.dashboardItems,
                  dashboardItemType,
                  itemId
                )
              );
              observer.complete();
            },
            () => {
              observer.next([]);
              observer.complete();
            }
          );
        },
        () => {
          observer.next([]);
          observer.complete();
        }
      );
    });
  }

  private _retrieveAddedItem(dashboardItems, dashboardItemType, favoriteId) {
    let newItems = [];
    if (dashboardItemType[dashboardItemType.length - 1] === 'S') {
      newItems = _.clone(
        dashboardItems.filter(item => {
          return item.type[dashboardItemType.length - 1] === 'S';
        })
      );
    } else {
      for (const item of dashboardItems) {
        /**
         * Get new item for apps
         */
        if (item.type === 'APP' && dashboardItemType === 'APP') {
          newItems = [item];
          break;
        }

        const itemTypeObject = item[_.camelCase(dashboardItemType)];
        if (itemTypeObject) {
          if (itemTypeObject.id === favoriteId) {
            newItems = [item];
            break;
          }
        }
      }
    }

    return newItems;
  }

  private _loadSharingInfo(dashboardId: string): Observable<DashboardSharing> {
    return this.httpClient.get('sharing?type=dashboard&id=' + dashboardId).pipe(map((sharingResponse: any) => {
      return sharingResponse && sharingResponse.object
        ? {
          id: dashboardId,
          user: sharingResponse.object.user,
          sharingEntity: this._deduceSharingEntities(sharingResponse.object)
        }
        : null;
    }));
  }

  private _deduceSharingEntities(sharingObject: any): SharingEntity {
    return sharingObject
      ? this._getEntities(
        [
          ...this.updateSharingAccessesWithType(
            sharingObject.userAccesses,
            'user'
          ),
          ...this.updateSharingAccessesWithType(
            sharingObject.userGroupAccesses,
            'userGroup'
          )
        ] || [],
        {
          external_access: {
            id: 'external_access',
            name: 'External Access',
            isExternal: true,
            access: sharingObject.externalAccess
          },
          public_access: {
            id: 'public_access',
            name: sharingObject.publicAccess === '--------' ? 'Only me' : 'Everyone',
            isPublic: true,
            access: sharingObject.publicAccess
          }
        }
      )
      : null;
  }

  updateSharingAccessesWithType(accessArray: any[], type: string) {
    return accessArray
      ? _.map(accessArray, (accessObject: any) => {
        return {
          ...accessObject,
          type: type
        };
      })
      : [];
  }

  private _getEntities(itemArray, initialValues: SharingEntity) {
    return itemArray.reduce(
      (items: { [id: string]: any }, item: any) => {
        return {
          ...items,
          [item.id]: {
            id: item.id,
            name: item.displayName || item.name,
            type: item.type,
            access: item.access
          }
        };
      },
      {
        ...initialValues
      }
    );
  }

  getUniqueId(): Observable<string> {
    return new Observable(observer => {
      this.httpClient.get('system/id.json?n=1').subscribe(
        response => {
          observer.next(response['codes'][0]);
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }
}
