import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragulaModule} from 'ng2-dragula';
import {DndModule} from 'ng2-dnd';
import {MapLoaderComponent} from './components/map-loader/map-loader.component';
import {MapService} from './providers/map.service';
import {HttpClientService} from './providers/http-client.service';
import {OrgUnitService} from './providers/org-unit.service';
import {MapVisualizationService} from './providers/map-visualization.service';
import {ColorInterpolationService} from './providers/color-interpolation.service';
import {TileLayers} from './constants/tile-layers';
import {LegendSetService} from './providers/legend-set.service';
import {MapFilesConversion} from './providers/map-files-conversion.service';

@NgModule({
  imports: [
    CommonModule,
    DndModule.forRoot(),
    DragulaModule
  ],
  declarations: [
  ],
  exports: [],
  providers: [MapService,
    HttpClientService,
    OrgUnitService,
    MapVisualizationService,
    ColorInterpolationService,
    TileLayers,
    LegendSetService,
    MapFilesConversion
  ]
})
export class MapModule {
}
