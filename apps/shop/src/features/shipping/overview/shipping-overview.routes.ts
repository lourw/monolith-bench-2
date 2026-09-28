export const SHIPPING_OVERVIEW_ROUTE = '/features/shipping-overview';

export const SHIPPING_OVERVIEW_TEST_ID = 'feature-shipping-overview';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_OVERVIEW_FEATURE: FeatureMeta = {
  id: 'shipping-overview',
  title: 'Shipping Overview',
  route: SHIPPING_OVERVIEW_ROUTE,
  testId: SHIPPING_OVERVIEW_TEST_ID,
  domain: 'shipping',
  kind: 'overview',
  itemCount: 7,
};

export function shippingOverviewItemPath(itemId: string): string {
  return `${SHIPPING_OVERVIEW_ROUTE}/${encodeURIComponent(itemId)}`;
}
