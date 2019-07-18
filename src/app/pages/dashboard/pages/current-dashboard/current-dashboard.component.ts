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
  enableViewMode
} from '../../store/actions/dashboard.actions';
import { DashboardModeState } from '../../models/dashboard-mode.mode';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css']
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboard$: Observable<Dashboard>;
  selectionFilterConfig$: Observable<SelectionFilterConfig>;
  dashboardMode$: Observable<DashboardModeState>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.currentDashboard$ = this.store.pipe(select(getCurrentDashboard));
    this.selectionFilterConfig$ = this.store.pipe(
      select(getSelectionFilterConfig)
    );
    this.dashboardMode$ = this.store.pipe(select(getDashboardMode));
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
}
