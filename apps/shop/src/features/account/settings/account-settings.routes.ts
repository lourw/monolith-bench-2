export const ACCOUNT_SETTINGS_ROUTE = '/features/account-settings';

export const ACCOUNT_SETTINGS_TEST_ID = 'feature-account-settings';

export interface FeatureMeta {
  id: string;
  title: string;
  route: string;
  testId: string;
  domain: string;
  kind: string;
  itemCount: number;
}

export const ACCOUNT_SETTINGS_FEATURE: FeatureMeta = {
  id: 'account-settings',
  title: 'Account Settings',
  route: ACCOUNT_SETTINGS_ROUTE,
  testId: ACCOUNT_SETTINGS_TEST_ID,
  domain: 'account',
  kind: 'settings',
  itemCount: 8,
};

export function accountSettingsItemPath(itemId: string): string {
  return `${ACCOUNT_SETTINGS_ROUTE}/${encodeURIComponent(itemId)}`;
}
