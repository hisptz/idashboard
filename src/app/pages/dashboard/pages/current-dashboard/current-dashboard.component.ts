import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers';

import { DashboardItem } from '../../models/dashboard-item.model';
import { getCurrentDashboardItems } from '../../store/selectors/dashboard-selectors';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css']
})
export class CurrentDashboardComponent implements OnInit {
  dashboardItems$: Observable<DashboardItem[]>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.dashboardItems$ = this.store.pipe(select(getCurrentDashboardItems));
  }
}
