export const SHIPPING_INSIGHTS_ROUTE = '/features/shipping-insights';

export const SHIPPING_INSIGHTS_TEST_ID = 'feature-shipping-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'shipping-insights',
  title: 'Shipping Insights',
  route: SHIPPING_INSIGHTS_ROUTE,
  testId: SHIPPING_INSIGHTS_TEST_ID,
  domain: 'shipping',
  kind: 'insights',
  itemCount: 6,
};

export function shippingInsightsItemPath(itemId: string): string {
  return `${SHIPPING_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
