import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SystemInfo, User } from '@iapps/ngx-dhis2-http-client';
import { SelectionFilterConfig } from '@iapps/ngx-dhis2-selection-filters';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { State } from 'src/app/store/reducers';
import {
  getCurrentUser,
  getCurrentUserManagementAuthoritiesStatus,
  getSystemInfo
} from 'src/app/store/selectors';

import { DashboardItem } from '../../models/dashboard-item.model';
import { DashboardModeState } from '../../models/dashboard-mode.mode';
import { Dashboard } from '../../models/dashboard.model';
import { VisualizationDataSelection } from '../../modules/ngx-dhis2-visualization/models';
import {
  enableEditMode,
  enableViewMode,
  initializeDashboardSave,
  toggleDashboardMode,
  updateDashboard
} from '../../store/actions/dashboard.actions';
import { globalFilterChange } from '../../store/actions/global-filter.actions';
import { getSelectionFilterConfig } from '../../store/selectors/dashboard-preferences.selectors';
import {
  getCurrentDashboard,
  getDashboardMode,
  getOverallDashboardLoadingStatus,
  getDashboardLoadingStatus
} from '../../store/selectors/dashboard-selectors';
import { getCurrentGlobalDataSelections } from '../../store/selectors/global-filter.selectors';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboard$: Observable<Dashboard>;
  selectionFilterConfig$: Observable<SelectionFilterConfig>;
  dashboardMode$: Observable<DashboardModeState>;
  currentUser$: Observable<User>;
  systemInfo$: Observable<SystemInfo>;
  globalDataSelections$: Observable<VisualizationDataSelection[]>;
  userIsAdmin$: Observable<boolean>;
  dashboardLoading$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.currentDashboard$ = this.store.pipe(select(getCurrentDashboard));
    this.selectionFilterConfig$ = this.store.pipe(
      select(getSelectionFilterConfig)
    );
    this.dashboardMode$ = this.store.pipe(select(getDashboardMode));
    this.currentUser$ = this.store.pipe(select(getCurrentUser));
    this.systemInfo$ = this.store.pipe(select(getSystemInfo));
    this.globalDataSelections$ = this.store.pipe(
      select(getCurrentGlobalDataSelections)
    );
    this.userIsAdmin$ = this.store.pipe(
      select(getCurrentUserManagementAuthoritiesStatus)
    );
    this.dashboardLoading$ = this.store.pipe(select(getDashboardLoadingStatus));
  }

  trackByDashboardItemId(index, item: DashboardItem) {
    return item ? item.id : index;
  }

  onToggleDashboardMode() {
    this.store.dispatch(toggleDashboardMode());
  }

  onEnableEditMode() {
    this.store.dispatch(enableEditMode());
  }

  onEnableViewMode() {
    this.store.dispatch(enableViewMode());
  }

  onDashboardNameUpdate(dashboard: Dashboard) {
    this.store.dispatch(updateDashboard({ dashboard }));
  }

  onSaveDashboard() {
    this.store.dispatch(initializeDashboardSave());
  }

  onFilterUpdate(dataSelections: VisualizationDataSelection[]) {
    this.currentDashboard$.pipe(take(1)).subscribe((dashboard: Dashboard) => {
      this.store.dispatch(globalFilterChange({ dataSelections, dashboard }));
    });
  }
}
