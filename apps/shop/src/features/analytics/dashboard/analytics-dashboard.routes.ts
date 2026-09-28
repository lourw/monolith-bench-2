export const ANALYTICS_DASHBOARD_ROUTE = '/features/analytics-dashboard';

export const ANALYTICS_DASHBOARD_TEST_ID = 'feature-analytics-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ANALYTICS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'analytics-dashboard',
  title: 'Analytics Dashboard',
  route: ANALYTICS_DASHBOARD_ROUTE,
  testId: ANALYTICS_DASHBOARD_TEST_ID,
  domain: 'analytics',
  kind: 'dashboard',
  itemCount: 11,
};

export function analyticsDashboardItemPath(itemId: string): string {
  return `${ANALYTICS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
