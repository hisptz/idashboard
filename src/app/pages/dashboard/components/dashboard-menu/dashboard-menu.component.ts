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
import { DashboardModeState } from '../../models/dashboard-mode.mode';

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
  @Input() dashboardMode: DashboardModeState;

  @Output()
  setCurrentDashboard: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  addDashboard: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  onSetCurrentDashboard(id: string) {
    this.setCurrentDashboard.emit(id);
  }

  onAddDashboard() {
    this.addDashboard.emit();
  }
}
