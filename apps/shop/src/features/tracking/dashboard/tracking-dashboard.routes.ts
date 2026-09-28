export const TRACKING_DASHBOARD_ROUTE = '/features/tracking-dashboard';

export const TRACKING_DASHBOARD_TEST_ID = 'feature-tracking-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const TRACKING_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'tracking-dashboard',
  title: 'Tracking Dashboard',
  route: TRACKING_DASHBOARD_ROUTE,
  testId: TRACKING_DASHBOARD_TEST_ID,
  domain: 'tracking',
  kind: 'dashboard',
  itemCount: 6,
};

export function trackingDashboardItemPath(itemId: string): string {
  return `${TRACKING_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
