import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DataSetActions, DataSetActionTypes } from '../actions';
import { DataSet } from '../../models';

export interface DataSetState extends EntityState<DataSet> {
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const DataSetAdapter: EntityAdapter<DataSet> = createEntityAdapter<
  DataSet
>();

const initialState: DataSetState = DataSetAdapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  error: ''
});

export function DataSetReducer(
  state = initialState,
  action: DataSetActions
): DataSetState {
  switch (action.type) {
    case DataSetActionTypes.LoadDataSets: {
      return { ...state, loading: true };
    }
    case DataSetActionTypes.LoadDataSetsSuccess: {
      return DataSetAdapter.addMany(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case DataSetActionTypes.LoadDataSetsFail: {
      return { ...state, error: action.payload, loading: false, loaded: false };
    }
    default: {
      return state;
    }
  }
}
