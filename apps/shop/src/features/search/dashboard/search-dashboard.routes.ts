export const SEARCH_DASHBOARD_ROUTE = '/features/search-dashboard';

export const SEARCH_DASHBOARD_TEST_ID = 'feature-search-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SEARCH_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'search-dashboard',
  title: 'Search Dashboard',
  route: SEARCH_DASHBOARD_ROUTE,
  testId: SEARCH_DASHBOARD_TEST_ID,
  domain: 'search',
  kind: 'dashboard',
  itemCount: 9,
};

export function searchDashboardItemPath(itemId: string): string {
  return `${SEARCH_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
