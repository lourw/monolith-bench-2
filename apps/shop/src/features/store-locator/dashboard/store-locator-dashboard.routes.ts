export const STORE_LOCATOR_DASHBOARD_ROUTE =
  '/features/store-locator-dashboard';

export const STORE_LOCATOR_DASHBOARD_TEST_ID =
  'feature-store-locator-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const STORE_LOCATOR_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'store-locator-dashboard',
  title: 'Store Locator Dashboard',
  route: STORE_LOCATOR_DASHBOARD_ROUTE,
  testId: STORE_LOCATOR_DASHBOARD_TEST_ID,
  domain: 'store-locator',
  kind: 'dashboard',
  itemCount: 10,
};

export function storeLocatorDashboardItemPath(itemId: string): string {
  return `${STORE_LOCATOR_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
