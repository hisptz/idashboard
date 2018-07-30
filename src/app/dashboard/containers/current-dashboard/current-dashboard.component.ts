import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Dashboard } from '../../models';
import {
  getCurrentUser,
  State,
  getCurrentDashboardVisualizations,
  getCurrentDashboard,
  ToggleDashboardBookmarkAction,
  AddDashboardItemAction,
  AddNewUnsavedFavoriteAction
} from '../../../store';
import { User } from '../../../models';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboardVisualizations$: Observable<Array<string>>;
  currentDashboard$: Observable<Dashboard>;
  currentUser$: Observable<User>;

  // TODO find best way
  newFavorites: any[] = [];
  constructor(private store: Store<State>) {
    this.currentDashboardVisualizations$ = store.select(
      getCurrentDashboardVisualizations
    );

    this.currentDashboard$ = store.select(getCurrentDashboard);
    this.currentUser$ = store.select(getCurrentUser);
  }

  ngOnInit() {}

  onToggleCurrentDashboardBookmark(dashboardDetails: {
    id: string;
    supportBookmark: boolean;
    bookmarked: boolean;
  }) {
    this.store.dispatch(
      new ToggleDashboardBookmarkAction(
        dashboardDetails.id,
        dashboardDetails.supportBookmark,
        {
          bookmarked: dashboardDetails.bookmarked,
          bookmarkPending: true
        }
      )
    );
  }

  onAddDashboardItem(dashboardFavoriteDetails: {
    dashboardId: string;
    dashboardItem: any;
  }) {
    this.store.dispatch(
      new AddDashboardItemAction(
        dashboardFavoriteDetails.dashboardId,
        dashboardFavoriteDetails.dashboardItem
      )
    );
  }

  onCreateFavoriteForCurrentDashboard(dashboardId: string) {
    this.newFavorites = [
      ...this.newFavorites,
      `new_${dashboardId}_${this.newFavorites.length + 1}`
    ];
    this.store.dispatch(
      new AddNewUnsavedFavoriteAction(dashboardId, {
        hasNewUnsavedFavorite: true
      })
    );
  }
}