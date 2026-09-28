export const LOYALTY_SETTINGS_ROUTE = '/features/loyalty-settings';

export const LOYALTY_SETTINGS_TEST_ID = 'feature-loyalty-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const LOYALTY_SETTINGS_FEATURE: FeatureMeta = {
  id: 'loyalty-settings',
  title: 'Loyalty Settings',
  route: LOYALTY_SETTINGS_ROUTE,
  testId: LOYALTY_SETTINGS_TEST_ID,
  domain: 'loyalty',
  kind: 'settings',
  itemCount: 10,
};

export function loyaltySettingsItemPath(itemId: string): string {
  return `${LOYALTY_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
