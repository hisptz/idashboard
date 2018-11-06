import {Component, HostListener, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AppState} from './store/app.reducers';
import {Store} from '@ngrx/store';
import * as currentUser from './store/current-user/current-user.actions';
import {getPortalConfiguration} from './store/portal/portal.selectors';
import {Observable} from 'rxjs/Observable';
import {PortalConfigurationState} from './store/portal/portal.state';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  portalConfiguration$: Observable<PortalConfigurationState>;
  portalConfigurations: any;
  theSetPage: string;
  portalPages: any;
  constructor(private titleService: Title, private store: Store<AppState>, private route: ActivatedRoute) {
    store.dispatch(new currentUser.LoadAction());
    this.portalConfiguration$ = store.select(getPortalConfiguration);
  }

  ngOnInit() {
    this.setTitle('Tanzania national health portal');
    if (this.portalConfiguration$) {
      this.route.params.forEach((params: Params) => {
        this.theSetPage = params['id'];
        this.portalConfiguration$.subscribe((portalConfigurations) => {
          if (portalConfigurations) {
            this.portalConfigurations = portalConfigurations;
            this.portalPages = portalConfigurations['pages'];
          }
        });
      });
    }
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
