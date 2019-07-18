import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DashboardModeState } from '../../models/dashboard-mode.mode';

@Component({
  selector: 'app-dashboard-title',
  templateUrl: './dashboard-title.component.html',
  styleUrls: ['./dashboard-title.component.css']
})
export class DashboardTitleComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() dashboardMode: DashboardModeState;

  @Output() enableEditing: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onEnableInput(e) {
    e.stopPropagation();
    this.enableEditing.emit(null);
  }
}
