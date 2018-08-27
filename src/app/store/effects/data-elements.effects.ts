import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { map, catchError, mergeMap } from 'rxjs/operators';
import {
  LoadDataElements,
  LoadDataElementFail,
  LoadDataElementSuccess,
  DataElementActions,
  DataElementActionTypes
} from '../actions';
import { DataElementsService } from '../../services';

@Injectable()
export class DataElementEffects {
  constructor(
    private actions$: Actions,
    private dataElementService: DataElementsService
  ) {}

  @Effect()
  loadingDataelemnts$: Observable<Action> = this.actions$.pipe(
    ofType<DataElementActions>(DataElementActionTypes.LoadDataElements),
    mergeMap(() => this.dataElementService.getDataElements()),
    map(dataElements => new LoadDataElementSuccess(dataElements)),
    catchError(error => of(new LoadDataElementFail(error)))
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    return of(new LoadDataElements());
  });
}
