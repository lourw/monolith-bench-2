export const PREORDERS_DASHBOARD_ROUTE = '/features/preorders-dashboard';

export const PREORDERS_DASHBOARD_TEST_ID = 'feature-preorders-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PREORDERS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'preorders-dashboard',
  title: 'Preorders Dashboard',
  route: PREORDERS_DASHBOARD_ROUTE,
  testId: PREORDERS_DASHBOARD_TEST_ID,
  domain: 'preorders',
  kind: 'dashboard',
  itemCount: 5,
};

export function preordersDashboardItemPath(itemId: string): string {
  return `${PREORDERS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
