import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { DashboardItem } from '../../models/dashboard-item.model';
import { Visualization } from '../../modules/ngx-dhis2-visualization/models';
import { User, SystemInfo } from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardItemComponent implements OnInit {
  @Input()
  dashboardItem: DashboardItem;

  @Input() currentUser: User;

  @Input() systemInfo: SystemInfo;

  @Input()
  isNew: boolean;
  constructor() {}

  ngOnInit() {}
}
