import { Injectable } from '@angular/core';
import { Observable, defer, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { map, catchError, mergeMap } from 'rxjs/operators';
import { FunctionMetadataService } from '../../services';
import {
  FunctionRuleActions,
  FunctionRuleActionTypes,
  LoadFunctionRuleFail,
  LoadFunctionRules,
  LoadFunctionRuleSuccess,
  UpdateFunctionRuleSuccess
} from '../actions';

@Injectable()
export class FunctionRuleEffects {
  constructor(
    private actions$: Actions,
    private functionMetadata: FunctionMetadataService
  ) {}

  @Effect()
  loadingFunctionRules$: Observable<Action> = this.actions$.pipe(
    ofType<FunctionRuleActions>(FunctionRuleActionTypes.LoadFunctionRules),
    mergeMap(() => this.functionMetadata.loadingFunction()),
    map(
      (functionObject: any) => new LoadFunctionRuleSuccess(functionObject.rules)
    ),
    catchError(error => of(new LoadFunctionRuleFail(error)))
  );

  @Effect()
  updatingFunctionRules$: Observable<Action> = this.actions$.pipe(
    ofType<FunctionRuleActions>(FunctionRuleActionTypes.UpdateFunctionRules),
    mergeMap((action: any) =>
      this.functionMetadata.updateFucntionRuleDataStore(action.payload)
    ),
    map(() => new UpdateFunctionRuleSuccess()),
    catchError(error => of(new LoadFunctionRuleFail(error)))
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    return of(new LoadFunctionRules());
  });
}
