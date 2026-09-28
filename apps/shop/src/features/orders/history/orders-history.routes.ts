export const ORDERS_HISTORY_ROUTE = '/features/orders-history';

export const ORDERS_HISTORY_TEST_ID = 'feature-orders-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_HISTORY_FEATURE: FeatureMeta = {
  id: 'orders-history',
  title: 'Orders History',
  route: ORDERS_HISTORY_ROUTE,
  testId: ORDERS_HISTORY_TEST_ID,
  domain: 'orders',
  kind: 'history',
  itemCount: 5,
};

export function ordersHistoryItemPath(itemId: string): string {
  return `${ORDERS_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
