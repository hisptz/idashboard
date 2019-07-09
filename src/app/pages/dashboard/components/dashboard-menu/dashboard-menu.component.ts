import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { DashboardPreferences } from '../../models/dashboard-preferences.model';
import { Dashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMenuComponent implements OnInit {
  @Input() dashboardPreferences: DashboardPreferences;
  @Input() dashboards: Dashboard[];
  @Input() currentDashboardId: string;

  @Output()
  setCurrentDashboard: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  onSetCurrentDashboard(id: string) {
    this.setCurrentDashboard.emit(id);
  }
}
