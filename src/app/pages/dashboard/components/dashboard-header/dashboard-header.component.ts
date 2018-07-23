import { Component, OnInit } from '@angular/core';
import {AppState} from '../../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Dashboard} from '../../../../store/dashboard/dashboard.state';
import * as dashboardSelectors from '../../../../store/dashboard/dashboard.selectors';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  currentDashboard$: Observable<Dashboard>;
  message: string;
  constructor(private store: Store<AppState>) {
    this.currentDashboard$ = this.store.select(dashboardSelectors.getCurrentDashboard);
  }

  ngOnInit() {
  }

  setMessage() {
    console.log('set message');
    this.message = 'To download a chart, table, map etc. use the buttons seen at the bottom when your cursor is on top of the item';
  }
  unsetMessage () {
    console.log('unset message')
    this.message = '';
  }
}
