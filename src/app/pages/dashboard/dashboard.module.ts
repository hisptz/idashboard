import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { CurrentDashboardComponent } from './containers/current-dashboard/current-dashboard.component';
import { DashboardPreferencesService } from './services/dashboard-preferences.service';
import { DashboardService } from './services/dashboard.service';
import { DashboardItemService } from './services/dashboard-item.service';

@NgModule({
  declarations: [DashboardComponent, CurrentDashboardComponent],
  providers: [
    DashboardPreferencesService,
    DashboardService,
    DashboardItemService
  ],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
