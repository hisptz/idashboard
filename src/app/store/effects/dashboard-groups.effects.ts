import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import {
  InitializeDashboardGroupsAction,
  InitializeDashboardGroupsActionSuccess,
  SetActiveDashboardGroupsAction,
  SetActiveDashboardGroupsActionFail,
  DashboardGroupsActionTypes,
  DashboardGroupsActions
} from '../actions/dashboard-groups.action';
import { getCurrentDashboardId } from '../selectors';
import { SetCurrentDashboardAction } from '../actions/dashboard.actions';
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  tap
} from 'rxjs/operators';

const GROUPS_PAYLOAD = [
  {
    id: 'Xm4TNggmC8J',
    name: 'Uncomplicated Malaria Diagnosis (OPD)',
    dashboards: ['nmcp-malaria_tFidynXMnDn']
  },
  {
    id: 'kquEMGaUMyn',
    name: 'Malaria Testing',
    dashboards: []
  },
  {
    id: 'HOzTDHYZwiE',
    name: 'Malaria Commodities (Pharm)',
    dashboards: []
  },
  {
    id: 'AKVXOZUiE12',
    name: 'Severe Malaria Morbidity and Mortality (IPD)',
    dashboards: []
  },
  {
    id: 'dCBBM28wKfV',
    name: 'Preventive services (RCH)',
    dashboards: []
  },
  {
    id: 'BXEq47PU58f',
    name: 'Accountability Tool',
    dashboards: []
  },
  {
    id: 'DoSVwKTsNvZ',
    name: 'MSDQI',
    dashboards: []
  }
];

@Injectable()
export class DashboardGroupsEffects {
  @Effect({ dispatch: false })
  setCurrentDashboardGroup$: Observable<any> = this.actions$.pipe(
    ofType<SetActiveDashboardGroupsAction>(
      DashboardGroupsActionTypes.SetActiveDashboardGroup
    ),
    withLatestFrom(this.store.select(getCurrentDashboardId)),
    tap(([action, dashboardId]: [SetActiveDashboardGroupsAction, string]) => {
      const currentDashboardId = action.activeGroup.dashboards.includes(
        dashboardId
      )
        ? dashboardId
        : action.activeGroup.dashboards[0];
      if (currentDashboardId) {
        this.store.dispatch(new SetCurrentDashboardAction(currentDashboardId));
      }
    })
  );

  @Effect()
  initializeDashboardGroups$: Observable<
    DashboardGroupsActions
  > = this.actions$.pipe(
    ofType<InitializeDashboardGroupsAction>(
      DashboardGroupsActionTypes.InitializeDashboardGroups
    ),
    switchMap(() => [
      new InitializeDashboardGroupsActionSuccess(
        GROUPS_PAYLOAD,
        GROUPS_PAYLOAD[0].id
      )
    ]),
    catchError(error => of(new SetActiveDashboardGroupsActionFail(error)))
  );

  // remember to put this at the end of all effects
  @Effect()
  init$: Observable<Action> = defer(() =>
    of(new InitializeDashboardGroupsAction())
  );
  constructor(private actions$: Actions, private store: Store<State>) {}
}
