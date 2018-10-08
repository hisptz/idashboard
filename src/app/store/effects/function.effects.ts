import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { map, catchError, mergeMap } from 'rxjs/operators';
import { FunctionMetadataService } from '../../services';
import {
  FunctionActions,
  FunctionActionTypes,
  LoadFunctionSuccess,
  LoadFunctionFail,
  LoadFunctions
} from '../actions';

@Injectable()
export class FunctionEffects {
  constructor(
    private actions$: Actions,
    private functionMetadata: FunctionMetadataService
  ) {}

  @Effect()
  loadingFunctions$: Observable<Action> = this.actions$.pipe(
    ofType<FunctionActions>(FunctionActionTypes.LoadFunctions),
    mergeMap(() => this.functionMetadata.loadingFunction()),
    map(
      (functionObject: any) =>
        new LoadFunctionSuccess([
          { id: functionObject.id, functionString: functionObject.function }
        ])
    ),
    catchError(error => of(new LoadFunctionFail(error)))
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    return of(new LoadFunctions());
  });
}
