export function filterDashboardIdsByNamespace(
  dashboardIds: string[],
  namespace: string
): string[] {
  return (dashboardIds || []).filter(
    (dashboardId: string) => namespace === (dashboardId.split('_') || [])[0]
  );
}
