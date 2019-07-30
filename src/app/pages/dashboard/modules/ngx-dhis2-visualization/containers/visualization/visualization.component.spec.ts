import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { VisualizationComponent } from './visualization.component';
import { VisualizationTitleSectionComponent } from '../../components/visualization-title-section/visualization-title-section';
import { VisualizationBodySectionComponent } from '../../components/visualization-body-section/visualization-body-section';
import { VisualizationHeaderSectionComponent } from '../../components/visualization-header-section/visualization-header-section';
import { VisualizationCardLoaderComponent } from '../../components/visualization-card-loader/visualization-card-loader.component';
import { VisualizationErrorNotifierComponent } from '../../components/visualization-error-notifier/visualization-error-notifier.component';
import { VisualizationFooterSectionComponent } from '../../components/visualization-footer-section/visualization-footer-section';
import { NgxDhis2SelectionFiltersModule } from '@iapps/ngx-dhis2-selection-filters';
import { VisualizationResizeSectionComponent } from '../../components/visualization-resize-section/visualization-resize-section.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { NgxDhis2ChartModule } from '../../modules/ngx-dhis-chart/ngx-dhis2-chart.module';
import { NgxDhis2TableModule } from '../../modules/ngx-dhis2-table/ngx-dhis2-table.module';
import { ReportsModule } from '../../modules/reports/reports.module';
import { VisualizationWidgetComponent } from '../../components/visualization-widget/visualization-widget.component';
import { SafePipe } from '../../pipes/safe';
import { VisualizationTypesSectionComponent } from '../../components/visualization-types-section/visualization-types-section.component';
import { VisualizationDownloadsSectionComponent } from '../../components/visualization-downloads-section/visualization-downloads-section.component';
import { VisualizationManagementSectionComponent } from '../../components/visualization-management-section/visualization-management-section.component';
import { FormsModule } from '@angular/forms';

describe('VisualizationComponent', () => {
  let component: VisualizationComponent;
  let fixture: ComponentFixture<VisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        FormsModule,
        NgxDhis2SelectionFiltersModule,
        NgxDhis2ChartModule,
        NgxDhis2TableModule,
        ReportsModule,
        NgxDhis2HttpClientModule.forRoot({
          namespace: 'iapps',
          version: 1,
          models: {
            users: 'id'
          }
        }),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [
        VisualizationComponent,
        VisualizationTitleSectionComponent,
        VisualizationHeaderSectionComponent,
        VisualizationResizeSectionComponent,
        VisualizationBodySectionComponent,
        VisualizationCardLoaderComponent,
        VisualizationErrorNotifierComponent,
        VisualizationFooterSectionComponent,
        VisualizationWidgetComponent,
        VisualizationTypesSectionComponent,
        VisualizationDownloadsSectionComponent,
        VisualizationManagementSectionComponent,
        SafePipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
