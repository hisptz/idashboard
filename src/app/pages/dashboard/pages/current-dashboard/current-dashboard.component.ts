import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers';

import { DashboardItem } from '../../models/dashboard-item.model';
import {
  getCurrentDashboardItems,
  getCurrentDashboard
} from '../../store/selectors/dashboard-selectors';
import { Dashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css']
})
export class CurrentDashboardComponent implements OnInit {
  dashboardItems$: Observable<DashboardItem[]>;
  currentDashboard$: Observable<Dashboard>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.dashboardItems$ = this.store.pipe(select(getCurrentDashboardItems));

    this.currentDashboard$ = this.store.pipe(select(getCurrentDashboard));
  }
}
