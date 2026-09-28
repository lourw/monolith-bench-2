export const SIZING_DASHBOARD_ROUTE = '/features/sizing-dashboard';

export const SIZING_DASHBOARD_TEST_ID = 'feature-sizing-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SIZING_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'sizing-dashboard',
  title: 'Sizing Dashboard',
  route: SIZING_DASHBOARD_ROUTE,
  testId: SIZING_DASHBOARD_TEST_ID,
  domain: 'sizing',
  kind: 'dashboard',
  itemCount: 9,
};

export function sizingDashboardItemPath(itemId: string): string {
  return `${SIZING_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
