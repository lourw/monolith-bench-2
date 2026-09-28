export const CHECKOUT_INSIGHTS_ROUTE = '/features/checkout-insights';

export const CHECKOUT_INSIGHTS_TEST_ID = 'feature-checkout-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'checkout-insights',
  title: 'Checkout Insights',
  route: CHECKOUT_INSIGHTS_ROUTE,
  testId: CHECKOUT_INSIGHTS_TEST_ID,
  domain: 'checkout',
  kind: 'insights',
  itemCount: 6,
};

export function checkoutInsightsItemPath(itemId: string): string {
  return `${CHECKOUT_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
