import {CurrentUserEffects} from './current-user/current-user.effects';
import {DashboardEffects} from './dashboard/dashboard.effects';
import {VisualizationEffects} from './visualization/visualization.effects';
import {DictionaryEffects} from '../modules/dictionary/store/dictionary.effects';
import {PageEffects} from './pages/page.effects';

export const effects = [
  CurrentUserEffects,
  PageEffects,
  DashboardEffects,
  VisualizationEffects,
  DictionaryEffects
];
