import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartItemComponent } from './components/chart-item/chart-item.component';
import { ChartListComponent } from './components/chart-list/chart-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ChartListComponent, ChartItemComponent],
  exports: [ChartListComponent, ChartItemComponent]
})
export class NgxDhis2ChartModule {}
