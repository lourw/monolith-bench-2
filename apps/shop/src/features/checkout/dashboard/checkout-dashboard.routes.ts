export const CHECKOUT_DASHBOARD_ROUTE = '/features/checkout-dashboard';

export const CHECKOUT_DASHBOARD_TEST_ID = 'feature-checkout-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'checkout-dashboard',
  title: 'Checkout Dashboard',
  route: CHECKOUT_DASHBOARD_ROUTE,
  testId: CHECKOUT_DASHBOARD_TEST_ID,
  domain: 'checkout',
  kind: 'dashboard',
  itemCount: 12,
};

export function checkoutDashboardItemPath(itemId: string): string {
  return `${CHECKOUT_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
