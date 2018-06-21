import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import * as visualizationSelectors from '../../store/visualization/visualization.selectors';
import { CurrentUserState } from '../../store/current-user/current-user.state';
import { getCurrentUser } from '../../store/current-user/current-user.selectors';
import { Observable } from 'rxjs/Observable';
import { Visualization } from '../../store/visualization/visualization.state';
import { WELCOMING_DESCRIPTION, WELCOMING_TITLE } from '../../constants/welcoming-messages.constants';
import { Dashboard } from '../../store/dashboard/dashboard.state';
import { getCurrentDashboard } from '../../store/dashboard/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  visualizationObjects$: Observable<Visualization[]>;
  currentUser$: Observable<CurrentUserState>;
  visualizationLoading$: Observable<boolean>;
  currentDashboard$: Observable<Dashboard>;
  welcomingTitle: string;
  welcomingDescription: string;
  emptyVisualizationMessage: string;

  constructor(private store: Store<AppState>) {
    this.visualizationObjects$ = store.select(
      visualizationSelectors.getCurrentDashboardVisualizationObjects
    );
    this.currentUser$ = store.select(getCurrentUser);
    this.visualizationLoading$ = store.select(visualizationSelectors.getVisualizationLoadingState);
    this.currentDashboard$ = store.select(getCurrentDashboard);
    this.welcomingTitle = WELCOMING_TITLE;
    this.welcomingDescription = WELCOMING_DESCRIPTION;
    this.emptyVisualizationMessage =
      'There are no items on this dashboard, search for charts, tables, maps and many more and add them to your dashboard';
  }

  ngOnInit() {
  }

}
