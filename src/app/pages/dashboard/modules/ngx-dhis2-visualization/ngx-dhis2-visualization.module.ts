import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { VisualizationBodySectionComponent } from './components/visualization-body-section/visualization-body-section';
import { VisualizationCardLoaderComponent } from './components/visualization-card-loader/visualization-card-loader.component';
import { VisualizationDownloadsSectionComponent } from './components/visualization-downloads-section/visualization-downloads-section.component';
import { VisualizationErrorNotifierComponent } from './components/visualization-error-notifier/visualization-error-notifier.component';
import { VisualizationFooterSectionComponent } from './components/visualization-footer-section/visualization-footer-section';
import { VisualizationHeaderSectionComponent } from './components/visualization-header-section/visualization-header-section';
import { VisualizationManagementSectionComponent } from './components/visualization-management-section/visualization-management-section.component';
import { VisualizationResizeSectionComponent } from './components/visualization-resize-section/visualization-resize-section.component';
import { VisualizationTitleSectionComponent } from './components/visualization-title-section/visualization-title-section';
import { VisualizationTypesSectionComponent } from './components/visualization-types-section/visualization-types-section.component';
import { VisualizationWidgetComponent } from './components/visualization-widget/visualization-widget.component';
import { VisualizationComponent } from './containers/visualization/visualization.component';
import { NgxDhis2ChartModule } from './modules/ngx-dhis-chart/ngx-dhis2-chart.module';
import { NgxDhis2TableModule } from './modules/ngx-dhis2-table/ngx-dhis2-table.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SafePipe } from './pipes/safe';
import { VisualizationLayerEffects } from './store/effects/visualization-layer.effects';
import { VisualizationObjectEffects } from './store/effects/visualization-object.effects';
import { reducers } from './store/reducers/visualization.reducer';
import { NgxDhis2SelectionFiltersModule } from '@iapps/ngx-dhis2-selection-filters';

// store
// import { MapModule } from './modules/map/map.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forRoot(),
    StoreModule.forFeature('visualization', reducers),
    EffectsModule.forFeature([
      VisualizationObjectEffects,
      VisualizationLayerEffects
    ]),
    NgxDhis2ChartModule,
    NgxDhis2TableModule,
    NgxDhis2SelectionFiltersModule,
    ReportsModule
  ],
  declarations: [
    SafePipe,
    VisualizationTitleSectionComponent,
    VisualizationCardLoaderComponent,
    VisualizationErrorNotifierComponent,
    VisualizationFooterSectionComponent,
    VisualizationTypesSectionComponent,
    VisualizationHeaderSectionComponent,
    VisualizationResizeSectionComponent,
    VisualizationBodySectionComponent,
    VisualizationManagementSectionComponent,
    VisualizationWidgetComponent,
    VisualizationDownloadsSectionComponent,
    VisualizationErrorNotifierComponent,
    VisualizationComponent
  ],
  exports: [VisualizationComponent]
})
export class NgxDhis2VisualizationModule {}
