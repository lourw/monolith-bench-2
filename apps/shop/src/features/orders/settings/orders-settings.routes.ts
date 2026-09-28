export const ORDERS_SETTINGS_ROUTE = '/features/orders-settings';

export const ORDERS_SETTINGS_TEST_ID = 'feature-orders-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ORDERS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'orders-settings',
  title: 'Orders Settings',
  route: ORDERS_SETTINGS_ROUTE,
  testId: ORDERS_SETTINGS_TEST_ID,
  domain: 'orders',
  kind: 'settings',
  itemCount: 11,
};

export function ordersSettingsItemPath(itemId: string): string {
  return `${ORDERS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
