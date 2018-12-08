import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CurrentUserState} from '../../../../store/current-user/current-user.state';
import {AppState} from '../../../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {getCurrentUser} from '../../../../store/current-user/current-user.selectors';

@Component({
  selector: 'app-screen-view',
  templateUrl: './screen-view.component.html',
  styleUrls: ['./screen-view.component.css']
})
export class ScreenViewComponent implements OnInit {

  @Input() visualizationListArray: any;
  currentUser$: Observable<CurrentUserState>;
  constructor(private router: Router,
              private store: Store<AppState>) {
    this.currentUser$ = store.select(getCurrentUser);
  }

  ngOnInit() {
  }

}
