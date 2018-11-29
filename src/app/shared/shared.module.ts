import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { components } from './components';
@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule.forChild()],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule {}
