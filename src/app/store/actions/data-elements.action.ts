import { Action } from '@ngrx/store';
import { DataElement } from '../../models/data-element';

export enum DataElementActionTypes {
  LoadDataElements = '[DataElement] Load data elemnts',
  LoadDataElementsSuccess = '[DataElement] Load data elemements Success',
  LoadDataElementsFail = '[DataElement] Load data elemements Fail'
}

export class LoadDataElements implements Action {
  readonly type = DataElementActionTypes.LoadDataElements;
}
export class LoadDataElementSuccess implements Action {
  readonly type = DataElementActionTypes.LoadDataElementsSuccess;
  constructor(public payload: DataElement[]) {}
}
export class LoadDataElementFail implements Action {
  readonly type = DataElementActionTypes.LoadDataElementsFail;
  constructor(public payload: any) {}
}

export type DataElementActions =
  | LoadDataElementFail
  | LoadDataElements
  | LoadDataElementSuccess;
