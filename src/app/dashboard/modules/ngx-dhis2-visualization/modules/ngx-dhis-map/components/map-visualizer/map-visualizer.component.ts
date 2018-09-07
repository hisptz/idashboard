import { Component, Input, SimpleChanges, OnChanges, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { VisualizationUiConfig, VisualizationConfig, VisualizationLayer } from '../../../../models';
import { GeofeatureEntities } from '../../models/geofeature.model';
import { prepareMapContainer } from '../../helpers/mapVisualization.helper';
import {
  map as lMap,
  control as leafletControl,
  Map,
  TileLayer as LeafLetTileLayer,
  Layer as LeafLetLayer,
  LatLngExpression,
  LatLngBoundsExpression
} from 'leaflet';
import { getTileLayer } from '../../constants';
import { LayerType, createOverLayLayers } from '../../lib/Layers';
import { convertLatitudeLongitude } from '../../helpers/latLongConvertion.helper';

@Component({
  selector: 'app-map-visualizer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-visualizer.component.html',
  styleUrls: ['./map-visualizer.component.scss']
})
export class MapVisualizerComponent implements OnChanges, AfterViewInit {
  @Input()
  id;
  @Input()
  visualizationLayers: Array<VisualizationLayer>;
  @Input()
  visualizationConfig: VisualizationConfig;
  @Input()
  visualizationUiConfig: VisualizationUiConfig;
  @Input()
  geofeatureEntities: GeofeatureEntities;

  public dhis2Map: Map;
  public baseMapLayer: LeafLetTileLayer;

  constructor() {}

  async ngOnChanges(changes: SimpleChanges) {
    const { geofeatureEntities, id } = changes;
    // check if geofetures have been loaded.

    if (geofeatureEntities && geofeatureEntities.currentValue && Object.keys(geofeatureEntities.currentValue).length) {
      this.prepareLayerGroups(this.visualizationLayers, this.geofeatureEntities, this.visualizationConfig);
    }
  }

  async ngAfterViewInit() {
    this.initializeMapContainer();
    this.initialMapDraw();
  }

  initializeMapContainer() {
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

  prepareLayerGroups(
    layers: Array<VisualizationLayer>,
    geofeatureEntities: GeofeatureEntities,
    visualizationConfig: VisualizationConfig
  ) {
    const { contextPath } = visualizationConfig;
    const layerGroup = createOverLayLayers(layers, geofeatureEntities, contextPath);
    const layersBounds: LatLngBoundsExpression = [];

    layerGroup.forEach(({ geojsonLayer, labels, id, bounds }, index) => {
      if (bounds) {
        layersBounds.push(bounds);
      }
      this.createLayer(geojsonLayer, labels, id, index);
    });

    if (layersBounds.length) {
      this.layerFitBound(layersBounds);
    }
  }

  createLayer(geoJsonLayer, labels, id, index) {
    this.createLayerPane(labels, id, index);
    this.setLayerVisibility(true, geoJsonLayer);
  }

  zoomIn() {
    this.dhis2Map.zoomIn();
  }

  zoomOut() {
    this.dhis2Map.zoomOut();
  }

  layerFitBound(bounds: LatLngBoundsExpression) {
    this.dhis2Map.fitBounds(bounds);
  }

  createLayerPane(labels: boolean, id: string, index: number, areaRadius?: boolean) {
    const zIndex = 600 - index * 10;
    this.dhis2Map.createPane(id);
    this.dhis2Map.getPane(id).style.zIndex = zIndex.toString();

    if (labels) {
      const paneLabelId = `${id}-labels`;
      const labelPane = this.dhis2Map.createPane(paneLabelId);
      this.dhis2Map.getPane(paneLabelId).style.zIndex = (zIndex + 1).toString();
    }

    if (areaRadius) {
      const areaID = `${id}-area`;
      const areaPane = this.dhis2Map.createPane(areaID);
      this.dhis2Map.getPane(areaID).style.zIndex = (zIndex - 1).toString();
    }
  }

  redrawMapOndataChange() {}
}
