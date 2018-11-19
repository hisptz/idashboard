import { Component, Input, OnInit } from '@angular/core';
import { TableConfiguration } from '../../models/table-configuration';
import { getTableConfiguration } from '../../helpers/index';
import { LegendSet } from '../../models/legend-set.model';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-dhis2-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  @Input()
  visualizationLayers: any[];
  @Input()
  visualizationType: string;
  @Input()
  legendSets: LegendSet[];
  tableLayers: Array<{
    tableConfiguration: TableConfiguration;
    analyticsObject: any;
  }> = [];
  constructor() {}

  ngOnInit() {
    if (this.visualizationLayers && this.visualizationLayers.length > 0) {
      this.tableLayers = this.visualizationLayers.map(layer => ({
        tableConfiguration: getTableConfiguration(
          layer.config || {},
          layer.layout,
          this.visualizationType
        ),
        tableId: layer.id,
        analyticsObject: this.getLayerAnalytic(
          layer.analytics,
          layer.layout,
          layer.config.useReferencePeriod
        )
      }));
    }
  }

  getLayerAnalytic(analytics, layout, useReferencePeriod) {
    if (
      !useReferencePeriod &&
      analytics &&
      analytics.metaData &&
      analytics.metaData.pe.length > 1
    ) {
      const columnValue =
        layout && layout.columns && layout.columns.length > 0
          ? layout.columns[0]
          : '';
      const rowValue =
        layout && layout.rows && layout.rows.length > 0 ? layout.rows[0] : '';
      if (columnValue === 'pe' && rowValue === 'dx') {
        const periods = analytics.metaData.pe;
        const names = analytics.metaData.names;
        const customPeName = `${names[periods[0]]} - ${
          names[periods[periods.length - 1]]
        }`;
        const customPe = `${periods[0]}_${periods[periods.length - 1]}`;
        analytics.metaData.pe = [customPe];
        analytics.metaData.names[customPe] = customPeName;
        const sanitizedRows = this.getSanitizedRowsByPeAndDx(
          analytics.rows,
          customPe
        );
        analytics.rows = sanitizedRows;
      }
    } else {
    }
    return analytics;
  }

  getSanitizedRowsByPeAndDx(rows, customPe) {
    const sanitizedRows = [];
    const sumOffPeAndDxObjet = {};
    rows.map(row => {
      if (row.length === 4) {
        const id = `${row[0]}_${row[2]}`;
        if (!sumOffPeAndDxObjet[id]) {
          sumOffPeAndDxObjet[id] = 0;
        }
        sumOffPeAndDxObjet[id] += parseFloat(row[3]);
      }
    });
    Object.keys(sumOffPeAndDxObjet).map(idObject => {
      const ids = idObject.split('_');
      const value = parseFloat(sumOffPeAndDxObjet[idObject]).toFixed(1);
      sanitizedRows.push([ids[0], customPe, ids[1], value]);
    });
    return sanitizedRows;
  }
}
