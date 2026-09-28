export const ORDERS_DETAILS_ROUTE = '/features/orders-details';

export const ORDERS_DETAILS_TEST_ID = 'feature-orders-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_DETAILS_FEATURE: FeatureMeta = {
  id: 'orders-details',
  title: 'Orders Details',
  route: ORDERS_DETAILS_ROUTE,
  testId: ORDERS_DETAILS_TEST_ID,
  domain: 'orders',
  kind: 'details',
  itemCount: 6,
};

export function ordersDetailsItemPath(itemId: string): string {
  return `${ORDERS_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
