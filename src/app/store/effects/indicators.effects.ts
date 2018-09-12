import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import {
  IndicatorActions,
  IndicatorActionTypes,
  LoadIndicatorSuccess,
  LoadIndicatorFail,
  LoadIndicators
} from '../actions';
import { IndicatorService } from '../../services';

@Injectable()
export class IndicatorsEffects {
  constructor(
    private actions$: Actions,
    private indicatorService: IndicatorService
  ) {}

  @Effect()
  loadingDataelemnts$: Observable<Action> = this.actions$.pipe(
    ofType<IndicatorActions>(IndicatorActionTypes.LoadIndicators),
    mergeMap(() => this.indicatorService.loadAll()),
    map(indicators => new LoadIndicatorSuccess(indicators)),
    catchError(error => of(new LoadIndicatorFail(error)))
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    return of(new LoadIndicators());
  });
}
