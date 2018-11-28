export function getVisualizationWidthFromShape(dashboardItemShape: string): string {
  switch (dashboardItemShape) {
    case 'DOUBLE_WIDTH':
      return 'grid-double-width';
    case 'FULL_WIDTH':
      return 'grid-full-width';
    default:
      return 'grid-double-width';
  }
}
