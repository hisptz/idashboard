import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { PagesRoutingModule } from './pages-routing.module';

import { containers } from './containers';
@NgModule({
  imports: [CommonModule, FormsModule, PagesRoutingModule, TranslateModule.forChild()],
  declarations: [...containers]
})
export class PagesModule {}
