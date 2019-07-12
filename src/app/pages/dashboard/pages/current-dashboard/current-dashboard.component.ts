import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers';

import { DashboardItem } from '../../models/dashboard-item.model';
import { Dashboard } from '../../models/dashboard.model';
import { getCurrentDashboard } from '../../store/selectors/dashboard-selectors';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.css']
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboard$: Observable<Dashboard>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.currentDashboard$ = this.store.pipe(select(getCurrentDashboard));
  }

  trackByDashboardItemId(index, item: DashboardItem) {
    return item ? item.id : index;
  }
}
