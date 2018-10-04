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
import {PageState, SinglePageState} from './pages/page.state';
import {pageReducer, singlePageReducer, singleFAQsHelpPageReducer} from './pages/page.reducer';

export interface AppState {
  route: RouterReducerState;
  currentUser: CurrentUserState;
  dashboard: DashboardState;
  page: PageState;
  FAQsHelp: SinglePageState;
  singlePage: SinglePageState;
  visualization: VisualizationState;
  metadataDictionary: DictionaryState[];
}

export const reducers: ActionReducerMap<AppState> = {
  route: RouterReducer.routerReducer,
  currentUser: currentUserReducer,
  page: pageReducer,
  singlePage: singlePageReducer,
  FAQsHelp: singleFAQsHelpPageReducer,
  dashboard: dashboardReducer,
  visualization: visualizationReducer,
  metadataDictionary: dictionaryReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
