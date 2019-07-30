import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgxDhis2VisualizationModule } from '../../modules/ngx-dhis2-visualization/ngx-dhis2-visualization.module';
import { DashboardItemComponent } from './dashboard-item.component';

describe('DashboardItemComponent', () => {
  let component: DashboardItemComponent;
  let fixture: ComponentFixture<DashboardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgxDhis2HttpClientModule.forRoot({
          namespace: 'iapps',
          version: 1,
          models: {
            users: 'id'
          }
        }),
        NgxDhis2VisualizationModule
      ],
      declarations: [DashboardItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
