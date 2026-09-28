export const PAYMENTS_SETTINGS_ROUTE = '/features/payments-settings';

export const PAYMENTS_SETTINGS_TEST_ID = 'feature-payments-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const PAYMENTS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'payments-settings',
  title: 'Payments Settings',
  route: PAYMENTS_SETTINGS_ROUTE,
  testId: PAYMENTS_SETTINGS_TEST_ID,
  domain: 'payments',
  kind: 'settings',
  itemCount: 11,
};

export function paymentsSettingsItemPath(itemId: string): string {
  return `${PAYMENTS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
