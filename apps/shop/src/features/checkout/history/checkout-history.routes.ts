export const CHECKOUT_HISTORY_ROUTE = '/features/checkout-history';

export const CHECKOUT_HISTORY_TEST_ID = 'feature-checkout-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_HISTORY_FEATURE: FeatureMeta = {
  id: 'checkout-history',
  title: 'Checkout History',
  route: CHECKOUT_HISTORY_ROUTE,
  testId: CHECKOUT_HISTORY_TEST_ID,
  domain: 'checkout',
  kind: 'history',
  itemCount: 8,
};

export function checkoutHistoryItemPath(itemId: string): string {
  return `${CHECKOUT_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
