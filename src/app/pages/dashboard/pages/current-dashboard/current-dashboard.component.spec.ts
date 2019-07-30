import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDashboardComponent } from './current-dashboard.component';
import { DashboardItemComponent } from '../../components/dashboard-item/dashboard-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardModeComponent } from '../../components/dashboard-mode/dashboard-mode.component';
import { DashboardTitleComponent } from '../../components/dashboard-title/dashboard-title.component';
import { NgxDhis2SelectionFiltersModule } from '@iapps/ngx-dhis2-selection-filters';
import { NgxDhis2VisualizationModule } from '../../modules/ngx-dhis2-visualization/ngx-dhis2-visualization.module';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

describe('CurrentDashboardComponent', () => {
  let component: CurrentDashboardComponent;
  let fixture: ComponentFixture<CurrentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgxDhis2SelectionFiltersModule,
        NgxDhis2VisualizationModule,
        NgxDhis2HttpClientModule.forRoot({
          namespace: 'iapps',
          version: 1,
          models: {
            users: 'id'
          }
        })
      ],
      declarations: [
        CurrentDashboardComponent,
        DashboardItemComponent,
        DashboardModeComponent,
        DashboardTitleComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
