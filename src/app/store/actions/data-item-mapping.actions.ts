import { Action } from '@ngrx/store';

export enum DataItemMappingActionTypes {
  SetCurrentDataItemMapingGroup = '[Data Item Mapping] set current data item group'
}

export class SetCurrentDataItemMapingGroup implements Action {
  readonly type = DataItemMappingActionTypes.SetCurrentDataItemMapingGroup;
  constructor(public payload: any) {}
}

export type DataMappingItemActions = SetCurrentDataItemMapingGroup;
