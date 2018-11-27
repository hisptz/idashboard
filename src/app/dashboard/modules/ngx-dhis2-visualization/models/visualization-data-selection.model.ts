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
    skipSummationOnMultiplePeriod?: boolean;
    type?: string;
  }>;
  groups?: Array<{
    id: string;
    name: string;
    members: Array<string>;
  }>;
}
