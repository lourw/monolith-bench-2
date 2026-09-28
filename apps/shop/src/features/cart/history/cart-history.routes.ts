export const CART_HISTORY_ROUTE = '/features/cart-history';

export const CART_HISTORY_TEST_ID = 'feature-cart-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_HISTORY_FEATURE: FeatureMeta = {
  id: 'cart-history',
  title: 'Cart History',
  route: CART_HISTORY_ROUTE,
  testId: CART_HISTORY_TEST_ID,
  domain: 'cart',
  kind: 'history',
  itemCount: 10,
};

export function cartHistoryItemPath(itemId: string): string {
  return `${CART_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
