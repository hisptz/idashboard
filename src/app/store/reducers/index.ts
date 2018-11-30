import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { environment } from '../../../environments/environment';

import { userReducer, UserState } from './user.reducer';
import { systemInfoReducer, SystemInfoState } from './system-info.reducer';
import { DashboardObjectState, dashboardObjectReducer } from './dashboard.reducer';
import { DashboardSettingsState, dashboardSettingsReducer } from './dashboard-settings.reducer';
import { DashboardVisualizationState, dashboardVisualizationReducer } from './dashboard-visualization.reducer';
import { DashboardGroupsState, dashboardGroupReducer } from './dashboard-groups.reducer';
import { LegendSetState, legendSetReducer } from './legend-set.reducer';
import { DataElementState, dataElementReducer } from './data-elements.reducer';
import { FunctionRuleState, functionRuleReducer } from './function-rule.reducer';
import { IndicatorState, indicatorReducer } from './indicactors.reducer';
import { DataItemMappingState, dataItemMappingReducer } from './data-item-mapping.reducer';
import { FunctionState, FunctionReducer } from './function.reducer';
import { DataSetState, DataSetReducer } from './data-set.reducer';
import { OrgUnitLevelState, orgUnitLevelReducer } from './orgUnit-level.reducer';

/**
 * Root state interface
 */
export interface State {
  /**
   * User state
   */
  user: UserState;

  orgUnitLevel: OrgUnitLevelState;

  /**
   * System info state
   */
  systemInfo: SystemInfoState;

  /**
   * Router state
   */
  route: RouterReducerState;
  dashboardObject: DashboardObjectState;
  dashboardGroups: DashboardGroupsState;
  dashboardSettings: DashboardSettingsState;
  dashboardVisualization: DashboardVisualizationState;
  legendSets: LegendSetState;
  dataElements: DataElementState;
  indicators: IndicatorState;
  dataItemMapping: DataItemMappingState;
  functionRules: FunctionRuleState;
  functions: FunctionState;
  dataSet: DataSetState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  orgUnitLevel: orgUnitLevelReducer,
  systemInfo: systemInfoReducer,
  route: routerReducer,
  dashboardObject: dashboardObjectReducer,
  dashboardGroups: dashboardGroupReducer,
  dashboardSettings: dashboardSettingsReducer,
  dashboardVisualization: dashboardVisualizationReducer,
  legendSets: legendSetReducer,
  dataElements: dataElementReducer,
  indicators: indicatorReducer,
  dataItemMapping: dataItemMappingReducer,
  functionRules: functionRuleReducer,
  functions: FunctionReducer,
  dataSet: DataSetReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/**
 * Root state selector
 * @param {State} state
 * @returns {State} state
 */
export const getRootState = (state: State) => state;
