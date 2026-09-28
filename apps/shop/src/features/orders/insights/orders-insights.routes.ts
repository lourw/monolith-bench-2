export const ORDERS_INSIGHTS_ROUTE = '/features/orders-insights';

export const ORDERS_INSIGHTS_TEST_ID = 'feature-orders-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'orders-insights',
  title: 'Orders Insights',
  route: ORDERS_INSIGHTS_ROUTE,
  testId: ORDERS_INSIGHTS_TEST_ID,
  domain: 'orders',
  kind: 'insights',
  itemCount: 8,
};

export function ordersInsightsItemPath(itemId: string): string {
  return `${ORDERS_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
