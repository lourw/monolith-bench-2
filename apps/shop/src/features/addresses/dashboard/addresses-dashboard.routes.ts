export const ADDRESSES_DASHBOARD_ROUTE = '/features/addresses-dashboard';

export const ADDRESSES_DASHBOARD_TEST_ID = 'feature-addresses-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ADDRESSES_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'addresses-dashboard',
  title: 'Addresses Dashboard',
  route: ADDRESSES_DASHBOARD_ROUTE,
  testId: ADDRESSES_DASHBOARD_TEST_ID,
  domain: 'addresses',
  kind: 'dashboard',
  itemCount: 12,
};

export function addressesDashboardItemPath(itemId: string): string {
  return `${ADDRESSES_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
