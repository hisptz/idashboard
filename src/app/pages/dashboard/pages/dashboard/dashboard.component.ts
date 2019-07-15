import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { loadDashboardPreferences } from '../../store/actions/dashboard-preferences.actions';
import { Observable } from 'rxjs';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { Dashboard } from '../../models/dashboard.model';
import { getDashboardPreferences } from '../../store/selectors/dashboard-preferences.selectors';
import {
  getDashboards,
  getCurrentDashboardId
} from '../../store/selectors/dashboard-selectors';
import { setCurrentDashboard } from '../../store/actions/dashboard.actions';
import { LoadDataFilters } from '@iapps/ngx-dhis2-data-filter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardPreferences$: Observable<DashboardPreferences>;
  dashboards$: Observable<Dashboard[]>;
  currentDashboardId$: Observable<string>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(loadDashboardPreferences());

    this.dashboardPreferences$ = this.store.pipe(
      select(getDashboardPreferences)
    );

    this.dashboards$ = this.store.pipe(select(getDashboards));

    this.currentDashboardId$ = this.store.pipe(select(getCurrentDashboardId));
  }

  onSetCurrentDashboard(id: string) {
    this.store.dispatch(setCurrentDashboard({ id }));
  }
}
