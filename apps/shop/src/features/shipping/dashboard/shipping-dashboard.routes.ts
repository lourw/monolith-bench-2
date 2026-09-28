export const SHIPPING_DASHBOARD_ROUTE = '/features/shipping-dashboard';

export const SHIPPING_DASHBOARD_TEST_ID = 'feature-shipping-dashboard';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_DASHBOARD_FEATURE: FeatureMeta = {
  id: 'shipping-dashboard',
  title: 'Shipping Dashboard',
  route: SHIPPING_DASHBOARD_ROUTE,
  testId: SHIPPING_DASHBOARD_TEST_ID,
  domain: 'shipping',
  kind: 'dashboard',
  itemCount: 12,
};

export function shippingDashboardItemPath(itemId: string): string {
  return `${SHIPPING_DASHBOARD_ROUTE}/${encodeURIComponent(itemId)}`;
}
