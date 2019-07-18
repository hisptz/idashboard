import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDhis2SelectionFiltersModule } from '@iapps/ngx-dhis2-selection-filters';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';

import { components } from './components';
import { containers } from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { pages } from './pages';
import { services } from './services';
import { dashboardEffects } from './store/effects';
import { dashboardReducers } from './store/reducers';
import { NgxDhis2VisualizationModule } from './modules/ngx-dhis2-visualization/ngx-dhis2-visualization.module';

@NgModule({
  declarations: [...pages, ...containers, ...components],
  providers: [...services],
  imports: [
    CommonModule,
    SharedModule,
    NgxDhis2SelectionFiltersModule,
    NgxDhis2VisualizationModule,
    DashboardRoutingModule,
    ...dashboardReducers,
    EffectsModule.forFeature(dashboardEffects)
  ]
})
export class DashboardModule {}
