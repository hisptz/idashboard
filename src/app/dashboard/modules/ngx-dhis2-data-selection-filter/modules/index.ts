import { DataFilterModule } from './data-filter/data-filter.module';
import { PeriodFilterModule } from './period-filter/period-filter.module';
import { NgxDhis2OrgUnitFilterModule } from './ngx-dhis2-org-unit-filter/ngx-dhis2-org-unit-filter.module';
import { LayoutModule } from './layout/layout.module';
import { DataMappingModule } from './data-mapping/data-mapping.module';
import { LegendSetConfigurationModule } from './legend-set-configuration/legend-set-configuration.module';

export const filterModules: any[] = [
  DataFilterModule,
  PeriodFilterModule,
  NgxDhis2OrgUnitFilterModule,
  LayoutModule,
  DataMappingModule,
  LegendSetConfigurationModule
];