import { Action } from '@ngrx/store';
import { DataSet } from '../../models';

export enum DataSetActionTypes {
  LoadDataSets = '[DataSet] Load data set',
  LoadDataSetsSuccess = '[DataSet] Load data set Success',
  LoadDataSetsFail = '[DataSet] Load data sets Fail'
}

export class LoadDataSets implements Action {
  readonly type = DataSetActionTypes.LoadDataSets;
}
export class LoadDataSetSuccess implements Action {
  readonly type = DataSetActionTypes.LoadDataSetsSuccess;
  constructor(public payload: DataSet[]) {}
}
export class LoadDataSetFail implements Action {
  readonly type = DataSetActionTypes.LoadDataSetsFail;
  constructor(public payload: any) {}
}

export type DataSetActions =
  | LoadDataSetFail
  | LoadDataSets
  | LoadDataSetSuccess;
