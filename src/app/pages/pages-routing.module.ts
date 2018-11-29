import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent, PageRouteComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: PageRouteComponent,
    children: [
      {
        path: '',
        redirectTo: 'about'
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
