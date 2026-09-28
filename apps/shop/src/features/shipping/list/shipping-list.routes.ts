export const SHIPPING_LIST_ROUTE = '/features/shipping-list';

export const SHIPPING_LIST_TEST_ID = 'feature-shipping-list';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_LIST_FEATURE: FeatureMeta = {
  id: 'shipping-list',
  title: 'Shipping List',
  route: SHIPPING_LIST_ROUTE,
  testId: SHIPPING_LIST_TEST_ID,
  domain: 'shipping',
  kind: 'list',
  itemCount: 11,
};

export function shippingListItemPath(itemId: string): string {
  return `${SHIPPING_LIST_ROUTE}/${encodeURIComponent(itemId)}`;
}
