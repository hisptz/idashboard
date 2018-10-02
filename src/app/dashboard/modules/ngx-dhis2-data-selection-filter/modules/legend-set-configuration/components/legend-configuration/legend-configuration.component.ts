import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Legend } from '../../models/legend-set';
import { DELETE_ICON } from '../../icons';

@Component({
  selector: 'app-legend-configuration',
  templateUrl: './legend-configuration.component.html',
  styleUrls: ['./legend-configuration.component.css']
})
export class LegendConfigurationComponent implements OnInit {
  @Input()
  legend: Legend;

  color: string;
  name: string;
  startValue: number;
  endValue: number;

  arrowDownIcon: string;

  @Output()
  legendUpdates = new EventEmitter();

  @Output()
  deleteLegend = new EventEmitter();

  constructor() {
    this.arrowDownIcon = DELETE_ICON;
  }

  onColorSelect(color: string) {
    this.color = color;
    this.onLegendUpdate();
  }

  onLegendUpdate() {
    const { id } = this.legend;
    const color = this.color;
    const name = this.name;
    const startValue = this.startValue;
    const endValue = this.endValue;
    this.legendUpdates.emit({ id, color, name, startValue, endValue });
  }

  onDeleteLegend() {
    const { id } = this.legend;
    this.deleteLegend.emit({ id });
  }

  ngOnInit() {
    const { color } = this.legend;
    const { name } = this.legend;
    const { startValue } = this.legend;
    const { endValue } = this.legend;
    this.color = color;
    this.name = name;
    this.endValue = endValue;
    this.startValue = startValue;
  }
}
