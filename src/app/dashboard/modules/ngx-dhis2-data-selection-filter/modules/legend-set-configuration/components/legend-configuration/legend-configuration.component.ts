import { Component, OnInit, Input } from '@angular/core';
import { Legend } from '../../models/legend-set';

@Component({
  selector: 'app-legend-configuration',
  templateUrl: './legend-configuration.component.html',
  styleUrls: ['./legend-configuration.component.css']
})
export class LegendConfigurationComponent implements OnInit {
  @Input()
  legend: Legend;
  constructor() {}

  ngOnInit() {}
}
