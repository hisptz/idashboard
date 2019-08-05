import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers';

import { DashboardItem } from '../../models/dashboard-item.model';
import { Dashboard } from '../../models/dashboard.model';
import {
  getCurrentDashboard,
  getDashboardMode
} from '../../store/selectors/dashboard-selectors';
import { SelectionFilterConfig } from '@iapps/ngx-dhis2-selection-filters';
import { getSelectionFilterConfig } from '../../store/selectors/dashboard-preferences.selectors';
import {
  toggleDashboardMode,
  enableEditMode,
  enableViewMode,
  updateDashboard,
  initializeDashboardSave
} from '../../store/actions/dashboard.actions';
import { DashboardModeState } from '../../models/dashboard-mode.mode';
import { User, SystemInfo } from '@iapps/ngx-dhis2-http-client';
import {
  getCurrentUser,
  getSystemInfo,
  getCurrentUserManagementAuthoritiesStatus
} from 'src/app/store/selectors';
import { VisualizationDataSelection } from '../../modules/ngx-dhis2-visualization/models';
import { globalFilterChange } from '../../store/actions/global-filter.actions';
import { getCurrentGlobalDataSelections } from '../../store/selectors/global-filter.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css']
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboard$: Observable<Dashboard>;
  selectionFilterConfig$: Observable<SelectionFilterConfig>;
  dashboardMode$: Observable<DashboardModeState>;
  currentUser$: Observable<User>;
  systemInfo$: Observable<SystemInfo>;
  globalDataSelections$: Observable<VisualizationDataSelection[]>;
  userIsAdmin$: Observable<boolean>;

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
