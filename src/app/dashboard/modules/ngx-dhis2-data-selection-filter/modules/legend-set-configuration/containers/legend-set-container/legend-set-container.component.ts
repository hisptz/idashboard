import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { LegendSet } from '../../models/legend-set';
import * as _ from 'lodash';
import { ARROW_DOWN_ICON } from '../../icons/arrow-down.icon';
import * as legendHelper from '../../helpers';
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
    const legendSets: LegendSet[] = legendHelper.getLegendSetsConfiguration(
      this.selectedItems,
      this.legendSetEntities
    );
    this.currentLegendSet =
      legendSets && legendSets.length > 0 ? legendSets[0].id : '';
    this.legendSets = legendSets;
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

  saveCOnfigurations(event) {
    event.stopPropagation();
    this.legendSetConfigurationClose.emit(this.legendSets);
  }

  ngOnDestroy() {}
}
