import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Dashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard-menu-item',
  templateUrl: './dashboard-menu-item.component.html',
  styleUrls: ['./dashboard-menu-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMenuItemComponent implements OnInit {
  @Input() dashboard: Dashboard;
  @Input() menuAlignment: string;
  @Input() currentDashboardId: string;

  @Output()
  setDashboard: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  get isCurrent() {
    return this.dashboard && this.dashboard.id === this.currentDashboardId;
  }

  ngOnInit() {}

  onSetDashboard(e) {
    e.stopPropagation();
    if (this.currentDashboardId !== this.dashboard.id) {
      this.setDashboard.emit(this.dashboard.id);
    }
  }
}
