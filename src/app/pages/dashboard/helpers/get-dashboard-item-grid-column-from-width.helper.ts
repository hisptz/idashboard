export function getDashboardItemGripColumnFromWidth(
  dashboardItemWidth: number
): string {
  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  // TODO: FIND GRID SPAN BASED ON INCOMING WIDTH
  return 'span 12';
}
