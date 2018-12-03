import { Component, Input, OnInit } from '@angular/core';
import { Visualization } from '../../../../store/visualization/visualization.state';
import { CurrentUserState } from '../../../../store/current-user/current-user.state';
import { DashboardAccess } from '../../../../store/dashboard/dashboard.state';

@Component({
  selector: 'app-visualization-list',
  templateUrl: './visualization-list.component.html',
  styleUrls: ['./visualization-list.component.css']
})
export class VisualizationListComponent implements OnInit {
  @Input()
  visualizationObjects: Visualization[];

  @Input()
  currentUser: CurrentUserState;

  @Input()
  dashboardAccess: DashboardAccess;

  constructor() {
  }

  ngOnInit() {
    if (this.visualizationObjects) {
      this.visualizationObjects.forEach((visualization) => {
        console.log('details', JSON.stringify(visualization.details));
      });
    }
  }
}
