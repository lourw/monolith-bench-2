export const SUBSCRIPTIONS_SETTINGS_ROUTE = '/features/subscriptions-settings';

export const SUBSCRIPTIONS_SETTINGS_TEST_ID = 'feature-subscriptions-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const SUBSCRIPTIONS_SETTINGS_FEATURE: FeatureMeta = {
  id: 'subscriptions-settings',
  title: 'Subscriptions Settings',
  route: SUBSCRIPTIONS_SETTINGS_ROUTE,
  testId: SUBSCRIPTIONS_SETTINGS_TEST_ID,
  domain: 'subscriptions',
  kind: 'settings',
  itemCount: 5,
};

export function subscriptionsSettingsItemPath(itemId: string): string {
  return `${SUBSCRIPTIONS_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
