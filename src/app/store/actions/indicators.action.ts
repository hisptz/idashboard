import { Action } from '@ngrx/store';
import { Indicator } from '../../models';

export enum IndicatorActionTypes {
  LoadIndicators = '[Indicator] Load indicators',
  LoadIndicatorsSuccess = '[Indicator] Load indicators Success',
  LoadIndicatorsFail = '[Indicator] Load indicators Fail'
}

export class LoadIndicators implements Action {
  readonly type = IndicatorActionTypes.LoadIndicators;
}
export class LoadIndicatorSuccess implements Action {
  readonly type = IndicatorActionTypes.LoadIndicatorsSuccess;
  constructor(public payload: Indicator[]) {}
}
export class LoadIndicatorFail implements Action {
  readonly type = IndicatorActionTypes.LoadIndicatorsFail;
  constructor(public payload: any) {}
}

export type IndicatorActions =
  | LoadIndicatorFail
  | LoadIndicators
  | LoadIndicatorSuccess;
