import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Dashboard, DashboardGroups } from '../../models';
import { User } from '../../../models';
import { getDataSelectionSummary, getOuSelectionSummary, getPeSelectionSummary } from '../../helpers';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMenuComponent {
  @Input()
  dashboardMenuList: Dashboard[];
  @Input()
  currentUser: User;
  @Input()
  currentDashboardId: string;

  @Input()
  currentDashboard: Dashboard;

  @Input()
  dashboardGroups: DashboardGroups[];

  @Input()
  activeDashboardGroupId: string;

  @Output()
  setCurrentDashboard: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  setActiveDashboardGroup: EventEmitter<DashboardGroups> = new EventEmitter<DashboardGroups>();

  @Output()
  createDashboard: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  toggleDashboardBookmark: EventEmitter<{
    id: string;
    bookmarked: boolean;
    supportBookmark;
  }> = new EventEmitter();
  headerMessage: string;
  headerMessage1: string;

  public dropdownList = [{ name: 'About', url: 'pages/about' }];
  constructor() {
    this.headerMessage = 'National Malaria Program';
    this.headerMessage1 = 'Monthly Surveillance and Logistics Report';
  }

  onSetCurrentDashboard(dashboardId: string) {
    this.setCurrentDashboard.emit(dashboardId);
  }

  onSetActiveDashboardGroup(group: DashboardGroups) {
    this.setActiveDashboardGroup.emit(group);
  }

  onToggleDashboardMenuItemBookmark(dashboardMenuDetails: any) {
    this.toggleDashboardBookmark.emit(dashboardMenuDetails);
  }

  onCreateDashboard(dashboardName: string) {
    this.createDashboard.emit(dashboardName);
  }

  get periodSelectionSummary() {
    return getPeSelectionSummary(this.currentDashboard.globalSelections);
  }
  get orgUnitSelectionSummary() {
    return getOuSelectionSummary(this.currentDashboard.globalSelections, this.currentUser);
  }
}
