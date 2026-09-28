export const SHIPPING_HISTORY_ROUTE = '/features/shipping-history';

export const SHIPPING_HISTORY_TEST_ID = 'feature-shipping-history';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_HISTORY_FEATURE: FeatureMeta = {
  id: 'shipping-history',
  title: 'Shipping History',
  route: SHIPPING_HISTORY_ROUTE,
  testId: SHIPPING_HISTORY_TEST_ID,
  domain: 'shipping',
  kind: 'history',
  itemCount: 12,
};

export function shippingHistoryItemPath(itemId: string): string {
  return `${SHIPPING_HISTORY_ROUTE}/${encodeURIComponent(itemId)}`;
}
