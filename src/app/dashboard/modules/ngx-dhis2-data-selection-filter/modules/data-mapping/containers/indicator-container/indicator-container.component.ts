import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-indicator-container',
  templateUrl: './indicator-container.component.html',
  styleUrls: ['./indicator-container.component.css']
})
export class IndicatorContainerComponent implements OnInit {
  @Input() selectedItems: any;
  @Input() functionRules: any;
  constructor() {}

  ngOnInit() {}
}
