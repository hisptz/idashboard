import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

import { pipes } from './pipes';

@NgModule({
  imports: [CommonModule, MatSelectModule, MatChipsModule],
  declarations: [...pipes],
  exports: [...pipes, MatSelectModule, MatChipsModule]
})
export class SharedModule {}
