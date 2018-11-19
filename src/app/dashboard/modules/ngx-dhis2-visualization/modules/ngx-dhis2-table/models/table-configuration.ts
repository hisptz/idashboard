export interface TableConfiguration {
  title: string;
  tableId?: string;
  subtitle: string;
  showColumnTotal: boolean;
  showColumnSubtotal: boolean;
  showRowTotal: boolean;
  showRowSubtotal: boolean;
  showDimensionLabels: boolean;
  hideEmptyRows: boolean;
  showHierarchy: boolean;
  rows: any[];
  columns: any[];
  legendDisplayStrategy: string;
  displayList: boolean;
  legendSet: any;
  columnsStyles?: any;
  columnGroups?: any;
  styles: any;
  declineIndicators: any;
  onlyUseActualPeriod: Array<any>;
}
