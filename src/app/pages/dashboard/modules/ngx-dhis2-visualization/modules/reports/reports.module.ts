import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportItemComponent } from './components/report-item/report-item.component';
import { ReportListComponent } from './containers/report-list/report-list.component';
import { ReportComponent } from './containers/report/report.component';

@NgModule({
  declarations: [ReportItemComponent, ReportListComponent, ReportComponent],
  exports: [ReportItemComponent, ReportListComponent, ReportComponent],
  imports: [CommonModule]
})
export class ReportsModule {}
