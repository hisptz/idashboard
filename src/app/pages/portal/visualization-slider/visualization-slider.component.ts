import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-visualization-slider',
  templateUrl: './visualization-slider.component.html',
  styleUrls: ['./visualization-slider.component.css']
})
export class VisualizationSliderComponent implements OnInit {

  @Input() visualizationObjects$: any;
  visualizationObjects1: Array<any>;
  visualizationObjects2: Array<any>;
  @Input() currentUser$: any;
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
    if (this.visualizationObjects$) {
      this.visualizationObjects1.push(this.visualizationObjects$[0]);
      this.visualizationObjects2.push(this.visualizationObjects$[1]);
      console.log('vis', this.visualizationObjects$);
    }
  }
}
