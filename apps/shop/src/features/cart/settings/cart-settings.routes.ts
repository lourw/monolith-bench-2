export const CART_SETTINGS_ROUTE = '/features/cart-settings';

export const CART_SETTINGS_TEST_ID = 'feature-cart-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const CART_SETTINGS_FEATURE: FeatureMeta = {
  id: 'cart-settings',
  title: 'Cart Settings',
  route: CART_SETTINGS_ROUTE,
  testId: CART_SETTINGS_TEST_ID,
  domain: 'cart',
  kind: 'settings',
  itemCount: 7,
};

export function cartSettingsItemPath(itemId: string): string {
  return `${CART_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
