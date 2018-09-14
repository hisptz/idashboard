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
import { ARROW_DOWN_ICON } from '../../icons/arrow-down.icon';

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
  currentLegendSet: string;
  arrowDownIcon: string;

  constructor() {
    this.currentLegendSet = '';
    this.arrowDownIcon = ARROW_DOWN_ICON;
  }

  ngOnInit() {
    const legendSets: LegendSet[] = this.getLengenSetsConfiguration(
      this.selectedItems,
      DEFAULT_LEGENDS,
      this.legendSetEntities
    );
    this.currentLegendSet =
      legendSets && legendSets.length > 0 ? legendSets[0].id : '';
    this.legendSets = legendSets;
  }

  getLengenSetsConfiguration(
    selectedItems,
    defaultLegends,
    legendSetEntities
  ): LegendSet[] {
    return _.map(selectedItems, selectedItem => {
      const index = _.indexOf(selectedItems, selectedItem) + 1;
      return legendSetEntities && legendSetEntities[selectedItem.id]
        ? legendSetEntities[selectedItem.id]
        : {
            id: selectedItem.id,
            name: selectedItem.name ? selectedItem.name : 'item ' + index,
            legends: defaultLegends
          };
    });
  }

  onSetCurrentLegendSet(legendSet: LegendSet, event) {
    event.stopPropagation();
    this.currentLegendSet =
      legendSet && legendSet.id
        ? legendSet.id === this.currentLegendSet
          ? ''
          : legendSet.id
        : this.currentLegendSet;
  }

  trackByFn(index, item) {
    return item && item.id ? item.id : index;
  }

  ngOnDestroy() {}
}
