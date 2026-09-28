export const CHECKOUT_DETAILS_ROUTE = '/features/checkout-details';

export const CHECKOUT_DETAILS_TEST_ID = 'feature-checkout-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_DETAILS_FEATURE: FeatureMeta = {
  id: 'checkout-details',
  title: 'Checkout Details',
  route: CHECKOUT_DETAILS_ROUTE,
  testId: CHECKOUT_DETAILS_TEST_ID,
  domain: 'checkout',
  kind: 'details',
  itemCount: 8,
};

export function checkoutDetailsItemPath(itemId: string): string {
  return `${CHECKOUT_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
