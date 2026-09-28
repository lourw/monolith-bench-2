export const RETURNS_DASHBOARD_ROUTE = '/features/returns-dashboard';

export const RETURNS_DASHBOARD_TEST_ID = 'feature-returns-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const RETURNS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'returns-dashboard',
  title: 'Returns Dashboard',
  route: RETURNS_DASHBOARD_ROUTE,
  testId: RETURNS_DASHBOARD_TEST_ID,
  domain: 'returns',
  kind: 'dashboard',
  itemCount: 10,
};

export function returnsDashboardItemPath(itemId: string): string {
  return `${RETURNS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
