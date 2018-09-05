import { Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { VisualizationUiConfig, VisualizationConfig, VisualizationLayer } from '../../../../models';
import { prepareMapContainer } from '../../helpers/mapVisualization.helper';
import {
  map as lMap,
  control as leafletControl,
  Map,
  TileLayer as LeafLetTileLayer,
  Layer as LeafLetLayer,
  LatLngExpression
} from 'leaflet';
import { getTileLayer } from '../../constants';
import { LayerType } from '../../lib/Layers';
import { convertLatitudeLongitude } from '../../helpers/latLongConvertion.helper';

@Component({
  selector: 'app-map-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnChanges, AfterViewInit {
  @Input()
  id;
  @Input()
  visualizationLayers: VisualizationLayer;
  @Input()
  visualizationConfig: VisualizationConfig;
  @Input()
  visualizationUiConfig: VisualizationUiConfig;

  public dhis2Map: Map;
  public baseMapLayer: LeafLetTileLayer;

  constructor() {}

  async ngOnChanges(changes: SimpleChanges) {
    const { visualizationLayers } = changes;
    if (visualizationLayers && visualizationLayers.currentValue) {
      console.log({ layers: visualizationLayers.currentValue });
    }
  }

  async ngAfterViewInit() {
    await this.initializeMapContainer();
    this.initialMapDraw();
  }

  async initializeMapContainer() {
    const { height, width, fullScreen } = this.visualizationUiConfig;
    const container = prepareMapContainer(this.id, height, width, fullScreen);
    const otherOptions = {
      zoomControl: false,
      maxZoom: 12,
      fadeAnimation: false,
      scrollWheelZoom: fullScreen,
      worldCopyJump: true
    };

    // Initialize Map after ViewInit
    this.dhis2Map = lMap(container, otherOptions);
    leafletControl.scale({ position: 'bottomleft', metric: true, updateWhenIdle: true }).addTo(this.dhis2Map);
  }

  createBaseLayer(basemap?: string) {
    const mapTileLayer = getTileLayer(basemap);
    return LayerType[mapTileLayer.type](mapTileLayer);
  }

  setLayerVisibility(isVisible: boolean, layer: LeafLetLayer) {
    if (isVisible && !this.dhis2Map.hasLayer(layer)) {
      this.dhis2Map.addLayer(layer);
    } else if (!isVisible && this.dhis2Map.hasLayer(layer)) {
      this.dhis2Map.removeLayer(layer);
    }
  }

  initialMapDraw() {
    const { basemap, zoom, latitude, longitude } = this.visualizationConfig;
    this.baseMapLayer = this.createBaseLayer(basemap);
    // Set Opacity of the base layer at the start
    // this.baseMapLayer.setOpacity(1);
    this.setLayerVisibility(true, this.baseMapLayer);
    this.drawBaseAndOverLayLayers(zoom, latitude, longitude);
  }

  drawBaseAndOverLayLayers(zoom: number = 6, latitude: string = '6.489', longitude: string = '21.885') {
    const center: LatLngExpression = [
      Number(convertLatitudeLongitude(latitude)),
      Number(convertLatitudeLongitude(longitude))
    ];

    this.dhis2Map.setView(center, zoom);
  }
}
