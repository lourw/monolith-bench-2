export const CART_SUMMARY_ROUTE = '/features/cart-summary';

export const CART_SUMMARY_TEST_ID = 'feature-cart-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_SUMMARY_FEATURE: FeatureMeta = {
  id: 'cart-summary',
  title: 'Cart Summary',
  route: CART_SUMMARY_ROUTE,
  testId: CART_SUMMARY_TEST_ID,
  domain: 'cart',
  kind: 'summary',
  itemCount: 5,
};

export function cartSummaryItemPath(itemId: string): string {
  return `${CART_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
