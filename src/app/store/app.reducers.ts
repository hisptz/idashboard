import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import {RouterReducerState} from '@ngrx/router-store';
import * as RouterReducer from '@ngrx/router-store';
import {CurrentUserState} from './current-user/current-user.state';
import {currentUserReducer} from './current-user/current-user.reducer';
import {DashboardState} from './dashboard/dashboard.state';
import {dashboardReducer} from './dashboard/dashboard.reducer';
import {VisualizationState} from './visualization/visualization.state';
import {visualizationReducer} from './visualization/visualization.reducer';
import {DictionaryState} from '../modules/dictionary/store/dictionary.state';
import {dictionaryReducer} from '../modules/dictionary/store/dictionary.reducer';
import {
  downloadsReducer,
  portalReducer,
  statsSummaryReducer,
  faqReducer,
  loadDataFromExternalSourcesReducer
} from './portal/portal.reducer';
import {DownloadsState, PortalConfigurationState, StatsSummaryState, FAQState, ExternalSourcesState} from './portal/portal.state';

export interface AppState {
  route: RouterReducerState;
  currentUser: CurrentUserState;
  dashboard: DashboardState;
  portalConfiguration: PortalConfigurationState;
  statsSummary: StatsSummaryState;
  downloads: DownloadsState;
  visualization: VisualizationState;
  metadataDictionary: DictionaryState[];
  faqs: FAQState;
  dataFromExternalSource: ExternalSourcesState;
}

export const reducers: ActionReducerMap<AppState> = {
  faqs: faqReducer,
  route: RouterReducer.routerReducer,
  currentUser: currentUserReducer,
  portalConfiguration: portalReducer,
  statsSummary: statsSummaryReducer,
  dashboard: dashboardReducer,
  downloads: downloadsReducer,
  visualization: visualizationReducer,
  metadataDictionary: dictionaryReducer,
  dataFromExternalSource: loadDataFromExternalSourcesReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
