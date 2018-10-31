import {createSelector} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {PortalConfigurationState} from './portal.state';

const portalConfiguration = (state: AppState) => state.portalConfiguration;
export const getPortalConfiguration = createSelector(portalConfiguration, (configurationsObj: PortalConfigurationState) => configurationsObj);
