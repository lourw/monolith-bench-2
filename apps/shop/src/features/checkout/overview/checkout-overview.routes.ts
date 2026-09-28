export const CHECKOUT_OVERVIEW_ROUTE = '/features/checkout-overview';

export const CHECKOUT_OVERVIEW_TEST_ID = 'feature-checkout-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'checkout-overview',
  title: 'Checkout Overview',
  route: CHECKOUT_OVERVIEW_ROUTE,
  testId: CHECKOUT_OVERVIEW_TEST_ID,
  domain: 'checkout',
  kind: 'overview',
  itemCount: 6,
};

export function checkoutOverviewItemPath(itemId: string): string {
  return `${CHECKOUT_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
