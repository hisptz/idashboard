import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit
} from '@angular/core';
import * as _ from 'lodash';

import {
  getVisualizationLayout,
  getVisualizationMetadataIdentifiers
} from '../../helpers';
import { VisualizationConfig } from '../../models/visualization-config.model';
import { VisualizationLayer } from '../../models/visualization-layer.model';
import { VisualizationUiConfig } from '../../models/visualization-ui-config.model';
import { ChartListComponent } from '../../modules/ngx-dhis-chart/components/chart-list/chart-list.component';
import { TableListComponent } from '../../modules/ngx-dhis2-table/components/table-list/table-list.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'visualization-body-section',
  templateUrl: 'visualization-body-section.html',
  styleUrls: ['./visualization-body-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationBodySectionComponent implements OnInit {
  @Input()
  id: string;
  @Input()
  visualizationType: string;
  @Input()
  appKey: string;
  @Input()
  baseUrl: string;
  @Input()
  visualizationLayers: VisualizationLayer[];
  @Input()
  visualizationConfig: VisualizationConfig;
  @Input()
  visualizationUiConfig: VisualizationUiConfig;

  @Input()
  dashboardId: string;

  @Input()
  legendSets: string;

  @Input()
  focusedVisualization: string;

  @Output()
  updateVisualizationLayer: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(TableListComponent, { static: true })
  tableList: TableListComponent;

  @ViewChild(ChartListComponent, { static: true })
  chartList: ChartListComponent;

  layers: VisualizationLayer[];

  metadataIdentifiers: string[];
  constructor() {}

  ngOnInit() {
    this.layers = (this.visualizationLayers || []).map(
      (visualizationLayer: VisualizationLayer) => {
        return {
          ...visualizationLayer,
          layout: getVisualizationLayout(visualizationLayer.dataSelections),
          metadataIdentifiers: getVisualizationMetadataIdentifiers(
            visualizationLayer.dataSelections
          )
        };
      }
    );

    this.metadataIdentifiers = _.uniq(
      _.flatten(_.map(this.layers, layer => layer.metadataIdentifiers))
    );
  }

  onDownloadVisualization(visualizationType: string, downloadFormat: string) {
    if (visualizationType === 'CHART' && this.chartList) {
      this.chartList.onDownloadEvent(downloadFormat);
    } else if (visualizationType === 'TABLE' && this.tableList) {
      this.tableList.onDownloadEvent(downloadFormat);
    }
  }

  onVisualizationLayerUpdate(visualizationLayer: any) {
    this.updateVisualizationLayer.emit(visualizationLayer);
  }
}
