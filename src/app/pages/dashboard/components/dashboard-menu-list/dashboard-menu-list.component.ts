import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Dashboard } from '../../models/dashboard.model';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';

@Component({
  selector: 'app-dashboard-menu-list',
  templateUrl: './dashboard-menu-list.component.html',
  styleUrls: ['./dashboard-menu-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMenuListComponent implements OnInit {
  @Input() dashboards: Dashboard[];
  @Input() dashboardPreferences: DashboardPreferences;
  @Input() currentDashboardId: string;

  @Output()
  setCurrentDashboard: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onSetCurrentDashboard(id: string) {
    this.setCurrentDashboard.emit(id);
  }
}
