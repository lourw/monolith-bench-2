export const ORDERS_SUMMARY_ROUTE = '/features/orders-summary';

export const ORDERS_SUMMARY_TEST_ID = 'feature-orders-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_SUMMARY_FEATURE: FeatureMeta = {
  id: 'orders-summary',
  title: 'Orders Summary',
  route: ORDERS_SUMMARY_ROUTE,
  testId: ORDERS_SUMMARY_TEST_ID,
  domain: 'orders',
  kind: 'summary',
  itemCount: 11,
};

export function ordersSummaryItemPath(itemId: string): string {
  return `${ORDERS_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
