import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DataElement } from '../../models/data-element';
import { DataElementActions, DataElementActionTypes } from '../actions';

export interface DataElementSetState extends EntityState<DataElement> {
  loading: boolean;
  loaded: boolean;
}

export const DataElementAdapter: EntityAdapter<
  DataElement
> = createEntityAdapter<DataElement>();

const initialState: DataElementSetState = DataElementAdapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false
});

export function dataElementReducer(
  state = initialState,
  action: DataElementActions
): DataElementSetState {
  switch (action.type) {
    case DataElementActionTypes.LoadDataElements: {
      return { ...state, loading: true };
    }
    case DataElementActionTypes.LoadDataElementsSuccess: {
      return DataElementAdapter.addMany(action.payload, {
        ...state,
        loaded: true,
        loading: true
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

const {
  selectIds: getDataElementIds,
  selectEntities: getDataElementEntitiesState,
  selectAll: getAllDataElements
} = DataElementAdapter.getSelectors();
