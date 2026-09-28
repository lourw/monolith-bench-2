export const SHIPPING_DETAILS_ROUTE = '/features/shipping-details';

export const SHIPPING_DETAILS_TEST_ID = 'feature-shipping-details';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_DETAILS_FEATURE: FeatureMeta = {
  id: 'shipping-details',
  title: 'Shipping Details',
  route: SHIPPING_DETAILS_ROUTE,
  testId: SHIPPING_DETAILS_TEST_ID,
  domain: 'shipping',
  kind: 'details',
  itemCount: 6,
};

export function shippingDetailsItemPath(itemId: string): string {
  return `${SHIPPING_DETAILS_ROUTE}/${encodeURIComponent(itemId)}`;
}
