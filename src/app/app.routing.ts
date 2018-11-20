import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {FullScreenDashboardItemViewComponent} from './pages/full-screen-dashboard-item-view/full-screen-dashboard-item-view.component';
import {PortalComponent} from './pages/portal/portal.component';
import {HomePortalComponent} from './pages/portal/home-portal/home-portal.component';
import {PageComponent} from './pages/portal/shared-components/page/page.component';
import {UpdatesComponent} from './pages/portal/updates/updates.component';
import {FaqComponent} from './pages/portal/faq/faq.component';
import {DownloadsComponent} from './pages/portal/downloads/downloads.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'pages/home',
    component: HomePortalComponent,
  },
  {
    path: 'pages/home/:id',
    component: PageComponent,
  },
  {
    path: 'pages/updates',
    component: UpdatesComponent,
  },
  {
    path: 'pages/updates/:id',
    component: UpdatesComponent,
  },
  {
    path: 'pages/faqs',
    component: FaqComponent,
  },
  {
    path: 'pages/downloads',
    component: DownloadsComponent,
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
