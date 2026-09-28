export const COMPARE_DASHBOARD_ROUTE = '/features/compare-dashboard';

export const COMPARE_DASHBOARD_TEST_ID = 'feature-compare-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const COMPARE_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'compare-dashboard',
  title: 'Compare Dashboard',
  route: COMPARE_DASHBOARD_ROUTE,
  testId: COMPARE_DASHBOARD_TEST_ID,
  domain: 'compare',
  kind: 'dashboard',
  itemCount: 11,
};

export function compareDashboardItemPath(itemId: string): string {
  return `${COMPARE_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
