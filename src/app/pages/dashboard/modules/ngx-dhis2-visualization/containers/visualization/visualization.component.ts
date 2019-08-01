import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { VisualizationBodySectionComponent } from '../../components/visualization-body-section/visualization-body-section';
import { LegendSet } from '../../models/legend-set.model';
import { VisualizationConfig } from '../../models/visualization-config.model';
import { VisualizationLayer } from '../../models/visualization-layer.model';
import { VisualizationProgress } from '../../models/visualization-progress.model';
import { VisualizationUiConfig } from '../../models/visualization-ui-config.model';
import {
  Visualization,
  VisualizationVm
} from '../../models/visualization.model';
import {
  LoadVisualizationAnalyticsAction,
  UpdateVisualizationLayerAction
} from '../../store/actions/visualization-layer.actions';
import {
  initializeVisualizationObject,
  SaveVisualizationFavoriteAction,
  ToggleVisualizationFullScreenAction,
  UpdateVisualizationObjectAction
} from '../../store/actions/visualization-object.actions';
import { ShowOrHideVisualizationBodyAction } from '../../store/actions/visualization-ui-configuration.actions';
import { VisualizationState } from '../../store/reducers/visualization.reducer';
import { getCurrentVisualizationConfig } from '../../store/selectors/visualization-configuration.selectors';
import { getCurrentVisualizationObjectLayers } from '../../store/selectors/visualization-layer.selectors';
import { getVisualizationObjectById } from '../../store/selectors/visualization-object.selectors';
import { getFocusedVisualization } from '../../store/selectors/visualization-ui-configuration.selectors';

@Component({
  selector: 'ngx-dhis2-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationComponent implements OnInit {
  @Input()
  visualizationObject: Visualization;

  @Input()
  isNew: boolean;

  @Input()
  dashboardId: string;
  @Input()
  currentUser: any;

  @Input()
  legendSets: LegendSet[];
  @Input()
  systemInfo: any;
  cardFocused: boolean;

  @Output()
  toggleFullScreen: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  deleteVisualization: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(VisualizationBodySectionComponent, { static: true })
  visualizationBody: VisualizationBodySectionComponent;

  visualizationObject$: Observable<VisualizationVm>;
  visualizationLayers$: Observable<VisualizationLayer[]>;
  visualizationUiConfig$: Observable<VisualizationUiConfig>;
  visualizationProgress$: Observable<VisualizationProgress>;
  visualizationConfig$: Observable<VisualizationConfig>;
  focusedVisualization$: Observable<string>;

  constructor(private store: Store<VisualizationState>) {}

  ngOnInit() {
    if (this.visualizationObject) {
      const visualizationObject = {
        ...this.visualizationObject,
        layers: (this.visualizationObject.layers || []).map(
          (visualizationObjectLayer: any) => visualizationObjectLayer.id
        )
      };

      this.store.dispatch(
        initializeVisualizationObject({
          visualizationObject,
          visualizationLayers: this.visualizationObject.layers,
          currentUser: this.currentUser,
          systemInfo: this.systemInfo,
          isNew: this.isNew
        })
      );

      // Set visualization selectors
      this.setOrUpdateSelectors(visualizationObject);
    }
  }

  setOrUpdateSelectors(visualizationObject) {
    this.visualizationObject$ = this.store.select(
      getVisualizationObjectById(visualizationObject.id)
    );

    this.visualizationLayers$ = this.visualizationObject$.pipe(
      switchMap((visualization: VisualizationVm) =>
        this.store.select(
          getCurrentVisualizationObjectLayers(
            visualization ? visualization.layers : []
          )
        )
      )
    );

    this.visualizationProgress$ = this.visualizationObject$.pipe(
      map((visualization: VisualizationVm) =>
        visualization ? visualization.progress : null
      )
    );

    this.visualizationUiConfig$ = this.visualizationObject$.pipe(
      map((visualization: VisualizationVm) =>
        visualization ? visualization.uiConfig : null
      )
    );

    this.visualizationConfig$ = this.visualizationObject$.pipe(
      map((visualization: VisualizationVm) =>
        visualization ? visualization.globalConfig : null
      )
    );

    this.focusedVisualization$ = this.store.select(getFocusedVisualization);
  }

  onToggleVisualizationBody(uiConfig) {
    this.store.dispatch(
      new ShowOrHideVisualizationBodyAction(uiConfig.id, {
        showBody: uiConfig.showBody
      })
    );
  }

  onVisualizationTypeChange(visualizationType: string) {
    this.store.dispatch(
      new UpdateVisualizationObjectAction(this.visualizationObject.id, {
        currentType: visualizationType
      })
    );

    if (
      visualizationType === 'MAP' ||
      this.visualizationObject.type === 'MAP'
    ) {
      this.visualizationLayers$
        .pipe(take(1))
        .subscribe((visualizationLayers: VisualizationLayer[]) => {
          this.store.dispatch(
            new LoadVisualizationAnalyticsAction(
              this.visualizationObject.id,
              visualizationLayers
            )
          );
        });
    }
  }

  onToggleFullScreenAction(fullScreenStatus: boolean) {
    this.toggleFullScreen.emit({
      id: this.visualizationObject.id,
      dashboardId: this.dashboardId,
      fullScreen: fullScreenStatus
    });
    this.store.dispatch(
      new ToggleVisualizationFullScreenAction(this.visualizationObject.id)
    );
  }

  onLoadVisualizationAnalytics(visualizationLayer: VisualizationLayer) {
    this.store.dispatch(
      new LoadVisualizationAnalyticsAction(this.visualizationObject.id, [
        visualizationLayer
      ])
    );
  }

  onVisualizationLayerConfigUpdate(visualizationLayer: VisualizationLayer) {
    this.store.dispatch(
      new UpdateVisualizationLayerAction(visualizationLayer.id, {
        config: visualizationLayer.config
      })
    );
  }

  onSaveFavorite(favoriteDetails) {
    this.store.dispatch(
      new SaveVisualizationFavoriteAction(
        this.visualizationObject.id,
        favoriteDetails,
        this.dashboardId
      )
    );
  }

  onToggleVisualizationCardFocus(e, focused: boolean) {
    e.stopPropagation();
    if (this.cardFocused !== focused) {
      this.visualizationUiConfig$
        .pipe(take(1))
        .subscribe((visualizationUiConfig: VisualizationUiConfig) => {
          this.store.dispatch(
            new UpdateVisualizationObjectAction(this.visualizationObject.id, {
              uiConfig: {
                ...visualizationUiConfig,
                hideFooter: !focused,
                hideResizeButtons: !focused
              }
            })
          );
          this.cardFocused = focused;
        });
    }
  }

  onDeleteVisualizationAction(options: any) {
    this.visualizationObject$
      .pipe(take(1))
      .subscribe((visualization: VisualizationVm) => {
        this.deleteVisualization.emit({
          visualization,
          deleteFavorite: options.deleteFavorite
        });

        this.store.dispatch(
          new UpdateVisualizationObjectAction(this.visualizationObject.id, {
            notification: {
              message: 'Removing dasboard item...',
              type: 'progress'
            }
          })
        );
      });
  }

  onVisualizationDownload(downloadDetails: any) {
    if (this.visualizationBody) {
      this.visualizationBody.onDownloadVisualization(
        downloadDetails.type,
        downloadDetails.downloadFormat
      );
    }
  }
}
