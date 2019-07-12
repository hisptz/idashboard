import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// models
import { Visualization } from '../../models';

// actions
import {
  VisualizationObjectAction,
  VisualizationObjectActionTypes
} from '../actions';

export interface VisualizationObjectState extends EntityState<Visualization> {}

export const visualizationObjectAdapter: EntityAdapter<
  Visualization
> = createEntityAdapter<Visualization>();

const initialState: VisualizationObjectState = visualizationObjectAdapter.getInitialState(
  {}
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
