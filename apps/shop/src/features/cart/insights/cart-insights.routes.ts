export const CART_INSIGHTS_ROUTE = '/features/cart-insights';

export const CART_INSIGHTS_TEST_ID = 'feature-cart-insights';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_INSIGHTS_FEATURE: FeatureMeta = {
  id: 'cart-insights',
  title: 'Cart Insights',
  route: CART_INSIGHTS_ROUTE,
  testId: CART_INSIGHTS_TEST_ID,
  domain: 'cart',
  kind: 'insights',
  itemCount: 8,
};

export function cartInsightsItemPath(itemId: string): string {
  return `${CART_INSIGHTS_ROUTE}/${encodeURIComponent(itemId)}`;
}
