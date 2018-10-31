import {CurrentUserEffects} from './current-user/current-user.effects';
import {DashboardEffects} from './dashboard/dashboard.effects';
import {VisualizationEffects} from './visualization/visualization.effects';
import {DictionaryEffects} from '../modules/dictionary/store/dictionary.effects';
import {PortalEffects} from './portal/portal.effects';

export const effects = [
  PortalEffects,
  CurrentUserEffects,
  DashboardEffects,
  VisualizationEffects,
  DictionaryEffects
];
