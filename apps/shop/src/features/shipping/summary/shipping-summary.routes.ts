export const SHIPPING_SUMMARY_ROUTE = '/features/shipping-summary';

export const SHIPPING_SUMMARY_TEST_ID = 'feature-shipping-summary';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_SUMMARY_FEATURE: FeatureMeta = {
  id: 'shipping-summary',
  title: 'Shipping Summary',
  route: SHIPPING_SUMMARY_ROUTE,
  testId: SHIPPING_SUMMARY_TEST_ID,
  domain: 'shipping',
  kind: 'summary',
  itemCount: 11,
};

export function shippingSummaryItemPath(itemId: string): string {
  return `${SHIPPING_SUMMARY_ROUTE}/${encodeURIComponent(itemId)}`;
}
