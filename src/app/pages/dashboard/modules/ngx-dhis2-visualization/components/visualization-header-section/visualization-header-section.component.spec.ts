import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { NgxDhis2SelectionFiltersModule } from '@iapps/ngx-dhis2-selection-filters';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';

import { VisualizationResizeSectionComponent } from '../visualization-resize-section/visualization-resize-section.component';
import { VisualizationHeaderSectionComponent } from './visualization-header-section';

describe('VisualizationHeaderSectionComponent', () => {
  let component: VisualizationHeaderSectionComponent;
  let fixture: ComponentFixture<VisualizationHeaderSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgxDhis2SelectionFiltersModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        NgxDhis2HttpClientModule.forRoot({
          namespace: 'iapps',
          version: 1,
          models: {
            users: 'id'
          }
        })
      ],
      declarations: [
        VisualizationHeaderSectionComponent,
        VisualizationResizeSectionComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationHeaderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
