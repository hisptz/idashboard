export interface VisualizationDataSelection {
  dimension: string;
  name?: string;
  layout?: string;
  filter?: string;
  optionSet?: any;
  legendSet?: string;
  items: Array<{
    id: string;
    name: string;
    ref_type?: string;
    skipSummationOnMultiplePeriod?: boolean;
    level?: string;
    type?: string;
  }>;
  groups?: Array<{
    id: string;
    name: string;
    members: Array<string>;
  }>;
}
