import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

import { SelectionFilterConfig } from '@iapps/ngx-dhis2-selection-filters';
import { getMergedDataSelections } from '../../helpers';
import { VisualizationDataSelection } from '../../models/visualization-data-selection.model';
import { VisualizationLayer } from '../../models/visualization-layer.model';

@Component({
  selector: 'visualization-header-section',
  templateUrl: 'visualization-header-section.html',
  styleUrls: ['./visualization-header-section.css']
})
export class VisualizationHeaderSectionComponent {
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  isNew: string;
  @Input()
  uiConfigId: string;
  @Input()
  showFilters: boolean;
  @Input()
  hideResizeButtons: boolean;
  @Input()
  fullScreen: boolean;
  @Input()
  visualizationLayer: VisualizationLayer;

  @Input()
  favoriteType: string;

  showNameInput: boolean;

  @Output()
  visualizationLayerUpdate: EventEmitter<VisualizationLayer> = new EventEmitter<
    VisualizationLayer
  >();

  @Output()
  togglefullScreen: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  savefavorite: EventEmitter<any> = new EventEmitter<any>();

  selectionFilterConfig: SelectionFilterConfig;

  constructor() {
    this.selectionFilterConfig = {
      showPeriodFilter: true,
      showOrgUnitFilter: true,
      showLayout: true,
      showDataFilter: false
    };
  }

  onToggleFullScreenAction(id) {
    this.togglefullScreen.emit(!this.fullScreen);
  }

  onFilterUpdateAction(dataSelections: VisualizationDataSelection[]) {
    this.visualizationLayerUpdate.emit({
      ...this.visualizationLayer,
      dataSelections: _.sortBy(
        getMergedDataSelections(
          this.visualizationLayer.dataSelections,
          dataSelections,
          this.favoriteType
        ),
        'layoutOrder'
      )
    });
  }

  onToggleNameInput(e) {
    e.stopPropagation();
    this.showNameInput = !this.showNameInput;
  }

  onSaveFavorite(e) {
    if (this.name.trim() !== '') {
      this.savefavorite.emit({ name: this.name, isNew: this.isNew });
      this.showNameInput = false;
    }
  }
}
