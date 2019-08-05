import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { DashboardModeState } from '../../models/dashboard-mode.mode';

@Component({
  selector: 'app-dashboard-mode',
  templateUrl: './dashboard-mode.component.html',
  styleUrls: ['./dashboard-mode.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardModeComponent implements OnInit {
  @Input() dashboardMode: DashboardModeState;

  @Input() showMode: boolean;

  @Output() toggleDashboardMode: EventEmitter<
    DashboardModeState
  > = new EventEmitter<DashboardModeState>();

  @Output() saveDashboard: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onToggleMode(e) {
    e.stopPropagation();
    this.toggleDashboardMode.emit(this.dashboardMode);
  }

  onSave(e) {
    e.stopPropagation();
    this.saveDashboard.emit();
  }
}
