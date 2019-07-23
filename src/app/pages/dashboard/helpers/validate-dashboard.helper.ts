import { Dashboard } from '../models/dashboard.model';

export function validateDashboard(dashboard: Dashboard) {
  if (!dashboard) {
    return {
      valid: false,
      error: 'dashboard is not defined'
    };
  }

  if (!dashboard.name || dashboard.name === '') {
    return {
      valid: false,
      error: 'Dashboard name is mandatory'
    };
  }

  if (!dashboard.dashboardItems) {
    return {
      valid: false,
      error: 'Dashboard items not defined or empty'
    };
  }

  return {
    valid: true
  };
}
