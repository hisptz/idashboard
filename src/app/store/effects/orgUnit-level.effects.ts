import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import {
  OrgUnitLevelActions,
  OrgUnitLevelActionTypes,
  LoadOrgUnitLevelSuccess,
  LoadOrgUnitLevelFail,
  LoadOrgUnitLevels
} from '../actions';
import { OrgUnitLevelService } from '../../services';

@Injectable()
export class OrganisationUnitLevelEffects {
  constructor(private actions$: Actions, private orgUnitLevelService: OrgUnitLevelService) {}

  @Effect()
  loadOrganisationUnitLevel$: Observable<Action> = this.actions$.pipe(
    ofType<OrgUnitLevelActions>(OrgUnitLevelActionTypes.LoadOrgUnitLevels),
    mergeMap(() => this.orgUnitLevelService.getOrgUnitLevel()),
    map(levels => new LoadOrgUnitLevelSuccess(levels)),
    catchError(error => of(new LoadOrgUnitLevelFail(error)))
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    return of(new LoadOrgUnitLevels());
  });
}
