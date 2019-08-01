import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// models
import { Visualization, VisualizationVm } from '../../models';

// actions
import {
  VisualizationObjectAction,
  VisualizationObjectActionTypes,
  addVisualizationObject
} from '../actions';
import { createReducer, on } from '@ngrx/store';

export interface VisualizationObjectState
  extends EntityState<VisualizationVm> {}

export const visualizationObjectAdapter: EntityAdapter<
  VisualizationVm
> = createEntityAdapter<VisualizationVm>();

const initialState: VisualizationObjectState = visualizationObjectAdapter.getInitialState(
  {}
);

const reducer = createReducer(
  initialState,
  on(addVisualizationObject, (state, { visualizationObject }) =>
    visualizationObjectAdapter.addOne(visualizationObject, state)
  )
);

export function visualizationObjectReducer(
  state: VisualizationObjectState = initialState,
  action: VisualizationObjectAction
): VisualizationObjectState {
  switch (action.type) {
    case VisualizationObjectActionTypes.AddVisualizationObjects:
      return visualizationObjectAdapter.addMany(
        action.visualizationObjects,
        state
      );
    case VisualizationObjectActionTypes.ADD_VISUALIZATION_OBJECT: {
      return visualizationObjectAdapter.upsertOne(
        action.visualizationObject,
        state
      );
    }
    case VisualizationObjectActionTypes.UPDATE_VISUALIZATION_OBJECT:
      return visualizationObjectAdapter.updateOne(
        { id: action.id, changes: action.changes },
        state
      );
    case VisualizationObjectActionTypes.RemoveVisualizationObject: {
      return visualizationObjectAdapter.removeOne(action.id, state);
    }

    case VisualizationObjectActionTypes.ToggleFullScreen:
      const visualizationObject = state.entities[action.id];
      return visualizationObject && visualizationObject.uiConfig
        ? visualizationObjectAdapter.updateOne(
            {
              id: action.id,
              changes: {
                uiConfig: {
                  ...visualizationObject.uiConfig,
                  fullScreen: !visualizationObject.uiConfig.fullScreen,
                  height: visualizationObject.uiConfig.fullScreen
                    ? '450px'
                    : '99vh'
                }
              }
            },
            state
          )
        : state;
  }
  return state;
}
