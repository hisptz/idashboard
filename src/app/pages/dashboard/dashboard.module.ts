import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { CurrentDashboardComponent } from './containers/current-dashboard/current-dashboard.component';

@NgModule({
  declarations: [DashboardComponent, CurrentDashboardComponent],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
