import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers';

import { DashboardModeState } from '../../models/dashboard-mode.mode';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { Dashboard } from '../../models/dashboard.model';
import { loadDashboardPreferences } from '../../store/actions/dashboard-preferences.actions';
import {
  createDashboard,
  setCurrentDashboard
} from '../../store/actions/dashboard.actions';
import { getDashboardPreferences } from '../../store/selectors/dashboard-preferences.selectors';
import {
  getCurrentDashboardId,
  getDashboardMode,
  getDashboards
} from '../../store/selectors/dashboard-selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardPreferences$: Observable<DashboardPreferences>;
  dashboards$: Observable<Dashboard[]>;
  currentDashboardId$: Observable<string>;
  dashboardMode$: Observable<DashboardModeState>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(loadDashboardPreferences());

    this.dashboardPreferences$ = this.store.pipe(
      select(getDashboardPreferences)
    );

    this.dashboards$ = this.store.pipe(select(getDashboards));

    this.currentDashboardId$ = this.store.pipe(select(getCurrentDashboardId));

    this.dashboardMode$ = this.store.pipe(select(getDashboardMode));
  }

  onSetCurrentDashboard(id: string) {
    this.store.dispatch(setCurrentDashboard({ id }));
  }

  onAddDashboard() {
    this.store.dispatch(createDashboard());
  }
}
