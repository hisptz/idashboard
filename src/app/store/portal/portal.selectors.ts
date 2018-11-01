import {createSelector} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {PortalConfigurationState, StatsSummaryState} from './portal.state';

const portalConfiguration = (state: AppState) => state.portalConfiguration;
const statsSummary = (state: AppState) => state.statsSummary;

export const getPortalConfiguration = createSelector(portalConfiguration, (configurationsObj: PortalConfigurationState) => configurationsObj);
export const getStatsSummary = createSelector(statsSummary, (statsSummaryObj: StatsSummaryState) => statsSummaryObj);
