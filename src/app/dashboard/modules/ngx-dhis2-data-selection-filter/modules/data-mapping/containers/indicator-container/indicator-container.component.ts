import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-indicator-container',
  templateUrl: './indicator-container.component.html',
  styleUrls: ['./indicator-container.component.css']
})
export class IndicatorContainerComponent implements OnInit {
  @Input() selectedItems: any;
  @Input() functionRules: any;
  @Input() indicatorIdToName: any;
  @Output() indicatorNamingClose = new EventEmitter();

  indicators: any[];
  functionObjectMapper: any;

  constructor() {
    this.indicators = [];
  }

  ngOnInit() {
    if (this.functionRules && this.selectedItems) {
      const functionObjectMapper = _.keyBy(this.functionRules, 'id');
      this.indicators = _.sortBy(
        _.map(this.selectedItems, (selectedItem: any) => {
          const { id } = selectedItem;
          const indicator = functionObjectMapper[id];
          return {
            id,
            name: indicator.name
          };
        }),
        indicator => {
          return indicator.name;
        }
      );
      this.functionObjectMapper = functionObjectMapper;
    }
  }

  onUpdateIndictor(indicatorObject: any) {
    const { indicator } = indicatorObject;
    const { id, name } = indicator;
    this.functionObjectMapper[id].name = name;
  }

  trackByFn(index, item) {
    return item && item.id ? item.id : index;
  }

  onCloseIndicatorNaming() {
    this.indicatorNamingClose.emit({});
  }

  onSaveIndicatorNaming() {
    this.indicatorNamingClose.emit({
      rules: _.values(this.functionObjectMapper)
    });
  }
}
