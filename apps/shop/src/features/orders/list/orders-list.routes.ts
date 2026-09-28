export const ORDERS_LIST_ROUTE = '/features/orders-list';

export const ORDERS_LIST_TEST_ID = 'feature-orders-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_LIST_FEATURE: FeatureMeta = {
  id: 'orders-list',
  title: 'Orders List',
  route: ORDERS_LIST_ROUTE,
  testId: ORDERS_LIST_TEST_ID,
  domain: 'orders',
  kind: 'list',
  itemCount: 8,
};

export function ordersListItemPath(itemId: string): string {
  return `${ORDERS_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
