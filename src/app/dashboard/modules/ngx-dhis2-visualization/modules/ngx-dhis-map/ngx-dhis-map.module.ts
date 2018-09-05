import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { containers } from './containers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/reducers';
import { effects } from './store/effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('map', reducers), EffectsModule.forFeature(effects)],
  declarations: [...containers],
  exports: [...containers]
})
export class NgxDhisMapModule {}
