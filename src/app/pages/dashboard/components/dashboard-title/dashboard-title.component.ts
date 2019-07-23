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
  @Output() nameUpdate: EventEmitter<{
    id: string;
    name: string;
  }> = new EventEmitter<{
    id: string;
    name: string;
  }>();

  constructor() {}

  ngOnInit() {}

  onEnableInput(e) {
    e.stopPropagation();
    this.enableEditing.emit(null);
  }

  onUpdateName(e) {
    e.stopPropagation();
    this.nameUpdate.emit({ id: this.id, name: e.target.value });
  }
}
