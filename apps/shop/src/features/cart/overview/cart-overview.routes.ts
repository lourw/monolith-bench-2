export const CART_OVERVIEW_ROUTE = '/features/cart-overview';

export const CART_OVERVIEW_TEST_ID = 'feature-cart-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'cart-overview',
  title: 'Cart Overview',
  route: CART_OVERVIEW_ROUTE,
  testId: CART_OVERVIEW_TEST_ID,
  domain: 'cart',
  kind: 'overview',
  itemCount: 6,
};

export function cartOverviewItemPath(itemId: string): string {
  return `${CART_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
