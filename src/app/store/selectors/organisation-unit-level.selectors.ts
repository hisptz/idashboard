import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { OrgUnitLevelAdapter } from '../reducers/orgUnit-level.reducer';

export const getOrganisationUnitLevelEntityState = createSelector(
  getRootState,
  (state: State) => state.orgUnitLevel
);

export const {
  selectIds: getAllOrgUnitLevelIds,
  selectEntities: getOrgUnitLevelEntities,
  selectAll: getAllOrgUnitLevels
} = OrgUnitLevelAdapter.getSelectors(getOrganisationUnitLevelEntityState);
