import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { pipes } from './pipes';

@NgModule({
  imports: [CommonModule, MatSelectModule, MatChipsModule, MatButtonModule],
  declarations: [...pipes],
  exports: [...pipes, MatSelectModule, MatChipsModule, MatButtonModule]
})
export class SharedModule {}
