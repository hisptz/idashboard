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
    if (this.visualizationObjects) {
      console.log('visualizationObjects$', this.visualizationObjects);
    }
  }
}
