import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() visualizationObjects$: any;
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
  }

}
