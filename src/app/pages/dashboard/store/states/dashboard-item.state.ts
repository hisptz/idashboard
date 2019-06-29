import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BaseState, initialBaseState } from 'src/app/store/states/base.state';

import { DashboardItem } from '../../models/dashboard-item.model';

export interface DashboardItemState
  extends EntityState<DashboardItem>,
    BaseState {}

export const dashboardItemAdapter: EntityAdapter<
  DashboardItem
> = createEntityAdapter<DashboardItem>();

export const initialDashboardItemState: DashboardItemState = dashboardItemAdapter.getInitialState(
  initialBaseState
);
