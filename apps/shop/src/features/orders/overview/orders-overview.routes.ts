export const ORDERS_OVERVIEW_ROUTE = '/features/orders-overview';

export const ORDERS_OVERVIEW_TEST_ID = 'feature-orders-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'orders-overview',
  title: 'Orders Overview',
  route: ORDERS_OVERVIEW_ROUTE,
  testId: ORDERS_OVERVIEW_TEST_ID,
  domain: 'orders',
  kind: 'overview',
  itemCount: 11,
};

export function ordersOverviewItemPath(itemId: string): string {
  return `${ORDERS_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
