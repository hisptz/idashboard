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
import { DashboardGroupService } from 'src/app/services/dashboard-group.service';

const GROUPS_PAYLOAD = [];

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
    switchMap((action: InitializeDashboardGroupsAction) =>
      this.dashboardGroupService
        .loadAll(action.dashboardSettings)
        .pipe(
          map(
            dashboardGroups =>
              new InitializeDashboardGroupsActionSuccess(
                dashboardGroups,
                dashboardGroups.length > 0 ? dashboardGroups[0].id : ''
              )
          )
        )
    ),
    catchError(error => of(new SetActiveDashboardGroupsActionFail(error)))
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardGroupService: DashboardGroupService
  ) {}
}
