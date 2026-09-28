export const CHECKOUT_LIST_ROUTE = '/features/checkout-list';

export const CHECKOUT_LIST_TEST_ID = 'feature-checkout-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_LIST_FEATURE: FeatureMeta = {
  id: 'checkout-list',
  title: 'Checkout List',
  route: CHECKOUT_LIST_ROUTE,
  testId: CHECKOUT_LIST_TEST_ID,
  domain: 'checkout',
  kind: 'list',
  itemCount: 8,
};

export function checkoutListItemPath(itemId: string): string {
  return `${CHECKOUT_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
