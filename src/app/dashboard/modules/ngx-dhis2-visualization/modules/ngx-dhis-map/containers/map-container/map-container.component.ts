import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { VisualizationUiConfig, VisualizationConfig, VisualizationLayer } from '../../../../models';
import { LoadGeofeaturesAction } from '../../store/actions/geofeature.actions';
import { Store, select } from '@ngrx/store';
import { MapState } from '../../store/reducers';
import { Observable } from 'rxjs';
import { LayerGeofeature } from '../../models/geofeature.model';
import { getGeofeatureEntities, getGeofeatureLoaded } from '../../store/selectors/geofeature.selectors';

@Component({
  selector: 'app-map-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnChanges {
  @Input()
  id;
  @Input()
  visualizationLayers: Array<VisualizationLayer>;
  @Input()
  visualizationConfig: VisualizationConfig;
  @Input()
  visualizationUiConfig: VisualizationUiConfig;

  public geofeatureEntities$: Observable<{ [id: string]: LayerGeofeature }>;
  public isGeofeatureLoaded$: Observable<boolean>;

  constructor(private store: Store<MapState>) {
    this.geofeatureEntities$ = this.store.pipe(select(getGeofeatureEntities));
    this.isGeofeatureLoaded$ = this.store.pipe(select(getGeofeatureLoaded));
  }

  ngOnChanges(changes: SimpleChanges) {
    const { visualizationLayers } = changes;
    if (visualizationLayers && visualizationLayers.currentValue) {
      const layers: Array<VisualizationLayer> = visualizationLayers.currentValue;
      const layersPayload = layers.map(({ id, dataSelections }) => ({
        id,
        ouDimension: dataSelections.find(({ dimension }) => dimension === 'ou')
      }));
      this.store.dispatch(new LoadGeofeaturesAction(layersPayload));
    }
  }
}
