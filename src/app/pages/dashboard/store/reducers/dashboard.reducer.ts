import { createReducer, on } from '@ngrx/store';
import {
  errorBaseState,
  loadedBaseState,
  loadingBaseState
} from 'src/app/store/states/base.state';

import {
  addDashboards,
  loadDashboards,
  loadDashboardsFail,
  removeDashboard,
  saveDashboard,
  setCurrentDashboard,
  updateDashboard,
  removeDashboardSuccess
} from '../actions/dashboard.actions';
import {
  dashboardAdapter,
  DashboardState,
  initialDashboardState
} from '../states/dashboard.state';

const reducer = createReducer(
  initialDashboardState,
  on(loadDashboards, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addDashboards, (state, { dashboards }) =>
    dashboardAdapter.addMany(dashboards, {
      ...state,
      ...loadedBaseState
    })
  ),
  on(saveDashboard, (state, { dashboard }) =>
    dashboardAdapter.upsertOne(dashboard, state)
  ),
  on(updateDashboard, (state, { dashboard }) =>
    dashboardAdapter.updateOne({ id: dashboard.id, changes: dashboard }, state)
  ),
  on(removeDashboardSuccess, (state, { id }) =>
    dashboardAdapter.removeOne(id, state)
  ),
  on(loadDashboardsFail, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error
  })),
  on(setCurrentDashboard, (state, { dashboard }) => ({
    ...state,
    currentDashboard: dashboard ? dashboard.id : ''
  }))
);

export function dashboardReducer(state, action): DashboardState {
  return reducer(state, action);
}
