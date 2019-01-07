import { Action } from '@ngrx/store';

export enum IndicatorMappingActionTypes {
  AddIndicatorsMapping = '[Indicator] Add indicators mapping',
  UpdateIndicatorsMapping = '[Indicator] Update indicators mapping'
}

export class AddIndicatorsMapping implements Action {
  readonly type = IndicatorMappingActionTypes.AddIndicatorsMapping;
}

export class UpdateIndicatorsMapping implements Action {
  readonly type = IndicatorMappingActionTypes.UpdateIndicatorsMapping;
}

export type IndicatorMappingActions =
  | AddIndicatorsMapping
  | UpdateIndicatorsMapping;
