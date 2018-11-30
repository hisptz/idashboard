import { OrgUnitLevelActions, OrgUnitLevelActionTypes } from '../actions';
import { OrgUnitLevel } from '../../models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface OrgUnitLevelState extends EntityState<OrgUnitLevel> {
  loading: boolean;
  loaded: boolean;
}

export const OrgUnitLevelAdapter: EntityAdapter<OrgUnitLevel> = createEntityAdapter<OrgUnitLevel>();

const initialState: OrgUnitLevelState = OrgUnitLevelAdapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false
});

export function orgUnitLevelReducer(state = initialState, action: OrgUnitLevelActions): OrgUnitLevelState {
  switch (action.type) {
    case OrgUnitLevelActionTypes.LoadOrgUnitLevelSuccess: {
      return OrgUnitLevelAdapter.addMany(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
    }

    default: {
      return state;
    }
  }
}

export const getOrgUnitLevelLoadedState = (state: OrgUnitLevelState) => state.loaded;
export const getOrgUnitLevelLoadingState = (state: OrgUnitLevelState) => state.loading;
