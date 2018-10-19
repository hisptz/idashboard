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
    dashboards: ['tFidynXMnDn', 'lUCZ9Rq344R', 'OMJ5l5Ic0C1', 'gLUc5SJjoXS']
  },
  {
    id: 'kquEMGaUMyn',
    name: 'Malaria Testing',
    dashboards: ['emcZaaBYQ4j', 'n0ff9qrTqH9', 'kUMDv9RGdyq', 'jtK9L4yyaSL']
  },
  {
    id: 'HOzTDHYZwiE',
    name: 'Malaria Commodities (Pharm)',
    dashboards: ['xfv6fKNeNuL', 'ElPSNI3mFf0', 'uDbJGRmnoPQ', 'Jj2trBJvOeG']
  },
  {
    id: 'AKVXOZUiE12',
    name: 'Severe Malaria Morbidity and Mortality (IPD)',
    dashboards: ['UuyjEPGdeLK', 'nc6YfIQ4SRZ', 'nbDajKsJ2gG', 'W17wZSERoeB']
  },
  {
    id: 'dCBBM28wKfV',
    name: 'Preventive services (RCH)',
    dashboards: ['skeLgxeb6HD', 'k6x9Pvvpt9u', 'uyOGOweH1bX', 'KhfYVW3ye34']
  },
  {
    id: 'BXEq47PU58f',
    name: 'Accountability Tool',
    dashboards: ['azp3dWWf8dw']
  },
  {
    id: 'DoSVwKTsNvZ',
    name: 'MSDQI',
    dashboards: [
      'LTxG4cBXA5z',
      'XIr3W6qZ2rm',
      'vKoaF1ObPE1',
      'VweVuqTIC7X',
      'iTrpiuF4ipk',
      'BwfRHTu8rDc',
      'jJjlmwGr0cG'
    ]
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
