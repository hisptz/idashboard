import { Action } from '@ngrx/store';

export enum IndicatorMappingActionTypes {
  AddIndicatorsMapping = '[Indicator] Add indicators mapping',
  UpdateIndicatorsMapping = '[Indicator] Update indicators mapping'
}

export class AddIndicatorsMapping implements Action {
  readonly type = IndicatorMappingActionTypes.AddIndicatorsMapping;
  constructor(public payload: any[]) {}
}

export class UpdateIndicatorsMapping implements Action {
  readonly type = IndicatorMappingActionTypes.UpdateIndicatorsMapping;
  constructor(public payload: any[]) {}
}

export type IndicatorMappingActions =
  | AddIndicatorsMapping
  | UpdateIndicatorsMapping;
