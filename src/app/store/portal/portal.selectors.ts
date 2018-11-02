import {createSelector} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {PortalConfigurationState, StatsSummaryState} from './portal.state';

const portalConfiguration = (state: AppState) => state.portalConfiguration;
const statsSummary = (state: AppState) => state.statsSummary;
const downloads = (state: AppState) => state.downloads;

export const getPortalConfiguration = createSelector(portalConfiguration, (configurationsObj: PortalConfigurationState) => configurationsObj);
export const getStatsSummary = createSelector(statsSummary, (statsSummaryObj: StatsSummaryState) => statsSummaryObj);

export const getDownloads = createSelector(downloads, (downloadsObj: any) => downloadsObj);
