import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { map, catchError, mergeMap } from 'rxjs/operators';
import {
  LoadDataSets,
  LoadDataSetFail,
  DataSetActions,
  DataSetActionTypes,
  LoadDataSetSuccess
} from '../actions';
import { DataSetService } from '../../services';
import * as _ from 'lodash';

@Injectable()
export class DataSetEffects {
  constructor(
    private actions$: Actions,
    private dataSetService: DataSetService
  ) {}

  @Effect()
  loadingDataelemnts$: Observable<Action> = this.actions$.pipe(
    ofType<DataSetActions>(DataSetActionTypes.LoadDataSets),
    mergeMap(() => this.dataSetService.getDataSets()),
    map(dataSets => {
      const sanitizedDataSets: any = _.flattenDeep(
        _.map(dataSets, dataSet => {
          return [
            {
              id: `${dataSet.id}.ACTUAL_REPORTS`,
              name: `${dataSet.name} [Actual reports]`
            },
            {
              id: `${dataSet.id}.EXPECTED_REPORTS`,
              name: `${dataSet.name} [Expected reports]`
            }
          ];
        })
      );
      return new LoadDataSetSuccess(sanitizedDataSets);
    }),
    catchError(error => of(new LoadDataSetFail(error)))
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    return of(new LoadDataSets());
  });
}
