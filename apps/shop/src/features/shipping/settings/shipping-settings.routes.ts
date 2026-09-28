export const SHIPPING_SETTINGS_ROUTE = '/features/shipping-settings';

export const SHIPPING_SETTINGS_TEST_ID = 'feature-shipping-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SHIPPING_SETTINGS_FEATURE: FeatureMeta = {
  id: 'shipping-settings',
  title: 'Shipping Settings',
  route: SHIPPING_SETTINGS_ROUTE,
  testId: SHIPPING_SETTINGS_TEST_ID,
  domain: 'shipping',
  kind: 'settings',
  itemCount: 11,
};

export function shippingSettingsItemPath(itemId: string): string {
  return `${SHIPPING_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
