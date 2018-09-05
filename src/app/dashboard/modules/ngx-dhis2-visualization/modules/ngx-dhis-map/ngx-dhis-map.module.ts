import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// store related
import { reducers } from './store/reducers';
import { effects } from './store/effects';

// Components
import { components } from './components';
import { containers } from './containers';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('map', reducers), EffectsModule.forFeature(effects)],
  declarations: [...containers, ...components],
  exports: [...containers, ...components]
})
export class NgxDhisMapModule {}
