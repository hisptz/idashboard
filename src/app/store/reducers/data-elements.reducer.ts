import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DataElement } from '../../models/data-element';
import { DataElementActions, DataElementActionTypes } from '../actions';

export interface DataElementState extends EntityState<DataElement> {
  loading: boolean;
  loaded: boolean;
}

export const DataElementAdapter: EntityAdapter<
  DataElement
> = createEntityAdapter<DataElement>();

const initialState: DataElementState = DataElementAdapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false
});

export function dataElementReducer(
  state = initialState,
  action: DataElementActions
): DataElementState {
  switch (action.type) {
    case DataElementActionTypes.LoadDataElements: {
      return { ...state, loading: true };
    }
    case DataElementActionTypes.LoadDataElementsSuccess: {
      return DataElementAdapter.addMany(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
    }
    case DataElementActionTypes.LoadDataElementsFail: {
      return { ...state, loading: false, loaded: false };
    }
    default: {
      return state;
    }
  }
}
