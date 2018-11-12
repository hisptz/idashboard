import {Component, Input, OnInit} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() visualizationObjects$: any;
  visualizationObjects1: Array<any>;
  visualizationObjects2: Array<any>;
  @Input() currentUser$: any;
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
    const arr = [];
    const objArr = [];
    if (this.visualizationObjects$) {
      this.visualizationObjects1.push(this.visualizationObjects$[0]);
      this.visualizationObjects2.push(this.visualizationObjects$[1]);
    }
  }

}
