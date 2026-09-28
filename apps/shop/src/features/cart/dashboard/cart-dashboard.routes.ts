export const CART_DASHBOARD_ROUTE = '/features/cart-dashboard';

export const CART_DASHBOARD_TEST_ID = 'feature-cart-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'cart-dashboard',
  title: 'Cart Dashboard',
  route: CART_DASHBOARD_ROUTE,
  testId: CART_DASHBOARD_TEST_ID,
  domain: 'cart',
  kind: 'dashboard',
  itemCount: 6,
};

export function cartDashboardItemPath(itemId: string): string {
  return `${CART_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
