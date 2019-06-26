import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { containers } from './containers';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CurrentDashboardComponent } from './pages/current-dashboard/current-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardItemService } from './services/dashboard-item.service';
import { DashboardPreferencesService } from './services/dashboard-preferences.service';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [DashboardComponent, CurrentDashboardComponent, ...containers],
  providers: [
    DashboardPreferencesService,
    DashboardService,
    DashboardItemService
  ],
  imports: [CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
