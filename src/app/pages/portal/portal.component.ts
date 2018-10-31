import { Component, OnInit } from '@angular/core';
import {PortalConfigurationState} from '../../store/portal/portal.state';
import {Observable} from 'rxjs/index';
import {getPortalConfiguration} from '../../store/portal/portal.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  portalConfiguration$: Observable<PortalConfigurationState>;
  portalConfigurations: any;
  theSetPage: string;
  portalPages: any;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.portalConfiguration$ = store.select(getPortalConfiguration);
  }

  ngOnInit() {
    if (this.portalConfiguration$) {
      this.route.params.forEach((params: Params) => {
        this.theSetPage = params['id'];
        this.portalConfiguration$.subscribe((portalConfigurations) => {
          if (portalConfigurations) {
            this.portalConfigurations = portalConfigurations;
            this.portalPages = portalConfigurations['pages'];
            console.log('portal configuration', portalConfigurations.pages);
          }
        });
      });
  }
  }

}
