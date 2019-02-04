import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { LegendSet, Legend } from '../../models/legend-set';
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
  @Input()
  visualizationLayerId: string;
  @Input() functionRules: any;

  @Output()
  legendSetConfigurationClose = new EventEmitter();
  @Output()
  legendSetConfigurationSave = new EventEmitter();

  legendSets: LegendSet[];
  currentLegendSet: string;
  arrowDownIcon: string;

  constructor() {
    this.currentLegendSet = '';
    this.arrowDownIcon = ARROW_DOWN_ICON;
  }

  ngOnInit() {
    const functionRulesObject = _.keyBy(this.functionRules, 'id');
    const legendSets: LegendSet[] = legendHelper.getLegendSetsConfiguration(
      this.selectedItems,
      functionRulesObject,
      this.legendSetEntities,
      this.visualizationLayerId
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

  addNewLegend(event, legendSetId) {
    event.stopPropagation();
    this.legendSets = _.forEach(this.legendSets, legendSet => {
      if (legendSet.id === legendSetId) {
        const { legends } = legendSet;
        const legend: Legend = legendHelper.getNewLegend(legends);
        legendSet.legends = _.sortBy([...legends, legend], 'startValue');
      }
    });
  }

  trackByFn(index, item) {
    return item && item.id ? item.id : index;
  }

  closeConfigurations(event) {
    event.stopPropagation();
    this.legendSetConfigurationClose.emit();
  }

  saveCofigurations(event) {
    event.stopPropagation();
    this.legendSetConfigurationSave.emit(this.legendSets);
  }

  ngOnDestroy() {}
}
