export const ORDERS_DASHBOARD_ROUTE = '/features/orders-dashboard';

export const ORDERS_DASHBOARD_TEST_ID = 'feature-orders-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'orders-dashboard',
  title: 'Orders Dashboard',
  route: ORDERS_DASHBOARD_ROUTE,
  testId: ORDERS_DASHBOARD_TEST_ID,
  domain: 'orders',
  kind: 'dashboard',
  itemCount: 6,
};

export function ordersDashboardItemPath(itemId: string): string {
  return `${ORDERS_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
