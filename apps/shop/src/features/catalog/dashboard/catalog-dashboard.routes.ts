export const CATALOG_DASHBOARD_ROUTE = '/features/catalog-dashboard';

export const CATALOG_DASHBOARD_TEST_ID = 'feature-catalog-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CATALOG_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'catalog-dashboard',
  title: 'Catalog Dashboard',
  route: CATALOG_DASHBOARD_ROUTE,
  testId: CATALOG_DASHBOARD_TEST_ID,
  domain: 'catalog',
  kind: 'dashboard',
  itemCount: 9,
};

export function catalogDashboardItemPath(itemId: string): string {
  return `${CATALOG_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
