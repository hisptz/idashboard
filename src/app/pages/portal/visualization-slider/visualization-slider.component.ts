import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-visualization-slider',
  templateUrl: './visualization-slider.component.html',
  styleUrls: ['./visualization-slider.component.css']
})
export class VisualizationSliderComponent implements OnInit {

  @Input() visualizationObjects: any;
  @Input() currentUser: any;
  @Input() activeSliderGroup: string;
  @Input() dashboardsGroups: any;
  keyedDashboards = {};
  dashboardAccess: {
    delete: true
    externalize: true
    manage: true
    read: true
    update: true
    write: true
  };
  constructor() { }

  ngOnInit() {
    if (this.dashboardsGroups) {
      this.dashboardsGroups.forEach((dashboard) => {
        dashboard['dashboardItems'].forEach((item) => {
          this.keyedDashboards[item.id] = dashboard.name
        });
      });
    }
  }

  favoriteDescription(visualizationObj) {
    if (visualizationObj['layers'][0]['analytics']['rows'].length > 0) {
      const periodType = '';
      const chartType = visualizationObj.layers[0]['settings']['type'];
      const periodCount = visualizationObj.layers[0]['filters'][0]['items'].length;
      const visualizationDescription = 'The ' + chartType + ' chart shows data for the';

      return visualizationDescription;
    }
    // if (visualizationObj && visualizationObj.layers[0]['filters'][0]['items'].length > 0) {
    //   const periodType = '';
    //   const periodCount = visualizationObj.layers[0]['filters'][0]['items'].length;
    //   const visualizationDescription = 'For the ' + periodCount + ' ' + periodType + ' the has been changes in the data as follows :-';
    //   if (visualizationObj) {
    //     visualizationObj.layers[0]['filters'][0]['items'].forEach((periodItem) => {
    //       console.log(periodItem);
    //     });
    //   }
    // }
  }
}
