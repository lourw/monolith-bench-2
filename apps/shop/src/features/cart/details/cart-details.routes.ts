export const CART_DETAILS_ROUTE = '/features/cart-details';

export const CART_DETAILS_TEST_ID = 'feature-cart-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_DETAILS_FEATURE: FeatureMeta = {
  id: 'cart-details',
  title: 'Cart Details',
  route: CART_DETAILS_ROUTE,
  testId: CART_DETAILS_TEST_ID,
  domain: 'cart',
  kind: 'details',
  itemCount: 9,
};

export function cartDetailsItemPath(itemId: string): string {
  return `${CART_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
