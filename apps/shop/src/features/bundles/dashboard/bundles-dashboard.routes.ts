export const BUNDLES_DASHBOARD_ROUTE = '/features/bundles-dashboard';

export const BUNDLES_DASHBOARD_TEST_ID = 'feature-bundles-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const BUNDLES_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'bundles-dashboard',
  title: 'Bundles Dashboard',
  route: BUNDLES_DASHBOARD_ROUTE,
  testId: BUNDLES_DASHBOARD_TEST_ID,
  domain: 'bundles',
  kind: 'dashboard',
  itemCount: 7,
};

export function bundlesDashboardItemPath(itemId: string): string {
  return `${BUNDLES_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
