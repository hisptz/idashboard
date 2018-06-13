import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ColorPickerModule } from 'ngx-color-picker';

import { reducers, effects } from './store';
// containers
import * as fromContainers from './containers';
// components
import * as fromComponents from './components';

import * as fromServices from './services';

import { NgxPaginationModule } from 'ngx-pagination';

import { NgxDnDModule } from '@swimlane/ngx-dnd';

// Filters Modules
import * as Filters from './modules';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ColorPickerModule,
    NgxDnDModule,
    ...Filters.modules,
    StoreModule.forFeature('map', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class MapModule {}
