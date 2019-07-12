import { createReducer, on } from '@ngrx/store';

import {
  addDashboardItems,
  loadDashboardItem,
  updateDashboardItem,
  loadDashboardItemFail
} from '../actions/dashboard-item.actions';
import {
  dashboardItemAdapter,
  initialDashboardItemState,
  DashboardItemState
} from '../states/dashboard-item.state';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

const reducer = createReducer(
  initialDashboardItemState,
  on(addDashboardItems, (state, { dashboardItems }) =>
    dashboardItemAdapter.addMany(dashboardItems, state)
  ),
  on(loadDashboardItem, (state, { dashboardItem }) =>
    dashboardItemAdapter.addOne(
      { ...dashboardItem, notification: loadingBaseState },
      state
    )
  ),
  on(updateDashboardItem, (state, { dashboardItem }) =>
    dashboardItemAdapter.updateOne(
      {
        id: dashboardItem.id,
        changes: { ...dashboardItem, notification: loadedBaseState }
      },
      state
    )
  ),
  on(loadDashboardItemFail, (state, { id, error }) =>
    dashboardItemAdapter.updateOne(
      {
        id,
        changes: {
          notification: {
            ...errorBaseState,
            error
          }
        }
      },
      state
    )
  )
);

export function dashboardItemReducer(state, action): DashboardItemState {
  return reducer(state, action);
}
