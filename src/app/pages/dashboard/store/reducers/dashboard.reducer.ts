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
  removeDashboardSuccess,
  saveDashboard,
  setCurrentDashboard,
  updateDashboard,
  toggleDashboardMode,
  enableEditMode,
  enableViewMode,
  addDashboard,
  saveDashboardSuccess,
  saveDashboardFail
} from '../actions/dashboard.actions';
import {
  dashboardAdapter,
  DashboardState,
  initialDashboardState
} from '../states/dashboard.state';
import { DashboardMode } from '../../constants/dashboard-modes.constant';

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
  on(addDashboard, (state, { dashboard }) =>
    dashboardAdapter.addOne(dashboard, {
      ...state,
      dashboardMode: DashboardMode.EDIT
    })
  ),
  on(saveDashboard, (state, { originalId, dashboard }) =>
    dashboardAdapter.updateOne(
      { id: originalId, changes: dashboard },
      { ...state, dashboardMode: DashboardMode.SAVE }
    )
  ),
  on(saveDashboardSuccess, state => ({
    ...state,
    dashboardMode: DashboardMode.VIEW
  })),
  on(saveDashboardFail, state => ({
    ...state,
    dashboardMode: DashboardMode.VIEW
  })),
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
  on(setCurrentDashboard, (state, { id }) => ({
    ...state,
    currentDashboard: id
  })),
  on(toggleDashboardMode, state => ({
    ...state,
    dashboardMode:
      state.dashboardMode === DashboardMode.VIEW
        ? DashboardMode.EDIT
        : DashboardMode.VIEW
  })),
  on(enableEditMode, state => ({
    ...state,
    dashboardMode: DashboardMode.EDIT
  })),
  on(enableViewMode, state => ({ ...state, dashboardMode: DashboardMode.VIEW }))
);

export function dashboardReducer(state, action): DashboardState {
  return reducer(state, action);
}
