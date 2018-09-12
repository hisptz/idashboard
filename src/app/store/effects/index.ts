import { RouterEffects } from './router.effects';
import { SystemInfoEffects } from './system-info.effects';
import { UserEffects } from './user.effects';
import { DashboardSettingsEffects } from './dashboard-settings.effects';
import { DashboardEffects } from './dashboard.effects';
import { DashboardVisualizationEffects } from './dashboard-visualization.effects';
import { DashboardGroupsEffects } from './dashboard-groups.effects';
import { LegendSetEffects } from './legend-set.effects';
import { DataElementEffects } from './data-elements.effects';
import { FunctionRuleEffects } from './function-rules.effects';
import { IndicatorsEffects } from './indicators.effects';

export const effects: any[] = [
  RouterEffects,
  SystemInfoEffects,
  UserEffects,
  DashboardSettingsEffects,
  LegendSetEffects,
  DashboardEffects,
  DashboardVisualizationEffects,
  DashboardGroupsEffects,
  DataElementEffects,
  IndicatorsEffects,
  FunctionRuleEffects
];
