export const CHECKOUT_SETTINGS_ROUTE = '/features/checkout-settings';

export const CHECKOUT_SETTINGS_TEST_ID = 'feature-checkout-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CHECKOUT_SETTINGS_FEATURE: FeatureMeta = {
  id: 'checkout-settings',
  title: 'Checkout Settings',
  route: CHECKOUT_SETTINGS_ROUTE,
  testId: CHECKOUT_SETTINGS_TEST_ID,
  domain: 'checkout',
  kind: 'settings',
  itemCount: 6,
};

export function checkoutSettingsItemPath(itemId: string): string {
  return `${CHECKOUT_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
