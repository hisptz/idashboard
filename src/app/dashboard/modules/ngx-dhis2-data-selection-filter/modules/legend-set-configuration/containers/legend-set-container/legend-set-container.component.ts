import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { LegendSet } from '../../models/legend-set';
import { DEFAULT_LEGENDS } from '../../constants/default-legend';
import * as _ from 'lodash';

@Component({
  selector: 'app-legend-set-container',
  templateUrl: './legend-set-container.component.html',
  styleUrls: ['./legend-set-container.component.css']
})
export class LegendSetContainerComponent implements OnInit, OnDestroy {
  @Input()
  selectedItems;
  @Input()
  legendSetEntities;

  @Output()
  legendSetConfigurationClose = new EventEmitter();
  legendSets: LegendSet[];

  color: string;
  constructor() {
    this.color = '#000000';
  }

  ngOnInit() {
    this.legendSets = this.getLengenSetsConfiguration(
      this.selectedItems,
      DEFAULT_LEGENDS,
      this.legendSetEntities
    );
  }

  getLengenSetsConfiguration(
    selectedItems,
    defaultLegends,
    legendSetEntities
  ): LegendSet[] {
    return _.map(selectedItems, selectedItem => {
      return legendSetEntities && legendSetEntities[selectedItem.id]
        ? legendSetEntities[selectedItem.id]
        : {
            id: selectedItem.id,
            name: selectedItem.name,
            legends: defaultLegends
          };
    });
  }

  ngOnDestroy() {}
}
