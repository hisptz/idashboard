import { Action } from '@ngrx/store';
import { Function } from '../../models/function-rule';

export enum FunctionActionTypes {
  LoadFunctions = '[Function] LoadFunctions',
  LoadFunctionSuccess = '[Function] Load function Success',
  LoadFunctionFail = '[Function] Load function Fail'
}

export class LoadFunctions implements Action {
  readonly type = FunctionActionTypes.LoadFunctions;
}
export class LoadFunctionSuccess implements Action {
  readonly type = FunctionActionTypes.LoadFunctionSuccess;
  constructor(public payload: Function[]) {}
}
export class LoadFunctionFail implements Action {
  readonly type = FunctionActionTypes.LoadFunctionFail;
  constructor(public payload: any) {}
}

export type FunctionActions =
  | LoadFunctions
  | LoadFunctionFail
  | LoadFunctionSuccess;
