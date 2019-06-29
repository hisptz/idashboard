import {
  initialDashboardItemState,
  dashboardItemAdapter,
  DashboardItemState
} from '../states/dashboard-item.state';
import { on, createReducer } from '@ngrx/store';
import {
  addDashboardItems,
  updateDashboardItem,
  addDashboardItem
} from '../actions/dashboard-item.actions';

const reducer = createReducer(
  initialDashboardItemState,
  on(addDashboardItems, (state, { dashboardItems }) =>
    dashboardItemAdapter.addMany(dashboardItems, state)
  ),
  on(addDashboardItem, (state, { dashboardItem }) =>
    dashboardItemAdapter.addOne(dashboardItem, state)
  ),
  on(updateDashboardItem, (state, { id, changes }) =>
    dashboardItemAdapter.updateOne({ id, changes }, state)
  )
);

export function dashboardItemReducer(state, action): DashboardItemState {
  return reducer(state, action);
}
