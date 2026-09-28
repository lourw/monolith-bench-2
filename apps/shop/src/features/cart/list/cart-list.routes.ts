export const CART_LIST_ROUTE = '/features/cart-list';

export const CART_LIST_TEST_ID = 'feature-cart-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_LIST_FEATURE: FeatureMeta = {
  id: 'cart-list',
  title: 'Cart List',
  route: CART_LIST_ROUTE,
  testId: CART_LIST_TEST_ID,
  domain: 'cart',
  kind: 'list',
  itemCount: 10,
};

export function cartListItemPath(itemId: string): string {
  return `${CART_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
