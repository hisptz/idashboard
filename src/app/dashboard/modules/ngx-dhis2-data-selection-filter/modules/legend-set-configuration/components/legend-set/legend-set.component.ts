import { Component, OnInit, Input } from '@angular/core';
import { LegendSet, Legend } from '../../models/legend-set';

@Component({
  selector: 'app-legend-set',
  templateUrl: './legend-set.component.html',
  styleUrls: ['./legend-set.component.css']
})
export class LegendSetComponent implements OnInit {
  @Input()
  legendSet: LegendSet;
  constructor() {}

  ngOnInit() {}

  onLegendUpdates(legend: Legend) {
    console.log(legend);
  }
}
