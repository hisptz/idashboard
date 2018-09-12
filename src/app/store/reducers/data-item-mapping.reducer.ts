import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DataMappingItemActions, DataItemMappingActionTypes } from '../actions';

export interface DataItemMappingState extends EntityState<any> {
  currentDataItemMappingGroup: any;
}

export const dataItemMappingGroupAdapter: EntityAdapter<
  any
> = createEntityAdapter<any>();

const initialState: DataItemMappingState = dataItemMappingGroupAdapter.getInitialState(
  {
    currentDataItemMappingGroup: { id: 'all', name: '[ All ]' }
  }
);

export function dataItemMappingReducer(
  state = initialState,
  action: DataMappingItemActions
): DataItemMappingState {
  switch (action.type) {
    case DataItemMappingActionTypes.SetCurrentDataItemMapingGroup: {
      return { ...state, currentDataItemMappingGroup: action.payload };
    }
    default: {
      return state;
    }
  }
}
