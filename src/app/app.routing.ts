import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {FullScreenDashboardItemViewComponent} from './pages/full-screen-dashboard-item-view/full-screen-dashboard-item-view.component';
import {PortalComponent} from './pages/portal/portal.component';
import { DownloadsComponent } from './pages/portal/downloads/downloads.component';
import { CensusComponent } from './pages/portal/downloads/census/census.component';
import { HealthreportComponent } from './pages/portal/downloads/healthreport/healthreport.component';
import { ScorecardComponent } from './pages/portal/downloads/scorecard/scorecard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'pages/:parentId/:id',
    component: PortalComponent
  },
  {
    path: 'pages/:id',
    component: PortalComponent
  },
  {
    path: 'pages/downloads1',
    component: HomeComponent
  },
  {
    path: 'pages/portal/downloads/scorecard',
    component: ScorecardComponent
  },

  {
    path: 'pages/portal/downloads/healthreport',
    component: HealthreportComponent
  },

  {
    path: 'pages/portal/updates',
    component: CensusComponent
  },

  {
    path: 'dashboards/:id',
    component: DashboardComponent,
    children: [{
      path: 'item/:id',
      component: FullScreenDashboardItemViewComponent
    }]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class RoutingModule {
}
