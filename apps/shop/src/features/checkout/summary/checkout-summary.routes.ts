export const CHECKOUT_SUMMARY_ROUTE = '/features/checkout-summary';

export const CHECKOUT_SUMMARY_TEST_ID = 'feature-checkout-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_SUMMARY_FEATURE: FeatureMeta = {
  id: 'checkout-summary',
  title: 'Checkout Summary',
  route: CHECKOUT_SUMMARY_ROUTE,
  testId: CHECKOUT_SUMMARY_TEST_ID,
  domain: 'checkout',
  kind: 'summary',
  itemCount: 10,
};

export function checkoutSummaryItemPath(itemId: string): string {
  return `${CHECKOUT_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
