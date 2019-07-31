import { FavoritePreferences } from './favorite-preferences.model';

export interface DataSelectionPreferences {
  useLowestPeriodType?: boolean;
  chart?: FavoritePreferences;
  reportTable?: FavoritePreferences;
  map?: FavoritePreferences;
  app?: FavoritePreferences;
}
